package server

import (
	"net/http"
	"path"
	"path/filepath"

	cards "memocards/cards"
	ws "memocards/websocket"

	"github.com/gin-gonic/gin"
)

func clientHandler(c *gin.Context) {
	dir, file := path.Split(c.Request.RequestURI)
	ext := filepath.Ext(file)
	if file == "" || ext == "" {
		c.File("/go/src/memocards/client/dist/client/index.html")
	} else {
		c.File("/go/src/memocards/client/dist/client/" + path.Join(dir, file))
	}
}

func startWS(c *gin.Context) {
	ws.ServeWs(hub, c.Writer, c.Request)
}

func getCards(c *gin.Context) {
	c.JSON(http.StatusOK, cards.DefaultCards)
}
