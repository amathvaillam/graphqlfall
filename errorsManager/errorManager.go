package errorsmanager

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type CustomError struct {
	Code         int
	Message      string
	ErrorMessage string
}

func (err CustomError) ToString() string {
	return fmt.Sprintf("%s:\n %s ", err.Message, err.ErrorMessage)
}

func JsonError(w http.ResponseWriter, status int, custom CustomError) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(custom)
	// if err != nil {
	// 	http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
	// }
}

const (
	METHOD_NOT_ALLOWED = iota
	DB_GET_IMAGE
	FILE_ERROR
	WRONG_EXTENTION
	ERROR_TO_CONVERT_STRING
	PAGE_NOT_FOUND
	ERROR_PARSING_TEMPLATE
	NO_AUTHORIZED_PAGE

	BAD_IMAGE_FORMAT
	NO_VALID_NUMBER
	NO_USER_NAME
	USER_NAME_EXIST
	NO_PASSWORD
	NO_EMAIL
	NO_FIRST_NAME
	NO_LAST_NAME
	NO_GENDER
	NO_AGE
	EMAIL_EXIST
	BAD_FORMAT_EMAIL
	FAIL_OPEN_DB
	CAN_NOT_SET_COOKIES
	COOKIE_ERROR
	//CHAT
	CHAT_ERROR
	//user
	DB_UPDATING_UUID
	DB_AUTHENTICATION_ERROR
	DB_GET_USER
	DB_GET_LAST_ID_USER
	DB_INSERT_USER
	DB_GET_NBR_USER
	DB_GET_UID
	//POST
	CANNOT_LIKE_POST
	DB_GET_POST_NOT_FOUND
	DB_GET_ALLPOSTS
	DB_GET_ALLPOSTS_NBR
	DB_GET_POST_LIKES
	DB_GET_CATEG_POST
	DB_GET_POST_NBR_NOT_FOUND
	DB_DELETE_POST_LIKES

	DB_INSERT_POST

	CANNOT_LIKE_COMMENT
	EMPTY_COMMENT
	DB_GET_ALL_COMMENTS
	DB_GET_COMMENT_LIKES
	DB_GET_NBR_COMMENT

	BAD_POST_PARAM
	//category
	DB_GET_CATEGORY

	SQL_REQUEST_ERROR
	DB_UPDATE_FAILED
	NO_TITLE
	NO_CONTENT
	NO_CREATIONDATE
	NO_CATEGORIE
	NO_IMAGE

	//database error
	DB_NOT_FOUND
)

