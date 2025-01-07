package handler

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/veD-tnayrB/administrator/internal/user/models"
	"github.com/veD-tnayrB/administrator/internal/user/service"
)

type UserHandler struct {
	UserService *service.UserService
}

func (h *UserHandler) GetById(ctx *gin.Context) {
	id := ctx.Param("id")
	response, err := h.UserService.GetById(ctx, id)
	if err != nil {
		fmt.Printf("ERROR WHILE GETTING THE RESPONSE: %v\n", err)
		ctx.JSON(http.StatusBadRequest, err)
		return
	}

	ctx.JSON(200, response)
}

func (h *UserHandler) GetRegisteredByMonth(ctx *gin.Context) {
	yearStr := ctx.Param("year")

	year, err := strconv.Atoi(yearStr)
	if err != nil {
		fmt.Printf("ERROR WHILE PARSING THE YEAR: %v\n", err)
		ctx.JSON(http.StatusBadRequest, errors.New("INVALID YEAR"))
		return
	}

	response, err := h.UserService.GetRegisteredByMonth(ctx, year)
	if err != nil {
		fmt.Printf("ERROR WHILE GETTING THE RESPONSE: %v\n", err)
		ctx.JSON(http.StatusBadRequest, err)
		return
	}

	ctx.JSON(200, response)
}

func (h *UserHandler) GenerateReport(ctx *gin.Context) {

}

// EXAMPLE OF QUERY PARAM:?limit=5&order=timeUpdated&des=DES&start=0&where={%22id%22:%22Br%22,%22names%22:%22Br%22,%22lastNames%22:%22Br%22}

func (h *UserHandler) List(ctx *gin.Context) {
	listParams := models.ListParams{}

	orderParam := ctx.DefaultQuery("order", "timeUpdated")
	startParam := ctx.DefaultQuery("start", "5")
	descParam := ctx.DefaultQuery("desc", "desc")

	if ctx.Query("limit") == "" {
		ctx.JSON(http.StatusBadRequest, "LIMIT IS REQUIRED, PLEASE DEFINE A LIMIT FOR YOUR REQUEST")
		return
	}

	limit, err := strconv.Atoi(ctx.Query("limit"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, "LIMIT MALFORMED")
		return
	}

	if limit <= 0 {
		ctx.JSON(http.StatusBadRequest, "LIMIT NEED TO BE HIGHER THAN 0")
		return
	}

	start, err := strconv.Atoi(startParam)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, "START MALFORMED")
		return
	}

	if start < 0 {
		ctx.JSON(http.StatusBadRequest, "START NEED TO BE HIGHER THAN 0")
		return
	}

	if descParam != "desc" && descParam != "asc" {
		ctx.JSON(http.StatusBadRequest, "ORDER NEEDS TO BE 'DESC' OR 'ASC'")
		return
	}

	listParams.Start = start
	listParams.Limit = limit
	listParams.Order = orderParam
	listParams.Desc = descParam

	where := models.WhereParams{}
	if ctx.Query("where") != "" && ctx.Query("where") != "{}" {
		whereParam := ctx.Query("where")
		err := json.Unmarshal([]byte(whereParam), &where)
		if err != nil {
			fmt.Printf("ERROR PARSING THE WHERE PROPERTY FROM JSON %v\n", err)
			ctx.JSON(http.StatusBadRequest, "WHERE PROPERTY MALFORMED")
			return
		}
		listParams.Where = &where
	}

	response, err := h.UserService.List(&listParams)

	if err != nil {
		fmt.Printf("SOMETHING WENT WRONG: %v\n", err)
		ctx.JSON(http.StatusBadRequest, "SOMETHING WENT WRONG")
		return
	}

	ctx.JSON(http.StatusOK, response)
}
