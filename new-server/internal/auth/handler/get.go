package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *AuthHandler) Get(ctx *gin.Context) {
	token := ctx.Param("token")
	if token == "" {
		ctx.JSON(http.StatusBadRequest, "TOKEN_IS_REQUIRED")
	}

	response, err := h.AuthService.Get(token)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, "SOMETHING_WENT_WRONG")
		return
	}

	ctx.JSON(http.StatusOK, response)
}
