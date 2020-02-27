package server

func declareRoutes() {
	r.NoRoute(clientHandler)
	r.GET("/ws", startWS)
	r.GET("/cards", getCards)
}
