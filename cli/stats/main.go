package main

// This cli tool generates stats for how many sites has v6 enabled
// This should run every night

import (
	"fmt"
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
}

// Stats lists statistics for the sites
type Stats struct {
	Sites   int
	Ipv6    int
	Ns      int
	Topv6   int
	Topns   int
	Percent float64
}

// Asn is also a bad name
type Asn struct {
	Asn       int
	Asname    string
	CountV4   int
	CountV6   int
	PercentV4 float64
	PercentV6 float64
}

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
	db.LogMode(true)

	// v6 stats for all sites
	// this will be used to generate graphs for the progression of v6 deployment
	// var s Stats

	// db.Table("sites").Where("checked = true").Count(&s.Sites)
	// db.Table("sites").Where("checked = true AND ipv6 = true").Count(&s.Ipv6)
	// db.Table("sites").Where("checked = true AND ns_ipv6 = true").Count(&s.Ns)
	// db.Table("sites").Where("checked = true AND ipv6 = true AND rank < 1000").Count(&s.Topv6)
	// db.Table("sites").Where("checked = true AND ns_ipv6 = true AND rank < 1000").Count(&s.Topns)

	// // Calculate the percentage of sites with IPv6
	// var v6 float64
	// v6 = PercentOf(s.Ipv6, s.Sites)
	// s.Percent = math.Round(v6*10) / 10

	// // Push to database
	// // This creates stats for the total of all sites
	// // run this every day so we can generate graphs from the data
	// db.Create(&s)

	var a []Asn

	// Generate stats per ASN
	db.Table("sites").Select("asn").Where("asn > 1").Group("asn").Find(&a)
	for _, v := range a {
		// Count v4 for current asn
		db.Table("sites").Select("count(asn) as count_v4").Where("ipv6 = FALSE AND asn = ?", v.Asn).Group("asn").First(&v)

		// Count v6 for current asn
		db.Table("sites").Select("count(asn) as count_v6").Where("ipv6 = TRUE AND asn = ?", v.Asn).Group("asn").First(&v)

		sum := v.CountV4 + v.CountV6

		// Calculate v4 percent for current asn
		v.PercentV4 = PercentOf(v.CountV4, sum)

		// Calculate v6 percent for current asn
		v.PercentV6 = PercentOf(v.CountV6, sum)

		// Get ASN Name
		// NotImplemented

		// Print
		fmt.Printf("ASN: %v CountV4: %v CountV6: %v\n", v.Asn, v.CountV4, v.CountV6)

		// Create
		db.Table("asn").Create(v)
	}

}

// PercentOf calculate [number1] is what percent of [number2]
func PercentOf(current int, all int) float64 {
	percent := (float64(current) * float64(100)) / float64(all)
	return percent
}
