package controller

import (
	"net/http"
)

const CONTROLLER = "USER"

type UserController struct {
	CT *Controller
}

func NewUserController(ct *Controller) *UserController {
	return &UserController{
		CT: ct,
	}
}

func (u *UserController) UserHandler(w http.ResponseWriter, r *http.Request) {

}
