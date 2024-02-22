package main

import (
	"fmt"
	"forum/controller"
	"net/http"
	"os"
	"path"
	"strings"

	_ "github.com/mattn/go-sqlite3"
)

var routes = []string{"/", "/home", "/signout", "/signin"}

type customRouter struct {
	mux    *http.ServeMux
	routes map[string]http.HandlerFunc
}

func (cr *customRouter) isRouterRegistered(pattern string) bool {
	_, exists := cr.routes[pattern]
	return exists
}
func (cr *customRouter) RegisterRoute(pattern string, handler http.HandlerFunc) {
	cr.routes[pattern] = handler
	cr.mux.HandleFunc(pattern, handler)
}

func getMux() *http.ServeMux {
	mux := http.NewServeMux()
	return mux
}

func extractPattern(path string) (string, bool) {
	parts := strings.Split(path, "/")
	if parts[1] == "api" {
		return "/api/" + parts[2], true
	} else if parts[1] == "ws" {
		return "/ws", true
	} else {
		return "/" + parts[1], false
	}

}
func contains(s []string, e string) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}
func (cr *customRouter) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	pattern, api := extractPattern(r.URL.Path)
	//badUrl := false
	if !api && pattern != "/static" && pattern != "/ws" {
		//	badUrl = !contains(routes, pattern)
		pattern = "/"
	}

	if pattern == "/static" {
		http.StripPrefix("/static", http.FileServer(http.Dir("frontend/static/"))).ServeHTTP(w, r)
	} else {
		cr.routes[pattern](w, r)
	}
}

func main() {

	if len(os.Args) == 1 {

		router := &customRouter{getMux(), make(map[string]http.HandlerFunc)}

		ct := controller.NewController()

		signInHandler := controller.NewConnexionController(ct).SignInHandler
		signOutHandler := controller.NewConnexionController(ct).SignOutHandler
		IndexHtml := func(w http.ResponseWriter, r *http.Request) {
			http.ServeFile(w, r, path.Join("frontend", "index.html"))
		}

		HomeHandler := controller.NewHomeController(ct).HomeHandler
		router.RegisterRoute("/", IndexHtml)
		router.RegisterRoute("/api/signin", signInHandler)
		router.RegisterRoute("/api/signout", signOutHandler)
		router.RegisterRoute("/api/home", HomeHandler)
		server := &http.Server{
			Addr:    ":8080",
			Handler: router,
		}
		fmt.Println("Server started  http://localhost:8080")
		err1 := server.ListenAndServe()
		if err1 != nil {
			fmt.Println(err1)
		}
	}
}
