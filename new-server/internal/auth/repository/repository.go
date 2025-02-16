package repository

import "database/sql"

type AuthRepository struct {
	DB *sql.DB
}
