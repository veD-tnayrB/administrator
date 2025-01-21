package repository

import (
	"database/sql"
	"errors"

	"github.com/veD-tnayrB/administrator/internal/profile/models"
)

type ProfileRepository struct {
	DB *sql.DB
}

func (r *ProfileRepository) GetById(id string) (*models.Profile, error) {
	profile := models.Profile{}
	if id == "" {
		return nil, errors.New("ID_REQUIRED")
	}

	query := "SELECT id, name, description, time_created, time_updated, active FROM profiles WHERE id = ?"
	request := r.DB.QueryRow(query, id)
	err := request.Scan(&profile.Id, &profile.Name, &profile.Description, &profile.TimeCreated, &profile.TimeUpdated, &profile.Active)
	if err != nil {
		return nil, errors.New("ERROR WHILE EXECUTING THE QUERY")
	}

	return &profile, nil
}

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