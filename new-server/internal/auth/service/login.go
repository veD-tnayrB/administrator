package service

import (
	"database/sql"
	"errors"
	"fmt"
	"time"

	"github.com/veD-tnayrB/administrator/common/helpers"
	"github.com/veD-tnayrB/administrator/internal/auth/models"
)

func (s *AuthService) Login(params *models.LoginParams) (*models.LoginResponse, error) {
	if params.Email == "" {
		return nil, errors.New("EMAIL_IS_REQUIRED")
	}
	user, err := s.UserRepository.GetActiveByEmail(params.Email)
	fmt.Printf("%v", user)
	if err != nil {
		return nil, errors.New("ERROR_WHILE_VERIFYING_IF_USER_EXISTS")
	}

	if user == nil {
		return nil, errors.New("USER_DOESNT_EXISTS")
	}

	tx, transactionErr := s.AuthRepository.DB.Begin()
	if transactionErr != nil {
		return nil, errors.New("ERROR_WHILE_INITIALIZING_THE_TRANSACTION")
	}

	defer func() {
		if err != nil {
			tx.Rollback()
		}
	}()

	token, err := s.generateToken(tx, params, user.Id)
	if err != nil {
		return nil, errors.New("ERROR_GENERATING_TOKEN")
	}

	profiles, err := s.ProfileRepository.GetUserProfiles(user.Id)
	if err != nil {
		return nil, errors.New("ERROR_GETTING_USER_PROFILES")
	}

	formattedProfiles := []*models.ProfileDTO{}
	for index := range profiles {
		formattedProfiles = append(formattedProfiles, s.parseProfile(profiles[index]))
	}

	permissions, err := s.PermissionRepository.GetUserPermissions(user.Id)
	if err != nil {
		return nil, errors.New("ERROR_GETTING_USER_PERMISSIONS")
	}
	formattedPermissions := []*models.PermissionDTO{}
	for index := range permissions {
		formattedPermissions = append(formattedPermissions, s.parsePermission(permissions[index]))
	}

	formattedUser := models.UserDTO{
		Id:          user.Id,
		Names:       user.Names,
		LastNames:   user.LastNames,
		Email:       user.Email,
		Active:      user.Active,
		ProfileImg:  user.ProfileImg,
		Profiles:    formattedProfiles,
		Permissions: formattedPermissions,
	}

	response := models.LoginResponse{
		User:  &formattedUser,
		Token: token,
	}

	return &response, nil
}

func (s *AuthService) generateToken(tx *sql.Tx, params *models.LoginParams, userId string) (string, error) {
	tokenPayload := map[string]interface{}{
		"email": params.Email,
		"id":    userId,
	}
	token, err := s.TokenService.Generate(tokenPayload)
	if err != nil {
		return "", errors.New("ERROR_WHILE_GENERATING_THE_ACCESS_TOKEN")
	}

	timeCreated, err := helpers.ParseToDBDate(time.Now())
	if err != nil {
		return "", errors.New("COULDNT_DEFINE_THE_TIME_CREATED_PROPERLY")
	}

	timeUpdated, err := helpers.ParseToDBDate(time.Now())
	if err != nil {
		return "", errors.New("COULDNT_DEFINE_THE_TIME_UPDATED_PROPERLY")
	}

	tokenErr := s.UserRepository.CreateAccessToken(tx, userId, timeCreated, timeUpdated, params.NotificationToken, params.Timezone)
	if tokenErr != nil {
		return "", errors.New("COULDNT_CREATE_THE_TOKEN_REGISTRY")
	}

	return token, nil
}
