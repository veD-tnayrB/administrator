package helpers

import (
	"fmt"

	"github.com/veD-tnayrB/administrator/internal/user/models"
)

type Params struct {
	Tablename      string
	SortableFields map[string]string
	ListParams     *models.ListParams
	WhereClasure   string
	Properties     string
}

// Used for generating the query needed for the list functionality for the backoffice
// This QueryBuilder allows you to have the pagination, limit, ordering, ordering type functionalities already implemented
// Without need to repeat logic everywhere, you gonna need generate the where clasure yourself because theres a bunch of cases
// Where The user can need get information about specifics scenarios
func BuildListQuery(params *Params) (string, error) {
	query := ""
	if params.ListParams.Limit == 0 || params.ListParams.Limit < 0 {
		return query, fmt.Errorf("limit is required and cant be less than 0")
	}

	if params.ListParams.Start < 0 {
		return query, fmt.Errorf("start cant be less than 0")
	}

	if params.ListParams.Order == "" {
		return query, fmt.Errorf("order cant be empty")
	}

	if params.SortableFields[params.ListParams.Order] == "" {
		return query, fmt.Errorf("field %v cant be used for ordering", params.ListParams.Order)
	}

	if params.ListParams.Desc == "" {
		params.ListParams.Desc = "desc"
	}

	if params.Tablename == "" {
		return query, fmt.Errorf("table name cant be empty")
	}

	if params.Properties == "" {
		params.Properties = "*"
	}

	query += fmt.Sprintf("SELECT %v FROM %v ", params.Properties, params.Tablename)
	if params.WhereClasure != "" {
		query += params.WhereClasure + " "
	}
	query += fmt.Sprintf("ORDER BY %v %v LIMIT %v OFFSET %v", params.SortableFields[params.ListParams.Order], params.ListParams.Desc, params.ListParams.Limit, params.ListParams.Start)

	return query, nil
}
