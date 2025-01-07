package main

import (
	"log"

	"github.com/gin-gonic/gin"
	database "github.com/veD-tnayrB/administrator/common"
	"github.com/veD-tnayrB/administrator/internal/user/handler"
	"github.com/veD-tnayrB/administrator/internal/user/repository"
	"github.com/veD-tnayrB/administrator/internal/user/service"
)

func main() {
	db, err := database.InitDB()
	if err != nil {
		log.Fatal("ERROR CONNECTING WITH DB")
	}
	defer db.Close()

	userRepository := repository.UserRepository{DB: db}
	userService := service.UserService{UserRepo: &userRepository}
	userHandler := handler.UserHandler{UserService: &userService}

	router := gin.Default()
	v1 := router.Group("/v1/admin")

	users := v1.Group("/users")
	users.GET("/", userHandler.List)
	users.GET("/user/:id", userHandler.GetById)
	users.GET("/get-registered-users-by-month/:year", userHandler.GetRegisteredByMonth)
	users.POST("/generate-report/:type", userHandler.GenerateReport)
	// users.POST("/user/:id", userHandler.createUser)
	// users.PUT("/user/:id", userHandler.updateUser)

	router.Run(":5001")

}
