package service

import (
	"errors"
	"fmt"

	"github.com/veD-tnayrB/administrator/internal/auth/models"
)

func (s *AuthService) Get(token string) (*models.LoginResponse, error) {
	if token == "" {
		return nil, errors.New("EMAIL_IS_REQUIRED")
	}
	user, err := s.UserRepository.GetByAccessToken(token)
	fmt.Printf("%v", user)
	if err != nil {
		return nil, errors.New("ERROR_WHILE_GETTING_THE_USER")
	}

	if user == nil {
		return nil, errors.New("USER_DOESNT_EXISTS")
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
