package security

import (
	"os"

	"github.com/golang-jwt/jwt/v5"
)

type TokenService struct {
}

func NewTokenService() *TokenService {
	return &TokenService{}
}

type TokenPayload map[string]interface{}

func (s *TokenService) Generate(payload TokenPayload) (string, error) {
	key := os.Getenv("JWT_SECRET")

	formattedPayload := jwt.MapClaims{}
	for key := range payload {
		formattedPayload[key] = payload[key]
	}
	tokenInstance := jwt.NewWithClaims(jwt.SigningMethodES256, formattedPayload)
	return tokenInstance.SignedString(key)
}
