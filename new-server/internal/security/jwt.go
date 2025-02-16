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
	Secret string
}

func NewTokenService(secret string) *TokenService {
	return &TokenService{Secret: secret}
}

// Takes the payload to generate the token.
func (s *TokenService) Generate(payload map[string]interface{}) (string, error) {
	key := s.Secret
	if key == "" {
		return "", errors.New("NO_JWT_SECRET_DEFINED")
	}

	formattedPayload := jwt.MapClaims{}
	for key := range payload {
		formattedPayload[key] = payload[key]
	}

	expirationTime := os.Getenv("JWT_EXPIRE_TIME")
	if expirationTime == "" {
		return "", errors.New("NO_EXPIRATION_TIME_FOR_JWT_HAS_BEEN_SET")
	}

	expiration, err := strconv.Atoi(expirationTime)
	if err != nil {
		return "", errors.New("ERROR_CONVERTING_EXPIRATION_TIME_TO_INT")
	}

	formattedTime := time.Hour * time.Duration(expiration)
	formattedPayload["expiresIn"] = time.Now().Add(time.Hour * formattedTime).Unix()
	tokenInstance := jwt.NewWithClaims(jwt.SigningMethodHS256, formattedPayload)
	token, err := tokenInstance.SignedString([]byte(key))
	if err != nil {
		return "", errors.New("INVALID_SECRET")
	}
	return token, nil
}

func (s *TokenService) Verify(token string) (bool, error) {
	secret := []byte(s.Secret)

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
