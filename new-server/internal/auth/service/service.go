package service

import (
	"database/sql"

	repository "github.com/veD-tnayrB/administrator/internal/auth/repository"
	moduleModels "github.com/veD-tnayrB/administrator/internal/module/models"
	profileModels "github.com/veD-tnayrB/administrator/internal/profile/models"
	"github.com/veD-tnayrB/administrator/internal/user/models"
)

type Hasher interface {
	Encrypt(password string) (string, error)
	Check(password string) (bool, error)
}

type TokenService interface {
	Generate(payload map[string]interface{}) (string, error)
	Verify(token string) (bool, error)
}

type UserRepository interface {
	GetActiveByEmail(email string) (*models.User, error)
	CreateAccessToken(tx *sql.Tx, userId string, timeCreated string, timeUpdated string, notificationToken string, timezone string) error
	GetByAccessToken(token string) (*models.User, error)
}

type PermissionRepository interface {
	GetUserPermissions(userId string) ([]*moduleModels.ModuleAction, error)
}

type ProfileRepository interface {
	GetUserProfiles(userId string) ([]*profileModels.Profile, error)
}
type AuthService struct {
	UserRepository       UserRepository
	Hasher               Hasher
	TokenService         TokenService
	PermissionRepository PermissionRepository
	ProfileRepository    ProfileRepository
	AuthRepository       *repository.AuthRepository
}
