package repository

import (
	"database/sql"
	"errors"
	"fmt"
)

func (r *UserRepository) GetAssignedProfiles(id string) ([]string, error) {
	profileIds := []string{}

	query := "DELETE * FROM users_profiles WHERE user_id = ?"
	rows, err := r.DB.Query(query, id)
	if err != nil {
		return profileIds, errors.New("error while executing the get assigned query")
	}

	defer rows.Close()

	for rows.Next() {
		profileId := ""
		err := rows.Scan(profileId)
		if err != nil {
			return profileIds, fmt.Errorf("error while scaning the data: %v", err)
		}

		profileIds = append(profileIds, profileId)
	}

	return profileIds, nil

}

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
