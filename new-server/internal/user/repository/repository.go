package repository

import (
	"database/sql"
)

// TODO: @veD-tnayrB Bryant please standarize the fucking errors in each layer as it should, then will be horrible.

type UserRepository struct {
	DB *sql.DB
}
