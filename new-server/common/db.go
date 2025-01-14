package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql" // Import the MySQL driver
)

func InitDB() (*sql.DB, error) {
	dsn := "root:1234567890.@tcp(127.0.0.1:3306)/essential"
	db, err := sql.Open("mysql", dsn)
	fmt.Printf("%v", err)
	if err != nil {
		log.Fatalf("ERROR OPENING DB %v\n", err)
		return nil, err
	}
	return db, nil
}
