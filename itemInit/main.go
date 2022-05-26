package main

import (
	"fmt"
	"itemInit/src/connections"

	"github.com/gin-gonic/gin"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	// gin.SetMode(gin.ReleaseMode)

	connections.InitMysql()

	r := gin.Default()

	r.GET("/", func(c *gin.Context) {

	})

	if err := r.Run(":62478"); err != nil {
		fmt.Printf("startup service failed, err:%v\n", err)
	}
}