var localErrors = map[int]func(controller string, errorMessage string) CustomError{
	CHAT_ERROR: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusInternalServerError,
			Message:      controller + ": WEBSOCKET ERROR",
			ErrorMessage: errorMessage,
		}
	},
	//server
	NO_VALID_NUMBER: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusInternalServerError,
			Message:      controller + ":  ERROR GETTING IMAGE",
			ErrorMessage: errorMessage,
		}
	},
	DB_GET_IMAGE: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusInternalServerError,
			Message:      controller + ":  ERROR GETTING IMAGE",
			ErrorMessage: errorMessage,
		}
	},
	WRONG_EXTENTION: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusUnauthorized,
			Message:      controller + ":  WRONG EXTENTION",
			ErrorMessage: errorMessage,
		}
	},
	FILE_ERROR: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusInternalServerError,
			Message:      controller + ":  FILE ERROR",
			ErrorMessage: errorMessage,
		}
	},
	METHOD_NOT_ALLOWED: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusUnauthorized,
			Message:      controller + ":  EMPTY USERNAME",
			ErrorMessage: errorMessage,
		}
	},
	PAGE_NOT_FOUND: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusNotFound,
			Message:      controller + ":  PAGE NOT FOUND",
			ErrorMessage: errorMessage,
		}
	},
	ERROR_PARSING_TEMPLATE: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusInternalServerError,
			Message:      controller + ":  CANNOT PARSE TEMPLATE",
			ErrorMessage: errorMessage,
		}
	},
	BAD_IMAGE_FORMAT: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusBadRequest,
			Message:      controller + ":  PLEASE CHOOSE A VALID IMAGE",
			ErrorMessage: errorMessage,
		}
	},
	NO_AUTHORIZED_PAGE: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusForbidden,
			Message:      controller + ":  YOU ARE NOT AUTHORIZED IN THIS PAGE",
			ErrorMessage: errorMessage,
		}
	},
	//users
	DB_UPDATING_UUID: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusInternalServerError,
			Message:      controller + ":  ERROR UPDATING UUID",
			ErrorMessage: errorMessage,
		}
	},
	DB_AUTHENTICATION_ERROR: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusUnauthorized,
			Message:      controller + ":  ERROR AUTHENTICATION",
			ErrorMessage: errorMessage,
		}
	},

	DB_GET_USER: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusInternalServerError,
			Message:      controller + ":  ERROR GETTING USER",
			ErrorMessage: errorMessage,
		}
	},
	DB_GET_LAST_ID_USER: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusInternalServerError,
			Message:      controller + ":  ERROR GETTING LAST USER ID ",
			ErrorMessage: errorMessage,
		}
	},
	NO_USER_NAME: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusBadRequest,
			Message:      controller + ":  EMPTY USERNAME",
			ErrorMessage: errorMessage,
		}
	},

	USER_NAME_EXIST: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusConflict,
			Message:      controller + ":  USERNAME ALREADY EXIST",
			ErrorMessage: errorMessage,
		}
	},
	NO_PASSWORD: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusUnauthorized,
			Message:      controller + ":  EMPTY PASSWORD",
			ErrorMessage: errorMessage,
		}
	},
	NO_EMAIL: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusUnauthorized,
			Message:      controller + ":  EMPTY EMAIL",
			ErrorMessage: errorMessage,
		}
	},
	NO_FIRST_NAME: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusBadRequest,
			Message:      controller + ":  EMPTY FIRST NAME",
			ErrorMessage: errorMessage,
		}
	},
	NO_LAST_NAME: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusBadRequest,
			Message:      controller + ":  EMPTY LAST NAME",
			ErrorMessage: errorMessage,
		}
	},
	NO_GENDER: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusBadRequest,
			Message:      controller + ":  EMPTY GENDER",
			ErrorMessage: errorMessage,
		}
	},
	NO_AGE: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusBadRequest,
			Message:      controller + ":  EMPTY AGE",
			ErrorMessage: errorMessage,
		}
	},
	EMAIL_EXIST: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusConflict,
			Message:      controller + ":  EMAIL ALREADY EXIST",
			ErrorMessage: errorMessage,
		}
	},
	BAD_FORMAT_EMAIL: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusBadRequest,
			Message:      controller + ":  BAD FORMAT EMAIL",
			ErrorMessage: errorMessage,
		}
	},
	FAIL_OPEN_DB: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusInternalServerError,
			Message:      controller + ":  FAILED TO OPEN DB",
			ErrorMessage: errorMessage,
		}
	},

	//users
	DB_GET_NBR_USER: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusInternalServerError,
			Message:      controller + ":  ERROR GET NBR USERS",
			ErrorMessage: errorMessage,
		}
	},
	DB_GET_ALLPOSTS_NBR: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusInternalServerError,
			Message:      controller + ":  ERROR GETTING ALL POSTS COUNT",
			ErrorMessage: errorMessage,
		}
	},
	DB_GET_ALLPOSTS: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusNoContent,
			Message:      controller + ":  ERROR GETTING ALL POSTS",
			ErrorMessage: errorMessage,
		}
	},
	DB_GET_POST_LIKES: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusNoContent,
			Message:      controller + ":  ERROR GETTING POST LIKE",
			ErrorMessage: errorMessage,
		}
	},
	DB_GET_UID: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusInternalServerError,
			Message:      controller + ":  ERROR GETTING SESSION_UID",
			ErrorMessage: errorMessage,
		}
	},
	DB_GET_CATEG_POST: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusInternalServerError,
			Message:      controller + ":  ERROR GETTING CATEGORY POST",
			ErrorMessage: errorMessage,
		}
	},

	SQL_REQUEST_ERROR: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusInternalServerError,
			Message:      controller + ":  REQUEST ERROR",
			ErrorMessage: errorMessage,
		}
	},
	DB_INSERT_USER: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusInternalServerError,
			Message:      controller + ":  ERROR INSERTING USER",
			ErrorMessage: errorMessage,
		}
	},
	DB_UPDATE_FAILED: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusConflict,
			Message:      controller + ":  FAILED TO UPDATE",
			ErrorMessage: errorMessage,
		}
	},
	//POST
	CANNOT_LIKE_POST: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusInternalServerError,
			Message:      controller + ":  ERROR LIKING POST",
			ErrorMessage: errorMessage,
		}
	},
	DB_DELETE_POST_LIKES: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusNotFound,
			Message:      controller + ":  POST NOT FOUND",
			ErrorMessage: errorMessage,
		}
	},
	DB_GET_POST_NBR_NOT_FOUND: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusOK,
			Message:      controller + ":  POST NOT FOUND",
			ErrorMessage: errorMessage,
		}
	},
	DB_GET_POST_NOT_FOUND: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusNotFound,
			Message:      controller + ":  POST NOT FOUND",
			ErrorMessage: errorMessage,
		}
	},
	BAD_POST_PARAM: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusUnauthorized,
			Message:      controller + ":  Unauthorized Action",
			ErrorMessage: errorMessage,
		}
	},
	DB_INSERT_POST: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusNotFound,
			Message:      controller + ":  ERROR INSERTING POST",
			ErrorMessage: errorMessage,
		}
	},
	//comments
	EMPTY_COMMENT: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusUnauthorized,
			Message:      controller + ":  EMPTY COMMENT",
			ErrorMessage: errorMessage,
		}
	},
	CANNOT_LIKE_COMMENT: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusInternalServerError,
			Message:      controller + ":  ERROR LIKING COMMENTS",
			ErrorMessage: errorMessage,
		}
	},
	DB_GET_ALL_COMMENTS: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusInternalServerError,
			Message:      controller + ":  CANNOT GET COMMENTS",
			ErrorMessage: errorMessage,
		}
	},
	DB_GET_NBR_COMMENT: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusInternalServerError,
			Message:      controller + ":  CANNOT GET NBR COMMENTS",
			ErrorMessage: errorMessage,
		}
	},
	DB_GET_COMMENT_LIKES: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusInternalServerError,
			Message:      controller + ":  CANNOT GET COMMENT LIKE ",
			ErrorMessage: errorMessage,
		}
	},
	//category
	DB_GET_CATEGORY: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusBadRequest,
			Message:      controller + ":  ERROR GET CATEGORY",
			ErrorMessage: errorMessage,
		}
	},
	//cookies
	COOKIE_ERROR: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusInternalServerError,
			Message:      controller + ":  COOKIE ERROR",
			ErrorMessage: errorMessage,
		}
	},
	CAN_NOT_SET_COOKIES: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusInternalServerError,
			Message:      controller + ":  CAN NOT SET COOKIES",
			ErrorMessage: errorMessage,
		}
	},
	NO_TITLE: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusBadRequest,
			Message:      controller + ":  EMPTY TITLE",
			ErrorMessage: errorMessage,
		}
	},
	NO_CONTENT: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusBadRequest,
			Message:      controller + ":  EMPTY CONTENT",
			ErrorMessage: errorMessage,
		}
	},
	NO_CREATIONDATE: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusBadRequest,
			Message:      controller + ":  EMPTY CREATION DATE",
			ErrorMessage: errorMessage,
		}
	},
	NO_CATEGORIE: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusBadRequest,
			Message:      controller + ":  EMPTY CATEGORY",
			ErrorMessage: errorMessage,
		}
	},
	NO_IMAGE: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusBadRequest,
			Message:      controller + ":  EMPTY URL_IMAGE",
			ErrorMessage: errorMessage,
		}
	},
	//database
	DB_NOT_FOUND: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusInternalServerError,
			Message:      controller + ":  DATABASE NOT FOUND",
			ErrorMessage: errorMessage,
		}
	},
	ERROR_TO_CONVERT_STRING: func(controller string, errorMessage string) CustomError {
		return CustomError{
			Code:         http.StatusNotFound,
			Message:      controller + ":  CONVERSION NOT FOUND",
			ErrorMessage: errorMessage,
		}
	},
}

func HttpStatusFromCode(controller string, code int, errorMessage string) CustomError {
	return localErrors[code](controller, errorMessage)
}
