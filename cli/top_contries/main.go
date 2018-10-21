package main

// This cli tool updates the database stats for countries
// Should be run every night

import (
	"fmt"
	"math"

	"github.com/gobuffalo/envy"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var db *gorm.DB
var err error

// CountryCount count all the countries
type CountryCount struct {
	ID      int
	Country string
	Sites   int
	V6sites int
}

// Country is..well..a country
type Country struct {
	CountryCode string
	Count       int
}

func main() {
	// Load .env file
	envy.Load("../../.env")

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

	// Get number of sites with IPv6 grouped by country code
	var c []CountryCount

	db.Table("sites").Select("country, count(country) as v6sites").Where("country IS NOT NULL AND ipv6 = true").Group("country").Find(&c)

	for _, e := range c {
		fmt.Printf("Country: %s Count: %v\n", e.Country, e.V6sites)
		db.Table("countries").Where("country_code = ?", e.Country).Update("v6sites", e.V6sites)

	}

	// Get number of sites grouped by country code
	var d []CountryCount

	db.Table("sites").Select("country, count(country) as sites").Where("country IS NOT NULL").Group("country").Find(&d)

	for _, e := range d {
		fmt.Printf("Country: %s Count: %v\n", e.Country, e.Sites)
		db.Table("countries").Where("country_code = ?", e.Country).Update("sites", e.Sites)

	}

	// GET COUNTRYEEFEFS

	var lol []CountryCount

	db.Table("countries").Where("v6sites IS NOT NULL").Find(&lol)

	for _, v := range lol {
		// Calculate the percentage of sites with IPv6
		var v6 float64
		v6 = PercentOf(v.V6sites, v.Sites)
		v6 = math.Round(v6*10) / 10
		fmt.Printf("Country: %s Sites: %v \tV6-Sites: %v \tPercent: %v\n", v.Country, v.Sites, v.V6sites, v6)

		db.Table("countries").Where("id = ?", v.ID).Update("percent", v6)
	}
}

// PercentOf calculate [number1] is what percent of [number2]
func PercentOf(current int, all int) float64 {
	percent := (float64(current) * float64(100)) / float64(all)
	return percent
}
