package repository

import (
	"database/sql"
)

type ProfileRepository struct {
	DB *sql.DB
}
