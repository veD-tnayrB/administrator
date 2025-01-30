package repository

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/veD-tnayrB/administrator/common/helpers"

	models "github.com/veD-tnayrB/administrator/internal/user/models"
)

// TODO: @veD-tnayrB Bryant please standarize the fucking errors in each layer as it should, then will be horrible.

type UserRepository struct {
	DB *sql.DB
}

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

func (r *UserRepository) GetRegisteredByMonth(ctx context.Context, year int) ([]*models.GetRegisteredByMonthResponse, error) {
	if year < 0 {
		return []*models.GetRegisteredByMonthResponse{}, errors.New("YEAR_NEEDS_TO_BE_GREATHER_THAN_0")
	}
	startDate := time.Date(year, time.January, 1, 1, 1, 1, 1, time.UTC)
	endDate := time.Date(year, time.December, 31, 24, 59, 59, 59, time.UTC)

	query := "SELECT MONTH(time_created) AS month, COUNT(id) AS count FROM users WHERE time_created BETWEEN ? OR ? GROUP BY MONTH(time_created) ORDER BY MONTH(time_created) ASC"
	rows, err := r.DB.Query(query, startDate, endDate)
	if err != nil {
		if err == sql.ErrNoRows {
			return []*models.GetRegisteredByMonthResponse{}, nil
		}

		return []*models.GetRegisteredByMonthResponse{}, fmt.Errorf("error executing the query %v", err)
	}
	defer rows.Close()

	responses := []*models.GetRegisteredByMonthResponse{}
	for rows.Next() {
		response := models.GetRegisteredByMonthResponse{}

		err := rows.Scan(&response.Month, &response.Count)
		if err != nil {
			return []*models.GetRegisteredByMonthResponse{}, fmt.Errorf("error scaning record: %v", err)
		}
	}

	return responses, nil
}

var sortableFields = map[string]string{
	"names":       "names",
	"lastNames":   "last_names",
	"timeCreated": "time_created",
	"timeUpdated": "time_updated",
	"id":          "id",
}

func (r *UserRepository) List(params *models.ListParams) ([]*models.User, error) {
	users := []*models.User{}

	whereClasure := ""
	values := []interface{}{}

	if params.Where != nil {
		whereClasure += "WHERE ("

		if params.Where.Email != "" {
			if len(values) > 0 {
				whereClasure += " OR "
			}
			whereClasure = "email LIKE ?"
			values = append(values, "%"+strings.ToLower(params.Where.Email)+"%")
		}

		if params.Where.Names != "" {
			if len(values) > 0 {
				whereClasure += " OR "
			}
			whereClasure += "names LIKE ?"
			values = append(values, "%"+strings.ToLower(params.Where.Names)+"%")
		}

		if params.Where.LastNames != "" {
			if len(values) > 0 {
				whereClasure += " OR "
			}
			whereClasure += "last_names LIKE ?"
			values = append(values, "%"+strings.ToLower(params.Where.LastNames)+"%")
		}

		if params.Where.Id != "" {
			if len(values) > 0 {
				whereClasure += " OR "
			}
			whereClasure += "id LIKE ?"
			values = append(values, "%"+strings.ToLower(params.Where.Id)+"%")
		}

		if len(values) == 0 {
			whereClasure = "WHERE "
		}

		if len(values) > 0 {
			whereClasure += ") AND "
		}
		whereClasure += "active = ? "
		values = append(values, params.Where.Active)

	}

	buildQueryParams := helpers.Params{
		Tablename:      "users",
		SortableFields: sortableFields,
		ListParams:     params,
		WhereClasure:   whereClasure,
		Properties:     "id, names, last_names, email, active, profile_img, time_created, time_updated",
	}
	query, err := helpers.BuildListQuery(&buildQueryParams)

	fmt.Println("-------------------------------------------------")
	formattedQuery := strings.Replace(query, "?", "%v", len(values))
	fmt.Printf(formattedQuery+"\n", values...)
	fmt.Println("-------------------------------------------------")

	rows, err := r.DB.Query(query, values...)

	if err != nil {
		return users, fmt.Errorf("error while executing the query: %v", err)

	}
	defer rows.Close()

	for rows.Next() {
		user := models.User{}
		err := rows.Scan(&user.Id, &user.Names, &user.LastNames, &user.Email, &user.Active, &user.ProfileImg, &user.TimeCreated, &user.TimeUpdated)
		if err != nil {
			return users, fmt.Errorf("error while scaning the data: %v", err)
		}

		users = append(users, &user)
	}

	// @TODO: veD-tnayrB Implement the time created OR time updated between functionality
	return users, nil
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

func (r *UserRepository) CreateAccessToken(tx *sql.Tx, userId string) error {
	query := "INSERT INTO access_tokens (id, userId, access_token, time_updated, time_created, notifications_token, timezone) VALUES (?,?,?,?,?,?,?)"
	tx.Exec(query)
	return nil
}
