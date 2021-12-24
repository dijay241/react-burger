import {
    FORGOT_PASSWORD_API_URL,
    RESET_PASSWORD_API_URL,
    REGISTER_API_URL,
    LOGIN_API_URL,
    LOGOUT_API_URL,
    REFRESH_API_URL,
    USER_API_URL
} from '../api';

import {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_ERROR,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,
    TOKEN_REQUEST,
    TOKEN_SUCCESS,
    TOKEN_ERROR,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR, RESET_PASSWORD_FLUSH
} from '../constants/auth';

import {getCookie, setCookie, deleteCookie} from '../utils';
import {Dispatch} from "redux";
import {TUser} from "../../../declarations/library-name";

export interface IForgotPasswordRequestAction {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordErrorAction {
    readonly type: typeof FORGOT_PASSWORD_ERROR;
}

export interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordErrorAction {
    readonly type: typeof RESET_PASSWORD_ERROR;
}

export interface IRegisterRequestAction {
    readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS;
    readonly user: TUser;
}

export interface IRegisterErrorAction {
    readonly type: typeof REGISTER_ERROR;
}

export interface ILoginRequestAction {
    readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS;
    readonly user: TUser;
}

export interface ILoginErrorAction {
    readonly type: typeof LOGIN_ERROR;
}

export interface ILogoutRequestAction {
    readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutErrorAction {
    readonly type: typeof LOGOUT_ERROR;
}

export interface ITokenRequestAction {
    readonly type: typeof TOKEN_REQUEST;
}

export interface ITokenSuccessAction {
    readonly type: typeof TOKEN_SUCCESS;
}

export interface ITokenErrorAction {
    readonly type: typeof TOKEN_ERROR;
}

export interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
    readonly user: TUser;
}

export interface IGetUserErrorAction {
    readonly type: typeof GET_USER_ERROR;
}

export interface IUpdateUserRequestAction {
    readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccessAction {
    readonly type: typeof UPDATE_USER_SUCCESS;
    readonly user: TUser;
}

export interface IUpdateUserErrorAction {
    readonly type: typeof UPDATE_USER_ERROR;
}

export interface IResetPasswordFlushAction {
    readonly type: typeof RESET_PASSWORD_FLUSH;
}

export type TAuthActions =
    | IForgotPasswordRequestAction
    | IForgotPasswordSuccessAction
    | IForgotPasswordErrorAction
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IResetPasswordErrorAction
    | IRegisterSuccessAction
    | IRegisterRequestAction
    | IRegisterErrorAction
    | ILoginRequestAction
    | ILoginSuccessAction
    | ILoginErrorAction
    | ILogoutRequestAction
    | ILogoutSuccessAction
    | ILogoutErrorAction
    | ITokenRequestAction
    | ITokenSuccessAction
    | ITokenErrorAction
    | IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserErrorAction
    | IUpdateUserRequestAction
    | IUpdateUserSuccessAction
    | IUpdateUserErrorAction
    | IResetPasswordFlushAction;

export function forgotPassword(email:string) {
    return function(dispatch:Dispatch) {
        if(email) {

            dispatch({
                type: FORGOT_PASSWORD_REQUEST
            });

            const data = {
                'email': email
            }

            fetch(FORGOT_PASSWORD_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(data => {
                    if(data.success) {
                        dispatch({
                            type: FORGOT_PASSWORD_SUCCESS
                        })
                    } else {
                        dispatch({
                            type: FORGOT_PASSWORD_ERROR
                        });
                        alert(data.message);
                    }
                })
                .catch(e => {
                    dispatch({
                        type: FORGOT_PASSWORD_ERROR
                    });
                    console.error(e);
                });
        }
    };
}

export function resetPassword(password:string, code:string) {
    return function(dispatch:Dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });

        const data = {
            "password": password,
            "token": code
        }

        fetch(RESET_PASSWORD_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                data.success ?
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS
                    })
                    :
                    dispatch({
                        type: RESET_PASSWORD_ERROR
                    });
                alert(data.message);
            })
            .catch(e => {
                dispatch({
                    type: RESET_PASSWORD_ERROR
                });
                console.error(e);
            });
    };
}

