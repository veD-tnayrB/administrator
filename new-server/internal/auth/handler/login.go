package handler

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/veD-tnayrB/administrator/internal/auth/models"
)

func (h *AuthHandler) Login(ctx *gin.Context) {
	var body models.LoginParams

	if err := ctx.ShouldBindJSON(&body); err != nil {
		ctx.JSON(http.StatusBadRequest, "BODY IS REQUIRED")
		return
	}

	if body.Email == "" {
		ctx.JSON(http.StatusBadRequest, "EMAIL_IS_REQUIRED")
		return
	}

	if body.Password == "" {
		ctx.JSON(http.StatusBadRequest, "PASSWORD_IS_REQUIRED")
		return
	}

	response, err := h.AuthService.Login(&body)
	if err != nil {
		fmt.Printf("%v", err)
		ctx.JSON(http.StatusInternalServerError, err)
		return
	}

	ctx.JSON(http.StatusOK, response)
	return
}
