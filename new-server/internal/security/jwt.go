package security

import (
	"errors"
	"fmt"
	"os"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type TokenService struct {
}

func NewTokenService() *TokenService {
	return &TokenService{}
}

// Takes the payload to generate the token.
func (s *TokenService) Generate(payload map[string]interface{}) (string, error) {
	key := os.Getenv("JWT_SECRET")
	if key == "" {
		return "", errors.New("NO_JWT_SECRET_DEFINED")
	}

	formattedPayload := jwt.MapClaims{}
	for key := range payload {
		formattedPayload[key] = payload[key]
	}

	expirationTime := os.Getenv("JWT_EXPIRATION_TIME")
	if expirationTime == "" {
		return "", errors.New("NO_EXPIRATION_TIME_FOR_JWT_HAS_BEEN_SET")
	}

	expiration, err := strconv.Atoi(expirationTime)
	if err != nil {
		return "", errors.New("ERROR_CONVERTING_EXPIRATION_TIME_TO_INT")
	}

	formattedTime := time.Hour * time.Duration(expiration)
	formattedPayload["expiresIn"] = time.Now().Add(formattedTime).Unix()
	tokenInstance := jwt.NewWithClaims(jwt.SigningMethodES256, formattedPayload)
	return tokenInstance.SignedString([]byte(key))
}

func (s *TokenService) Verify(token string) (bool, error) {
	secret := []byte(os.Getenv("JWT_SECRET"))

	tokenInstance, err := jwt.ParseWithClaims(token, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return secret, nil
	})

	if err != nil {
		return false, errors.New("INVALID_TOKEN")
	}

	_, ok := tokenInstance.Claims.(*jwt.RegisteredClaims)
	if !ok || !tokenInstance.Valid {
		return false, errors.New("INVALID_TOKEN")
	}

	return true, nil
}
