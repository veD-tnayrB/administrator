package repository

import (
	"database/sql"
	"errors"
	"fmt"

	models "github.com/veD-tnayrB/administrator/internal/user/models"
)

func (r *UserRepository) Create(tx *sql.Tx, user *models.User) error {

	fmt.Printf("UPDATE: %v CREATE: %v \n", user.TimeUpdated, user.TimeUpdated)

	query := "INSERT INTO users (id, names, last_names, email, password, active, profile_img, forget_password_token, time_created, time_updated) VALUES (?,?,?,?,?,?,?,?,?,?)"
	_, err := tx.Exec(query, user.Id, user.Names, user.LastNames, user.Email, user.Password, user.Active, user.ProfileImg, user.ForgetPasswordToken, user.TimeCreated, user.TimeUpdated)

	if err != nil {
		return errors.New("error while executing the create query")
	}

	return nil
}

func (r *UserRepository) Update(tx *sql.Tx, user *models.User) error {
	// TODO: @veD-tnayrB Please implement the update method.
	return nil
}
