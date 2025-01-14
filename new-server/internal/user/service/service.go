package service

import (
	"context"
	"errors"

	"github.com/veD-tnayrB/administrator/internal/user/models"
	"github.com/veD-tnayrB/administrator/internal/user/repository"
)

type UserService struct {
	UserRepo *repository.UserRepository
}

func (s *UserService) GetById(ctx context.Context, id string) (*models.User, error) {
	if id == "" {
		return nil, errors.New("ID_REQUIRED")
	}
	return s.UserRepo.GetById(ctx, id)
}

func (s *UserService) GetRegisteredByMonth(ctx context.Context, year int) ([]*models.GetRegisteredByMonthResponse, error) {
	if year < 0 {
		return []*models.GetRegisteredByMonthResponse{}, errors.New("YEAR_NEEDS_TO_BE_GREATHER_THAN_0")
	}
	return s.UserRepo.GetRegisteredByMonth(ctx, year)
}

func (s *UserService) List(params *models.ListParams) ([]*models.User, error) {
	return s.UserRepo.List(params)
}

func (s *UserService) GenerateReport(params *models.GenerateReportParams) (int, error) {
	registers, err := s.UserRepo.List(params.Params)

	if err != nil {
		return 0, errors.New("COULDNT_GET_REGISTERS")
	}

	return 1, nil
}
