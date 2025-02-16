package repository

import (
	"database/sql"
)

type PermissionRepository struct {
	DB *sql.DB
}
