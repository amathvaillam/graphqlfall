package controller

import (
	errorsmanager "forum/errorsManager"
	"net/http"
	"strings"
)

const CONTROLLERHOME = "HOME"

type HomeControler struct {
	CT *Controller
}

func NewHomeController(ct *Controller) *HomeControler {
	return &HomeControler{
		CT: ct,
	}
}

func (p *HomeControler) HomeHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {

		//recuperation de tous les categories

		tab := strings.Split(r.URL.String(), "/")
		numPage := 1

		if len(tab) == 3 || len(tab) == 4 && numPage > 0 {
			p.CT.JsonResponse(w, http.StatusOK, "")
			return
		} else {
			errMes := errorsmanager.HttpStatusFromCode(CONTROLLERHOME, errorsmanager.PAGE_NOT_FOUND, "Bad url")
			errorsmanager.JsonError(w, errMes.Code, errMes)
			return
		}
	} else {
		errMes := errorsmanager.HttpStatusFromCode(CONTROLLERHOME, errorsmanager.METHOD_NOT_ALLOWED, "ONLY GET METHOD IS ALLOWED")
		errorsmanager.JsonError(w, errMes.Code, errMes)
		return
	}
}