export function registerUser(name:string, email:string, password:string) {
    return function(dispatch:Dispatch) {
        dispatch({
            type: REGISTER_REQUEST
        });

        const data = {
            "email": email,
            "password": password,
            "name": name
        }

        fetch(REGISTER_API_URL, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    dispatch({
                        type: REGISTER_SUCCESS,
                        user: data.user
                    });
                    setCookie('accessToken', data.accessToken, {expires: 20});
                    setCookie('refreshToken', data.refreshToken);
                } else {
                    dispatch({
                        type: REGISTER_ERROR
                    });
                    alert(data.message);
                }
            })
            .catch(e => {
                dispatch({
                    type: REGISTER_ERROR
                });
                console.error(e);
            });
    };
}

export function logIn(email:string, password:string) {
    return function(dispatch:Dispatch) {
        dispatch({
            type: LOGIN_REQUEST
        });

        const data = {
            "email": email,
            "password": password,
        }

        fetch(LOGIN_API_URL, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        user: data.user
                    });
                    setCookie('accessToken', data.accessToken, {expires: 20});
                    setCookie('refreshToken', data.refreshToken);
                } else {
                    dispatch({
                        type: LOGIN_ERROR
                    });
                    alert(data.message);
                }
            })
            .catch(e => {
                dispatch({
                    type: LOGIN_ERROR
                });
                console.error(e);
            });
    };
}

export function logOut() {
    return function(dispatch:Dispatch) {
        dispatch({
            type: LOGOUT_REQUEST
        });

        const data = {
            "token": getCookie('refreshToken')
        }

        fetch(LOGOUT_API_URL, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    dispatch({
                        type: LOGOUT_SUCCESS
                    });
                    deleteCookie('accessToken');
                    deleteCookie('refreshToken');
                } else {
                    dispatch({
                        type: LOGOUT_ERROR
                    });
                    alert(data.message);
                }
            })
            .catch(e => {
                dispatch({
                    type: LOGOUT_ERROR
                });
                console.error(e);
            });
    };
}

export function refreshTokens() {
    return function(dispatch:Dispatch) {
        dispatch({
            type: TOKEN_REQUEST
        });

        const data = {
            "token": getCookie('refreshToken')
        }

        fetch(REFRESH_API_URL, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    dispatch({
                        type: TOKEN_SUCCESS
                    });
                    setCookie('accessToken', data.accessToken, {expires: 20});
                    setCookie('refreshToken', data.refreshToken);
                    getUser();
                } else {
                    dispatch({
                        type: TOKEN_ERROR
                    });
                    alert(data.message);
                }
            })
            .catch(e => {
                dispatch({
                    type: TOKEN_ERROR
                });
                console.error(e);
            });
    };
}

export function getUser() {
    return function(dispatch:Dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        });

        fetch(USER_API_URL, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getCookie('accessToken')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    dispatch({
                        type: GET_USER_SUCCESS,
                        user: data.user
                    });
                } else {
                    dispatch({
                        type: GET_USER_ERROR
                    });
                    getCookie('refreshToken') && refreshTokens();
                    alert(data.message);
                }
            })
            .catch(e => {
                dispatch({
                    type: GET_USER_ERROR
                });
                console.error(e);
            });
    };
}

export function updateUser(name:string, email:string, password:string) {
    return function(dispatch:Dispatch) {
        dispatch({
            type: UPDATE_USER_REQUEST
        });

        const data = {
            "email": email,
            "password": password,
            "name": name
        }

        fetch(USER_API_URL, {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getCookie('accessToken')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    dispatch({
                        type: UPDATE_USER_SUCCESS,
                        user: {
                            name: name,
                            email: email
                        }
                    });
                } else {
                    dispatch({
                        type: UPDATE_USER_ERROR
                    });
                    getCookie('refreshToken') && refreshTokens();
                    alert(data.message);
                }
            })
            .catch(e => {
                dispatch({
                    type: UPDATE_USER_ERROR
                });
                console.error(e);
            });
    };
}