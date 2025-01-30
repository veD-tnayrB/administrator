package service

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/veD-tnayrB/administrator/internal/user/models"
	"github.com/veD-tnayrB/administrator/internal/user/repository"

	profileRepo "github.com/veD-tnayrB/administrator/internal/profile/repository"

	"github.com/veD-tnayrB/administrator/common/helpers"
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

	// TODO: @veD-tnayrB This is error handling, if the error handling method changes make sure this works
	defer func() {
		fmt.Printf("defer for transaction: %v\n", err)
		if err != nil {
			tx.Rollback()
		}
	}()

	exists, uniqueErr := s.UserRepo.CheckIfExistsWithEmail(user.Email)
	fmt.Printf("exists %v email: %v\n", exists, user.Email)

	if uniqueErr != nil {
		return errors.New("ERROR_WHILE_VERIFYING_IF_REGISTER_IS_UNIQUE")
	}

	if exists {
		return errors.New("EMAIL_ALREADY_EXISTS")
	}

	notifyUser := false
	if user.Password == "" {
		user.Password = os.Getenv("USER_DEFAULT_PASSWORD")
		notifyUser = true
	}

	// TODO: @veD-tnayrB please add the comming password case
	user.Password, err = helpers.EncryptPassword(user.Password)
	if err != nil {
		return errors.New("ERROR_ENCRYPTING_PASSWORD")
	}

	if notifyUser {
		// Logic here to send the email notification buddy

		// TODO: @veD-tnayrB Bryant remember this is the code for the administrator
		// So having that on mind add the email notification logic
	}

	// Take the current date (date when the transaction is made and applu it to the values)
	user.TimeCreated, err = helpers.ParseToDBDate(time.Now())
	if err != nil {
		return errors.New("ERROR_WHILE_PARSING_TIME_CREATED")
	}
	user.TimeUpdated, err = helpers.ParseToDBDate(time.Now())
	if err != nil {
		return errors.New("ERROR_WHILE_PARSING_TIME_UPDATED")
	}

	userErr := s.UserRepo.Create(tx, user)
	if userErr != nil {
		fmt.Printf("err: %v\n", userErr)
		return errors.New("USER_COULDNT_BE_CREATED")
	}

	assignErr := s.assignProfiles(tx, user.Id, profiles)
	if assignErr != nil {
		return errors.New("COULDNT_ASSIGN_PROFILE")
	}

	responseErr := tx.Commit()
	return responseErr
}

func (s *UserService) Update(user *models.User, profiles *[]string) (err error) {
	if user.Id == "" {
		return errors.New("ID_IS_REQUIRED")
	}

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

	// TODO: @veD-tnayrB This is error handling, if the error handling method changes make sure this works
	defer func() {
		fmt.Printf("defer for transaction: %v\n", err)
		if err != nil {
			tx.Rollback()
		}
	}()

	exists, err := s.UserRepo.CheckIfExistsWithEmail(user.Email)
	fmt.Printf("exists %v email: %v\n", exists, user.Email)

	if err != nil {
		return errors.New("ERROR_WHILE_VERIFYING_IF_REGISTER_IS_UNIQUE")
	}

	if !exists {
		return errors.New("EMAIL_ALREADY_EXISTS")
	}

	if user.Password != "" {
		// TODO: @veD-tnayrB if the password changes notify the user by an email.
	}

	// Only updates the TimeUpdated value bc at this point the user was already created.
	user.TimeUpdated = time.Now().UTC().Format(time.RFC3339)
	userErr := s.UserRepo.Update(tx, user)
	if userErr != nil {
		return errors.New("USER_COULDNT_BE_UPDATED")
	}

	assignErr := s.UserRepo.RemoveAssignedProfiles(tx, user.Id)
	if assignErr != nil {
		return errors.New("COULDNT_REMOVE_ASSIGNED_PROFILES")
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
