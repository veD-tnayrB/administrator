package modules

type Module struct {
	Id          string `json:"id"`
	Label       string `json:"label"`
	To          string `json:"to"`
	Order       int    `json:"order"`
	Icon        string `json:"icon"`
	Active      bool   `json:"active"`
	TimeCreated string `json:"timeCreated"`
	TimeUpdated string `json:"timeUpdated"`
}

type ModuleAction struct {
	Id          string `json:"id"`
	ModuleId    string `json:"moduleId"`
	Name        string `json:"name"`
	Description string `json:"description"`
	TimeCreated string `json:"timeCreated"`
	TimeUpdated string `json:"timeUpdated"`
}
