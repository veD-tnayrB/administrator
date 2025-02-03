package repository

import (
	"database/sql"
	"errors"
)

func (r *ProfileRepository) CheckIfExists(id string) (bool, error) {
	if id == "" {
		return false, errors.New("ID_REQUIRED")
	}

	query := "SELECT id FROM profiles WHERE id = ?"
	request := r.DB.QueryRow(query, id)
	err := request.Scan(&id)

	if err != nil {
		if err == sql.ErrNoRows {
			return false, nil
		}

		return false, errors.New("ERROR WHILE EXECUTING THE QUERY")
	}

	return true, nil
}
