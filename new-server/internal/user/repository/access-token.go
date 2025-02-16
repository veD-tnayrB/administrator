package repository

import (
	"database/sql"
)

func (r *UserRepository) CreateAccessToken(tx *sql.Tx, userId string, timeCreated string, timeUpdated string, notificationToken string, timezone string) error {
	query := "INSERT INTO access_tokens (id, userId, access_token, time_updated, time_created, notifications_token, timezone) VALUES (?,?,?,?,?,?,?)"
	tx.Exec(query)
	return nil
}
