package repository

import (
	"database/sql"
	"errors"
)

func (r *UserRepository) AssignProfile(tx *sql.Tx, userId string, profileId string) error {
	if userId == "" {
		return errors.New("USER_ID_REQUIRED")
	}

	if profileId == "" {
		return errors.New("PROFILE_ID_REQUIRED")
	}

	query := "INSERT INTO users_profiles (user_id, profile_id) VALUES (?,?)"
	_, err := tx.Exec(query, userId, profileId)
	if err != nil {
		return errors.New("error while executing the insert query")
	}

	return nil
}

func (r *UserRepository) RemoveAssignedProfiles(tx *sql.Tx, id string) error {
	query := "DELETE * FROM users_profiles WHERE user_id = ?"
	_, err := tx.Exec(query, id)
	if err != nil {
		return errors.New("error while executing the delete query")
	}
	return nil
}
