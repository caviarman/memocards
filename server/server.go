package server

import (
	ws "memocards/websocket"

	"github.com/gin-gonic/gin"
)

var (
	r   *gin.Engine
	hub *ws.Hub
)

//Start is the main func for starting server
func Start() {
	hub = ws.NewHub()
	go hub.Run()

	r = gin.Default()
	r.Use(CORSMiddleware())
	declareRoutes()

	err := r.Run(":3001")
	if err != nil {
		panic(err)
	}
}

// CORSMiddleware will set allowable origins and content
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "DELETE, GET, OPTIONS, POST, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
