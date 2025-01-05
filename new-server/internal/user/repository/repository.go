package repository

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/veD-tnayrB/administrator/internal/user/models"
)

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

func (r *UserRepository) List(params *models.ListParams) ([]*models.User, error) {
	users := []*models.User{}

	if params.Limit == 0 || params.Limit < 0 {
		return users, fmt.Errorf("limit is required and cant be less than 0")
	}

	if params.Order == "" {
		return users, fmt.Errorf("order cant be empty")
	}

	if params.Desc == "" {
		params.Desc = "desc"
	}

	query := "SELECT id, names, last_names, email, active, profile_img, time_created, time_updated FROM users "

	if params.Where == nil {
		if params.Desc != "desc" && params.Desc != "asc" {
			return users, fmt.Errorf("order needs to be 'desc' or 'asc' but not diferent")
		}

		// TODO: @veD-tnayrB Needs to handle the limit and the order by bc you need to implement that functionalities
		// ORDER BY ? ? LIMIT ?
		query += "ORDER BY time_updated desc LIMIT ?"
		rows, err := r.DB.Query(query, params.Limit)
		if err != nil {
			return users, fmt.Errorf("error executing the query: %v", err)
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

		return users, nil
	}

	query += "WHERE ("
	values := []interface{}{}
	if params.Where.Email != "" {
		if len(values) > 0 {
			query += " OR "
		}
		query += "email LIKE ?"
		values = append(values, "%"+strings.ToLower(params.Where.Email)+"%")
	}

	if params.Where.Names != "" {
		if len(values) > 0 {
			query += " OR "
		}
		query += "names LIKE ?"
		values = append(values, "%"+strings.ToLower(params.Where.Names)+"%")
	}

	if params.Where.LastNames != "" {
		if len(values) > 0 {
			query += " OR "
		}
		query += "last_names LIKE ?"
		values = append(values, "%"+strings.ToLower(params.Where.LastNames)+"%")
	}

	if params.Where.Id != "" {
		if len(values) > 0 {
			query += " OR "
		}
		query += "id LIKE ?"
		values = append(values, "%"+strings.ToLower(params.Where.Id)+"%")
	}

	if len(values) > 0 {
		query += ") AND "
	}
	query += "active = ?"
	values = append(values, params.Where.Active)
	query += " ORDER BY time_updated desc LIMIT ?"
	values = append(values, params.Limit)

	rows, err := r.DB.Query(query, values...)
	if err != nil {
		return users, fmt.Errorf("error while executing the query: %v", err)

	}
	defer rows.Close()

	// @TODO: veD-tnayrB Remove this code, this was for debuggin the queries
	fmt.Println("-------------------------------------------------")
	formattedQuery := strings.Replace(query, "?", "%v", len(values))
	fmt.Printf(formattedQuery+"\n", values...)
	fmt.Println("-------------------------------------------------")

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
