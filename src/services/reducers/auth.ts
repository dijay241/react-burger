import {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_ERROR,
    RESET_PASSWORD_FLUSH,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS,
    GET_USER_SUCCESS,
    UPDATE_USER_SUCCESS
} from "../constants/auth";
import {TAuthState} from "../../../declarations/library-name";
import {TAuthActions} from "../actions/auth";

const initialState:TAuthState = {
    forgotRequest: false,
    forgotFailed: false,

    resetRequest: false,
    resetFailed: false,
    isReset: false,

    registerRequest: false,
    registerFailed: false,

    logoutRequest: false,
    logoutFailed: false,

    refreshRequest: false,
    refreshFailed: false,

    loginRequest: false,
    loginFailed: false,

    isAuthenticated: false,
    user: null
}

const authReducer = (state = initialState, action: TAuthActions) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                forgotRequest: true
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                forgotFailed: false,
                forgotRequest: false,
                isReset: true
            }
        case FORGOT_PASSWORD_ERROR:
            return {
                ...state,
                forgotFailed: true,
                forgotRequest: false,
                isReset: false
            }
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                resetRequest: true
            }
        case RESET_PASSWORD_FLUSH:
            return {
                ...state,
                resetRequest: false,
                resetFailed: false
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetFailed: false,
                resetRequest: false
            }
        case RESET_PASSWORD_ERROR:
            return {
                ...state,
                resetFailed: true,
                resetRequest: false
            }
        case REGISTER_REQUEST:
            return {
                ...state,
                registerRequest: true
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                registerFailed: false,
                registerRequest: false,
                isAuthenticated: true,
                user: action.user
            }
        case REGISTER_ERROR:
            return {
                ...state,
                registerFailed: true,
                registerRequest: false
            }
        case LOGIN_REQUEST:
            return {
                ...state,
                loginRequest: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginFailed: false,
                loginRequest: false,
                isAuthenticated: true,
                user: action.user
            }
        case LOGIN_ERROR:
            return {
                ...state,
                loginFailed: true,
                loginRequest: false
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.user
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                user: action.user
            }
        default:
            return state
    }
}

export default authReducer;