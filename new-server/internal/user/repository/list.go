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
