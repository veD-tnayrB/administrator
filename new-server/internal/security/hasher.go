package security

import (
	"errors"
	"os"
	"strconv"

	"golang.org/x/crypto/bcrypt"
)

type Hasher struct {
}

func NewHasher() *Hasher {
	return &Hasher{}
}

func (hasher *Hasher) Encrypt(password string) (string, error) {
	if password == "" {
		return "", errors.New("PASSWORD_NOT_PROVIDED")
	}

	passwordBytes := []byte(password)

	cost, err := strconv.Atoi(os.Getenv("HASH_COST"))
	if err != nil {
		return "", err
	}

	hashedPasswordBytes, err := bcrypt.GenerateFromPassword(passwordBytes, cost)
	if err != nil {
		return "", err
	}

	return string(hashedPasswordBytes), nil
}

func (hasher *Hasher) Check(password string) (bool, error) {
	return true, nil
}
