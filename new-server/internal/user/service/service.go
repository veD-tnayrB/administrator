package service

import (
	"github.com/veD-tnayrB/administrator/internal/user/repository"

	profileRepo "github.com/veD-tnayrB/administrator/internal/profile/repository"
)

type Hasher interface {
	Encrypt(password string) (string, error)
	Check(password string) (bool, error)
}
type UserService struct {
	UserRepo    *repository.UserRepository
	ProfileRepo *profileRepo.ProfileRepository
	Hasher      Hasher
}
