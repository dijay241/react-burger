import {
    FORGOT_PASSWORD_API_URL,
    RESET_PASSWORD_API_URL,
    REGISTER_API_URL,
    LOGIN_API_URL,
    LOGOUT_API_URL,
    REFRESH_API_URL,
    USER_API_URL
} from '../api';

import {getCookie, setCookie, deleteCookie} from '../utils';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';

export const RESET_PASSWORD_FLUSH = 'RESET_PASSWORD_FLUSH';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_ERROR = 'TOKEN_ERROR';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

export function forgotPassword(email:string) {
    return function(dispatch) {
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
    return function(dispatch) {
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
    return function(dispatch) {
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
    return function(dispatch) {
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
    return function(dispatch) {
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
    return function(dispatch) {
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
    return function(dispatch) {
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
    return function(dispatch) {
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