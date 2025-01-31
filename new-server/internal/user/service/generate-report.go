package service

import (
	"errors"
	"fmt"

	"github.com/veD-tnayrB/administrator/internal/user/models"
)

func (s *UserService) GenerateReport(params *models.GenerateReportParams) (int, error) {
	registers, err := s.UserRepo.List(params.Params)
	fmt.Printf("registers: %v\n", registers)

	if err != nil {
		return 0, errors.New("COULDNT_GET_REGISTERS")
	}

	return 1, nil
}
