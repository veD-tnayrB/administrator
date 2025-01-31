package service

import (
	"context"
	"errors"

	"github.com/veD-tnayrB/administrator/internal/user/models"
)

func (s *UserService) GetRegisteredByMonth(ctx context.Context, year int) ([]*models.GetRegisteredByMonthResponse, error) {
	if year < 0 {
		return []*models.GetRegisteredByMonthResponse{}, errors.New("YEAR_NEEDS_TO_BE_GREATHER_THAN_0")
	}
	return s.UserRepo.GetRegisteredByMonth(ctx, year)
}
