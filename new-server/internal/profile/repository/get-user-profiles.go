package repository

import (
	models "github.com/veD-tnayrB/administrator/internal/profile/models"
)

func (r *ProfileRepository) GetUserProfiles(userId string) ([]*models.Profile, error) {
	query := "SELECT p.id as id, p.name as name, p.description as description, p.active as active, p.time_created as timeCreated, p.time_updated as timeUpdated FROM users_profiles up JOIN profiles p ON up.profile_id = p.id WHERE up.user_id = ?"
	rows, err := r.DB.Query(query, userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	profiles := []*models.Profile{}
	for rows.Next() {
		profile := models.Profile{}
		err := rows.Scan(&profile.Id, &profile.Name, &profile.Description, &profile.Active, &profile.TimeCreated, &profile.TimeUpdated)
		if err != nil {
			return nil, err
		}

		profiles = append(profiles, &profile)
	}

	return profiles, nil
}
