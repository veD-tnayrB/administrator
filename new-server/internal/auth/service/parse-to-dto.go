package service

import (
	"github.com/veD-tnayrB/administrator/internal/auth/models"
	moduleModels "github.com/veD-tnayrB/administrator/internal/module/models"
	profilesModels "github.com/veD-tnayrB/administrator/internal/profile/models"
	userModel "github.com/veD-tnayrB/administrator/internal/user/models"
)

func (s *AuthService) parseUser(user *userModel.User) *models.UserDTO {

	return &models.UserDTO{
		Id:         user.Id,
		Names:      user.Names,
		LastNames:  user.LastNames,
		Email:      user.Email,
		Active:     user.Active,
		ProfileImg: user.ProfileImg,
	}
}

func (s *AuthService) parsePermission(moduleAction *moduleModels.ModuleAction) *models.PermissionDTO {
	return &models.PermissionDTO{
		Id:       moduleAction.Id,
		ModuleId: moduleAction.ModuleId,
		Name:     moduleAction.Name,
	}
}

func (s *AuthService) parseProfile(profile *profilesModels.Profile) *models.ProfileDTO {
	return &models.ProfileDTO{
		Id:   profile.Id,
		Name: profile.Name,
	}
}
