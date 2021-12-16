package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()
	e.Use(middleware.Logger())
	e.GET("/api/hello", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.Static("/", "frontend/build")
	e.Logger.Fatal(e.Start(":1323"))
}
