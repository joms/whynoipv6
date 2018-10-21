package main

// This cli tool collects all the data

import (
	"encoding/json"
	"flag"
	"fmt"
	"net"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/gobuffalo/envy"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var db *gorm.DB
var err error

// Site is a bad name
type Site struct {
	ID            int
	Rank          int
	Hostname      string
	IPv6          bool
	NSIPv6        bool
	IPv6CreatedAt time.Time
	Checked       bool
	Nsv6checked   bool
	Country       string
	ASN           int
}

// GeoIP gets the country code from local freeip server
type GeoIP struct {
	CountryCode string `json:"country_code"`
}

// ASN is the response of https://iptoasn.com/
type ASN struct {
	ASN int `json:"as_number"`
}

// Flags
var (
	FlagCheckHost    = flag.Bool("domain", false, "Check the domain")
	FlagCheckNS      = flag.Bool("nameserver", false, "Check the Nameserver")
	FlagCheckCountry = flag.Bool("country", false, "Check CountryCode for domain")
	FlagCheckASN     = flag.Bool("asn", false, "Get the ASN for domain")
)

func main() {
	// Load .env file
	envy.Load("../../.env", "$GOROOT/src/github.com/lasseh/whynoipv6/.env")

	// Database connection
	dsn := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		envy.Get("V6_USER", ""),
		envy.Get("V6_PASS", ""),
		envy.Get("V6_DB", ""),
		envy.Get("V6_HOST", "localhost"),
		envy.Get("V6_PORT", "5432"),
	)
	db, err = gorm.Open("postgres", dsn)
	if err != nil {
		fmt.Println("Error connecting to database:", err)
	}
	defer db.Close()

	//db.LogMode(true)

	// Parse flags
	flag.Parse()

	var limit = 100
	var offset = 0
	var site []Site
	var wg sync.WaitGroup
	start := time.Now()

	// Get table count
	count := 0
	db.Table("sites").Count(&count)
	fmt.Printf("Checking %v sites...\n", count)

	// Loop over all records in table
	for offset < count {
		t := time.Now()

		// check $limit of rows
		db.Table("sites").Order("id").Offset(offset).Limit(limit).Find(&site)
		for _, v := range site {
			wg.Add(1)
			go doWork(v, &wg)
		}
		wg.Wait()
		offset = offset + limit

		tss := time.Since(start)
		tsl := time.Since(t)
		fmt.Printf("Checked %v sites, took %v, totale time: %v\n", offset, tsl, tss)

	}
	elapsed := time.Since(start)
	fmt.Println("Done, took ", elapsed)
}

// doWork is a pool of slave gophers ready to do all the work
// TODO: change db to transactions
func doWork(s Site, wg *sync.WaitGroup) {
	defer wg.Done()

	// Check for AAAA record
	if *FlagCheckHost == true {
		if checkIPv6(s.Hostname) == true {
			s.IPv6 = true
			s.IPv6CreatedAt = time.Now()
			db.Exec("UPDATE sites SET ipv6 = ?, ipv6_created_at = ? WHERE id = ? AND hostname = ?", s.IPv6, s.IPv6CreatedAt, s.ID, s.Hostname)
		}
	}

	// Check NS for AAAA record
	if *FlagCheckNS == true {
		if checkNS(s.Hostname) == true {
			s.NSIPv6 = true
			db.Exec("UPDATE sites SET ns_ipv6 = ? WHERE id = ?", s.NSIPv6, s.ID)
		}
	}

	// Lookup country code
	// Make sure you are running the freegeoip server
	if *FlagCheckCountry == true {
		if c := getCountryCode(s.Hostname); c != "" {
			s.Country = c
			db.Exec("UPDATE sites SET country = ? WHERE id = ?", c, s.ID)
		} else {
			fmt.Println("No Country found or server not running")
		}
	}

	// Lookup ASN
	if *FlagCheckASN == true {
		if asn, err := getASN(s.Hostname); err == nil {
			s.ASN = asn
			db.Exec("UPDATE sites SET asn = ? WHERE id = ?", s.ASN, s.ID)
		}
	}

	// Set domain as checked
	s.Checked = true
	db.Exec("UPDATE sites SET checked = ? WHERE id = ?", s.Checked, s.ID)

	// Print the result
	fmt.Printf("Rank: %v - Site: %s - IPv6: %t - NS: %t - Country: %s - ASN: %d\n", s.Rank, s.Hostname, s.IPv6, s.NSIPv6, s.Country, s.ASN)
}

// checkIPv6 checks if hostname has an AAAA record and returns true on first hit
// TODO: implement errors
func checkIPv6(hostname string) bool {
	ip, _ := net.LookupIP(hostname)
	for i := 0; i < len(ip); i++ {
		if IsIPv6(ip[i].String()) == true {
			return true
		}
	}
	// Check www.domain.com as well
	w3domain := fmt.Sprintf("www.%s", hostname)
	ip, _ = net.LookupIP(w3domain)
	for i := 0; i < len(ip); i++ {
		if IsIPv6(ip[i].String()) == true {
			fmt.Println("FOUND WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW", w3domain)
			return true
		}
	}
	return false
}

// checkNS checks if the domain's NS records has IPv6 and returs true on first hit
func checkNS(hostname string) bool {
	ns, _ := net.LookupNS(hostname)
	for y := 0; y < len(ns); y++ {
		ip, _ := net.LookupIP(ns[y].Host)
		for y := 0; y < len(ip); y++ {
			if IsIPv6(ip[y].String()) == true {
				return true
			}
		}
	}
	return false
}

// getCountryCode check the GeoIP for the site
// uses: https://github.com/apilayer/freegeoip
// Not very accurate, but only thing i found that can do 1m lookups without payment
func getCountryCode(hostname string) string {
	g := GeoIP{}
	client := http.Client{
		Timeout: time.Second * 1,
	}

	req, err := http.NewRequest("GET", "http://localhost:8080/json/"+hostname, nil)
	resp, err := client.Do(req)
	if err != nil {
		//fmt.Println(err)
		return ""
	}
	defer resp.Body.Close()

	err = json.NewDecoder(resp.Body).Decode(&g)
	if err != nil {
		//fmt.Println(err)
		return ""
	}

	return g.CountryCode
}

// getASN check the AS Number for the domain
// should run your own server so we dont dos the site
// https://github.com/jedisct1/iptoasn-webservice
func getASN(hostname string) (int, error) {
	// Hostname to ip lookup
	ip, _ := net.LookupIP(hostname)
	firstip := ip[0].String()

	asn := ASN{}
	client := http.Client{
		Timeout: time.Second * 1,
	}

	req, err := http.NewRequest("GET", "https://api.iptoasn.com/v1/as/ip/"+firstip, nil)
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return 0, err
	}
	defer resp.Body.Close()

	err = json.NewDecoder(resp.Body).Decode(&asn)
	if err != nil {
		fmt.Println(err)
		return 0, err
	}
	// Anti-DOS
	time.Sleep(3 * time.Second)

	return asn.ASN, nil
}

// IsIPv6 check if the string is an IP version 6.
func IsIPv6(str string) bool {
	ip := net.ParseIP(str)
	return ip != nil && strings.Contains(str, ":")
}
