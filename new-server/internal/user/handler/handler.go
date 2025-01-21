package handler

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"
	"strings"

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

	if strings.ToLower(descParam) != "desc" && strings.ToLower(descParam) != "asc" {
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

func (h *UserHandler) GenerateReport(ctx *gin.Context) {
	var body models.GenerateReportParams
	fileType := ctx.DefaultQuery("type", "xlsx")

	if err := ctx.ShouldBindJSON(&body); err != nil {
		ctx.JSON(http.StatusBadRequest, "BODY IS REQUIRED")
		return
	}
	body.Type = fileType

	fmt.Printf("%v %v %v \n", body.Type, body.Header, body.Params.Limit)

	response, err := h.UserService.GenerateReport(&body)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, "SOMETHING WENT WRONG")
		return
	}
	ctx.JSON(http.StatusOK, response)
	return
}

func (h *UserHandler) Create(ctx *gin.Context) {
	var body models.CreateParams
	if err := ctx.ShouldBindJSON(&body); err != nil {
		ctx.JSON(http.StatusBadGateway, "BODY IS REQUIRED")
		return
	}

	if body.Email == "" {
		ctx.JSON(http.StatusBadGateway, "EMAIL_IS_REQUIRED")
		return
	}

	if body.Names == "" {
		ctx.JSON(http.StatusBadGateway, "NAMES_IS_REQUIRED")
		return
	}

	if body.LastNames == "" {
		ctx.JSON(http.StatusBadGateway, "LAST_NAMES_IS_REQUIRED")
		return
	}

	profiles := body.Profiles
	user := models.User{
		Id:          body.Id,
		Names:       body.Names,
		LastNames:   body.LastNames,
		Email:       body.Email,
		Password:    body.Password,
		Active:      body.Active,
		ProfileImg:  body.ProfileImg,
		TimeCreated: body.TimeCreated,
		TimeUpdated: body.TimeUpdated,
	}
	err := h.UserService.Create(&user, &profiles)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, "SOMETHING_WENT_WRONGj")
	}

	ctx.JSON(http.StatusCreated, true)
	return
}
