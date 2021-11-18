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
    REGISTER_ERROR
} from "../actions/auth";

const initialState = {
    forgotRequest: false,
    forgotFailed: false,

    resetRequest: false,
    resetFailed: false,

    registerRequest: false,
    registerFailed: false,

    logoutRequest: false,
    logoutFailed: false,

    refreshRequest: false,
    refreshFailed: false,

    loginRequest: false,
    loginFailed: false,

    isAuthenticated: false,
    user: {},
    accessToken: null,
    refreshToken: null
}

const authReducer = (state = initialState, action) => {
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
                forgotRequest: false
            }
        case FORGOT_PASSWORD_ERROR:
            return {
                ...state,
                forgotFailed: true,
                forgotRequest: false
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
                registerRequest: false
            }
        case REGISTER_ERROR:
            return {
                ...state,
                registerFailed: true,
                registerRequest: false
            }
        default:
            return state
    }
}

export default authReducer