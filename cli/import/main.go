package main

// This cli tool converts the mysql database from crawler.ninja to postgres

import (
	"fmt"
	"time"

	"github.com/gobuffalo/envy"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var db *gorm.DB
var mdb *gorm.DB
var err error

// Result is the structure of crawler.ninja's database
type Result struct {
	Rank     int
	Hostname string
}

// Site is a bad name
type Site struct {
	Rank      int
	Hostname  string
	CreatedAt time.Time
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

	// Connect to mysql
	mdb, err = gorm.Open("mysql", "username:password@/crawler?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		fmt.Println("Error connecting to mysql:", err)
	}
	defer mdb.Close()

	var site Result

	// Get Table count
	count := 0
	mdb.Table("results").Count(&count)
	fmt.Printf("Checking %v sites...\n", count)

	for rank := 1; rank <= count; rank++ {
		if err := mdb.Where("rank = ?", rank).First(&site).Error; err != nil {
			// Ignore errors
			continue
		}
		var sitecheck Site
		sitecheck.Rank = site.Rank
		sitecheck.Hostname = site.Hostname

		// Save to postgres
		db.Create(&sitecheck)

		fmt.Printf("Rank: %v - Site: %s\n", sitecheck.Rank, sitecheck.Hostname)
	}
}
