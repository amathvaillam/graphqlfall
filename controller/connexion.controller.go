package controller

import (
	"encoding/json"
	errorsmanager "forum/errorsManager"
	"net/http"
	"time"
)

const CONTROLLERCONNECTION = "USERCONNEXION"

type ConnexionController struct {
	CT *Controller
}

func NewConnexionController(ct *Controller) *UserController {
	return &UserController{
		CT: ct,
	}
}

func (a *UserController) SignInHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		return
	} else if r.Method == "POST" {
		var formData map[string]string
		decoder := json.NewDecoder(r.Body)
		if err := decoder.Decode(&formData); err != nil {
			http.Error(w, "Failed to decode JSON", http.StatusBadRequest)
			return
		}
		email := formData["email"]
		password := formData["password"]
		//isValid := isValidEmail(email)
		if email == "" {
			errMes := errorsmanager.HttpStatusFromCode("SIGNIN", errorsmanager.NO_EMAIL, "Username or email is required")
			errorsmanager.JsonError(w, errMes.Code, errMes)
			return
		}
		if password == "" {
			errMes := errorsmanager.HttpStatusFromCode("SIGNIN", errorsmanager.NO_PASSWORD, "Password is required")
			errorsmanager.JsonError(w, errMes.Code, errMes)
			return
		}

		data := map[string]string{
			"password": password,
			"email":    email,
		}
		a.CT.JsonLoginRedirect(w, http.StatusOK, "/", data)
		return
	} else {
		errMes := errorsmanager.HttpStatusFromCode("SIGNIN", errorsmanager.DB_AUTHENTICATION_ERROR, "INCORRECT EMAIL OR PASSWORD OR USER NOT EXIST")
		errorsmanager.JsonError(w, errMes.Code, errMes)
		return
	}
}

func (a *UserController) SignOutHandler(w http.ResponseWriter, r *http.Request) {
	cookie := http.Cookie{
		Name:    "token",
		Value:   "",
		Expires: time.Now().Add(-time.Hour),
		Path:    "/",
	}
	http.SetCookie(w, &cookie)
	a.CT.JsonRedirect(w, http.StatusOK, "/signin")
}
