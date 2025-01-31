package service

import "github.com/veD-tnayrB/administrator/internal/user/models"

func (s *UserService) List(params *models.ListParams) ([]*models.User, error) {
	return s.UserRepo.List(params)
}
