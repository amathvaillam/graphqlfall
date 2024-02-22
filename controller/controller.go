package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

func cleanInput(str string) string {
	str = strings.ReplaceAll(str, "\n", "")
	str = strings.ReplaceAll(str, "\r", "")
	str = strings.ReplaceAll(str, " ", "")
	return str
}

type Controller struct {
}

func NewController() *Controller {
	return &Controller{}
}

func (ct *Controller) getParam(path string, length int) (id int, ok bool, tabl []string) {
	tab := strings.Split(path, "/")
	var err error
	if len(tab) == 4 {
		id, err = strconv.Atoi(tab[len(tab)-1])
	} else {
		id, err = strconv.Atoi(tab[len(tab)-2])
	}

	return id, len(tab) == length && id > 0 && err == nil, tab
}

func (ct *Controller) JsonResponse(w http.ResponseWriter, status int, data interface{}) {
	w.WriteHeader(status)
	w.Header().Set("Content-Type", "application/json")
	err := json.NewEncoder(w).Encode(data)
	if err != nil {
		http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
	}
}

func (ct *Controller) JsonRedirect(w http.ResponseWriter, status int, URL string) {
	w.WriteHeader(status)
	w.Header().Set("Content-Type", "application/json")
	redirectResponse := struct {
		URL string `json:"url"`
	}{
		URL: URL,
	}
	fmt.Println(1, redirectResponse)
	err := json.NewEncoder(w).Encode(redirectResponse)
	if err != nil {
		http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
	}
}

func (ct *Controller) JsonLoginRedirect(w http.ResponseWriter, status int, URL string, DATA map[string]string) {
	w.WriteHeader(status)
	w.Header().Set("Content-Type", "application/json")
	redirectResponse := struct {
		URL  string            `json:"url"`
		DATA map[string]string `json:"data"`
	}{
		URL:  URL,
		DATA: DATA,
	}
	err := json.NewEncoder(w).Encode(redirectResponse)
	if err != nil {
		http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
	}
}
