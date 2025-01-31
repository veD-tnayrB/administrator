package repository

import (
	"database/sql"
	"errors"
)

func (r *UserRepository) CheckIfExistsWithEmail(email string) (bool, error) {
	if email == "" {
		return false, errors.New("EMAIL_IS_REQUIRED")
	}

	query := "SELECT email FROM users WHERE email = ?"
	request := r.DB.QueryRow(query, email)

	err := request.Scan(&email)
	if err != nil {
		if err == sql.ErrNoRows {
			return false, nil
		}

		return false, errors.New("error while scanning the query response")
	}

	return true, nil
}
