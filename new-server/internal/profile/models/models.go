package models

type Profile struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	TimeCreated string `json:"timeCreated"`
	TimeUpdated string `json:"timeUpdated"`
	Active      bool   `json:"active"`
}
