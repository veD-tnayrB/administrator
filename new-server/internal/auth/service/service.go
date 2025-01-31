package service

import (
	"errors"
	"fmt"
	"time"

	"github.com/veD-tnayrB/administrator/common/helpers"
	"github.com/veD-tnayrB/administrator/internal/auth/models"
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

func (s *AuthService) Login(params *models.LoginParams) error {
	if params.Email == "" {
		return errors.New("EMAIL_IS_REQUIRED")
	}

	// hmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
	// TODO: @veD-tnayrB Bryant motherfucker plase add the logic too handle the google, facebook, etc, login motherfucker
	// if params.Password == "" {
	// 	return errors.New("PASSWORD_IS_REQUIRED ???")
	// }
	user, err := s.UserRepository.GetActiveByEmail(params.Email)
	if err != nil {
		return errors.New("ERROR_WHILE_VERIFYING_IF_USER_EXISTS")
	}

	if user == nil {
		return errors.New("USER_DOESNT_EXISTS")
	}

	// token logic
	tokenPayload := map[string]interface{}{
		"email": params.Email,
		"id":    user.Id,
	}
	token, err := s.TokenService.Generate(tokenPayload)
	if err != nil {
		return errors.New("ERROR_WHILE_GENERATING_THE_ACCESS_TOKEN")
	}
	fmt.Println(token)

	tx, transactionErr := s.UserRepository.DB.Begin()
	if transactionErr != nil {
		return errors.New("ERROR_WHILE_INITIALIZING_THE_TRANSACTION")
	}

	defer func() {
		if err != nil {
			tx.Rollback()
		}
	}()

	timeCreated, err := helpers.ParseToDBDate(time.Now())
	if err != nil {
		return errors.New("COULDNT_DEFINE_THE_TIME_CREATED_PROPERLY")
	}

	timeUpdated, err := helpers.ParseToDBDate(time.Now())
	if err != nil {
		return errors.New("COULDNT_DEFINE_THE_TIME_UPDATED_PROPERLY")
	}

	tokenErr := s.UserRepository.CreateAccessToken(tx, user.Id, timeCreated, timeUpdated, params.NotificationToken, params.Timezone)
	if tokenErr != nil {
		return errors.New("COULDNT_CREATE_THE_TOKEN_REGISTRY")
	}

	return nil
}
