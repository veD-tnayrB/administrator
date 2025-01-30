package models

type LoginParams struct {
	Email             string `json:"email"`
	Password          string `json:"password"`
	NotificationToken string `json:"notificationToken"`
	Timezone          string `json:"timezone"`
}
