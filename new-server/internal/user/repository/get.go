package repository

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	models "github.com/veD-tnayrB/administrator/internal/user/models"
)

func (r *UserRepository) GetById(ctx context.Context, id string) (*models.User, error) {
	if id == "" {
		return nil, errors.New("ID_IS_REQUIRED")
	}
	query := "SELECT id, names, last_names, email, password, active, profile_img, forget_password_token, time_created, time_updated FROM users WHERE id = ?"
	user := models.User{}
	request := r.DB.QueryRow(query, id)
	err := request.Scan(&user.Id, &user.Names, &user.LastNames, &user.Email, &user.Password, &user.Active, &user.ProfileImg, &user.ForgetPasswordToken, &user.TimeCreated, &user.TimeUpdated)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, fmt.Errorf("error scaning the user %v", err)
	}

	return &user, nil
}

func (r *UserRepository) GetByEmail(email string) (*models.User, error) {
	if email == "" {
		return nil, errors.New("EMAIL_IS_REQUIRED")
	}

	query := "SELECT id, names, last_names, email, password, active, profile_img, forget_password_token, time_created, time_updated FROM users WHERE email = ?"
	user := models.User{}
	request := r.DB.QueryRow(query, email)

	err := request.Scan(&user.Id, &user.Names, &user.LastNames, &user.Email, &user.Password, &user.Active, &user.ProfileImg, &user.ForgetPasswordToken, &user.TimeCreated, &user.TimeUpdated)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}

		return nil, errors.New("error while scanning the query response")
	}

	return &user, nil
}

func (r *UserRepository) GetActiveByEmail(email string) (*models.User, error) {
	if email == "" {
		return nil, errors.New("EMAIL_IS_REQUIRED")
	}

	query := "SELECT id, names, last_names, email, password, active, profile_img, forget_password_token, time_created, time_updated FROM users WHERE email = ? AND ACTIVE = 1"
	user := models.User{}
	request := r.DB.QueryRow(query, email)

	err := request.Scan(&user.Id, &user.Names, &user.LastNames, &user.Email, &user.Password, &user.Active, &user.ProfileImg, &user.ForgetPasswordToken, &user.TimeCreated, &user.TimeUpdated)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}

		return nil, errors.New("error while scanning the query response")
	}

	return &user, nil
}
