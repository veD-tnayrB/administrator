package models

type LoginParams struct {
	Email             string `json:"email"`
	Password          string `json:"password"`
	NotificationToken string `json:"notificationToken"`
	Timezone          string `json:"timezone"`
}

type UserDTO struct {
	Id         string `json:"id"`
	Names      string `json:"names"`
	LastNames  string `json:"lastNames"`
	Email      string `json:"email"`
	Active     bool   `json:"active"`
	ProfileImg string `json:"profileImg"`

	Profiles    []*ProfileDTO
	Permissions []*PermissionDTO
}

type PermissionDTO struct {
	Id       string `json:"id"`
	ModuleId string `json:"moduleId"`
	Name     string `json:"name"`
}

type ProfileDTO struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type LoginResponse struct {
	User  *UserDTO `json:"user"`
	Token string   `json:"token"`
}
