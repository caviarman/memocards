package cards

//Card ...
type Card struct {
	ID     int    `json:"id"`
	UserID string `json:"userID"`
	Name   string `json:"name"`
	State  string `json:"state"`
	Image  string `json:"image"`
}

//DefaultCards is the start set of cards
var DefaultCards = []Card{
	Card{ID: 1, Name: "fa-battery-full", State: "free"},
	Card{ID: 2, Name: "fa-bell", State: "free"},
	Card{ID: 3, Name: "fa-birthday-cake", State: "free"},
	Card{ID: 4, Name: "fa-battery-full", State: "free"},
	Card{ID: 5, Name: "fa-bell", State: "free"},
	Card{ID: 6, Name: "fa-birthday-cake", State: "free"},
	Card{ID: 7, Name: "fa-car", State: "free"},
	Card{ID: 8, Name: "fa-car", State: "free"},
	Card{ID: 10, Name: "fa-crosshairs", State: "free"},
	Card{ID: 11, Name: "fa-crosshairs", State: "free"},
	Card{ID: 12, Name: "fa-coffee", State: "free"},
	Card{ID: 13, Name: "fa-coffee", State: "free"},
	Card{ID: 14, Name: "fa-bicycle", State: "free"},
	Card{ID: 15, Name: "fa-bicycle", State: "free"},
	Card{ID: 16, Name: "fa-child", State: "free"},
	Card{ID: 9, Name: "fa-child", State: "free"},
}
