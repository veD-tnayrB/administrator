package models

type User struct {
	Id                  string `json:"id"`
	Names               string `json:"names"`
	LastNames           string `json:"lastNames"`
	Email               string `json:"email"`
	Password            string `json:"password"`
	Active              bool   `json:"active"`
	ProfileImg          string `json:"profileImg"`
	ForgetPasswordToken string `json:"forgetPasswordToken"`
	TimeCreated         string `json:"timeCreated"`
	TimeUpdated         string `json:"timeUpdated"`
}

type GetRegisteredByMonthResponse struct {
	Count    int    `json:"count"`
	Month    string `json:"month"`
	Improved int    `json:"improved"`
}

type WhereParams struct {
	Names       string `json:"names,omitempty"`
	Id          string `json:"id,omitempty"`
	LastNames   string `json:"lastNames,omitempty"`
	Email       string `json:"email,omitempty"`
	Active      bool   `json:"active,omitempty"`
	TimeCreated string `json:"timeCreated,omitempty"`
	TimeUpdated string `json:"timeUpdated,omitempty"`
}

type ListParams struct {
	Limit int
	Order string
	Start int
	Desc  string
	Where *WhereParams
}
