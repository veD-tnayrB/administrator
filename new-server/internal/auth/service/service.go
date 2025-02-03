package service

import (
	"github.com/veD-tnayrB/administrator/internal/user/repository"
)

type Hasher interface {
	Encrypt(password string) (string, error)
	Check(password string) (bool, error)
}

type TokenService interface {
	Generate(payload map[string]interface{}) (string, error)
	Verify(token string) (bool, error)
}

type AuthService struct {
	UserRepository *repository.UserRepository
	Hasher         Hasher
	TokenService   TokenService
}
