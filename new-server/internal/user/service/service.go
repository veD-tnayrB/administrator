package service

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	"github.com/veD-tnayrB/administrator/internal/user/models"
	"github.com/veD-tnayrB/administrator/internal/user/repository"

	profileRepo "github.com/veD-tnayrB/administrator/internal/profile/repository"
)

type UserService struct {
	UserRepo    *repository.UserRepository
	ProfileRepo *profileRepo.ProfileRepository
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
	fmt.Printf("registers: %v\n", registers)

	if err != nil {
		return 0, errors.New("COULDNT_GET_REGISTERS")
	}

	return 1, nil
}

func (s *UserService) Create(user *models.User, profiles *[]string) (err error) {
	if len(*profiles) == 0 {
		return errors.New("AT_LEAST_ONE_PROFILE_IS_REQUIRED")

	}

	if user.Email == "" {
		return errors.New("EMAIL_IS_REQUIRED")
	}

	if user.Names == "" {
		return errors.New("NAMES_ARE_REQUIRED")
	}

	if user.LastNames == "" {
		return errors.New("LAST_NAMES_ARE_REQUIRED")
	}

	tx, transactionErr := s.UserRepo.DB.Begin()
	if transactionErr != nil {
		return errors.New("ERROR_WHILE_INITIALIZING_THE_TRANSACTION")
	}
	defer func() {
		if err != nil {
			tx.Rollback()
		}
	}()

	_, uniqueErr := s.UserRepo.GetByEmail(user.Email)
	if uniqueErr != nil {
		return errors.New("ERROR_WHILE_VERIFYING_IF_REGISTER_IS_UNIQUE")
	}

	if user.Password != "" {
		// TODO: @veD-tnayrB please add the comming password case
	}
	// TODO: @veD-tnayrB Bryant remember this is the code for the administrator
	// So having that on mind add the email notification logic

	userErr := s.UserRepo.Create(tx, user)
	if userErr != nil {
		return errors.New("USER_COULDNT_BE_CREATED")
	}

	assignErr := s.assignProfiles(tx, user.Id, profiles)
	if assignErr != nil {
		return errors.New("COULDNT_ASSIGN_PROFILE")
	}

	responseErr := tx.Commit()
	return responseErr
}

func (s *UserService) assignProfiles(tx *sql.Tx, id string, profileIds *[]string) error {

	for _, profileId := range *profileIds {
		exist, err := s.ProfileRepo.CheckIfExists(profileId)
		if err != nil {
			return errors.New("COULDNT_CHECK_PROFILE_ID")
		}

		if !exist {
			return errors.New(fmt.Sprintf("id: %v for profiles is incorrect\n", profileId))
		}

		assignErr := s.UserRepo.AssignProfile(tx, id, profileId)
		if assignErr != nil {
			return errors.New("COULDNT_ASSIGN_PROFILE")
		}
	}
	return nil
}
