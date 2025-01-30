package main

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	database "github.com/veD-tnayrB/administrator/common"

	profileRepository "github.com/veD-tnayrB/administrator/internal/profile/repository"
	security "github.com/veD-tnayrB/administrator/internal/security"

	userHandler "github.com/veD-tnayrB/administrator/internal/user/handler"
	userRepository "github.com/veD-tnayrB/administrator/internal/user/repository"
	userService "github.com/veD-tnayrB/administrator/internal/user/service"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("ERROR WHILE LOADING THE ENV VARIABLES")
	}
	db, err := database.InitDB()
	fmt.Printf("err: %v \n", err)
	if err != nil {
		log.Fatal("ERROR CONNECTING WITH DB")
	}
	defer db.Close()

	profileRepository := profileRepository.ProfileRepository{DB: db}

	hasher := security.NewHasher()

	userRepository := userRepository.UserRepository{DB: db}
	userService := userService.UserService{UserRepo: &userRepository, ProfileRepo: &profileRepository, Hasher: hasher}
	userHandler := userHandler.UserHandler{UserService: &userService}

	// authService := authService.AuthService{
	// 	UserRepository: &userRepository,
	// 	hasher:         hasher,
	// }

	router := gin.Default()
	v1 := router.Group("/v1/admin")

	users := v1.Group("/users")
	users.GET("/", userHandler.List)
	users.GET("/user/:id", userHandler.GetById)
	users.GET("/get-registered-users-by-month/:year", userHandler.GetRegisteredByMonth)
	users.POST("/generate-report/:type", userHandler.GenerateReport)
	users.POST("/user", userHandler.Create)
	// users.POST("/user/:id", userHandler.createUser)
	// users.PUT("/user/:id", userHandler.updateUser)

	router.Run(":5001")

}
