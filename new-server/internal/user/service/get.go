package service

import (
	"context"
	"errors"

	"github.com/veD-tnayrB/administrator/internal/user/models"
)

func (s *UserService) GetById(ctx context.Context, id string) (*models.User, error) {
	if id == "" {
		return nil, errors.New("ID_REQUIRED")
	}
	return s.UserRepo.GetById(ctx, id)
}
