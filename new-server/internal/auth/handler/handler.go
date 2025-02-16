package handler

import (
	authService "github.com/veD-tnayrB/administrator/internal/auth/service"
)

type AuthHandler struct {
	AuthService *authService.AuthService
}
