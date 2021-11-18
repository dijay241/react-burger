export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_FAILED';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_FAILED';
export const SHOW_ORDER_MODAL = 'SHOW_ORDER_MODAL';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';
export const UPDATE_TOTAL_PRICE = 'UPDATE_TOTAL_PRICE';

export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';

export const REORDER_CONSTRUCTOR_ITEMS = 'REORDER_CONSTRUCTOR_ITEMS';
export const ADD_CONSTRUCTOR_ITEM = 'ADD_CONSTRUCTOR_ITEM';
export const DELETE_CONSTRUCTOR_ITEM = 'DELETE_CONSTRUCTOR_ITEM';
export const ADD_CONSTRUCTOR_BUN = 'ADD_CONSTRUCTOR_BUN';
export const DELETE_CONSTRUCTOR_BUN = 'DELETE_CONSTRUCTOR_BUN';
export const RESET_CONSTRUCTOR_ITEMS = 'RESET_CONSTRUCTOR_ITEMS';

export const INCREASE_ITEM_COUNTER = 'INCREASE_ITEM_COUNTER';
export const DECREASE_ITEM_COUNTER = 'DECREASE_ITEM_COUNTER';
export const RESET_BUN_COUNTER = 'RESET_BUN_COUNTER';
export const INCREASE_BUN_COUNTER = 'INCREASE_BUN_COUNTER';
export const RESET_ITEMS_COUNTERS = 'RESET_ITEMS_COUNTERS';

export const UPDATE_ORDER_NUMBER = 'UPDATE_ORDER_NUMBER';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

const API_URL = 'https://norma.nomoreparties.space/api';
const GET_INGREDIENTS_API_URL = API_URL + '/ingredients';
const GET_ORDER_API_URL = API_URL + '/orders';
const FORGOT_PASSWORD_API_URL = API_URL + '/password-reset';
const RESET_PASSWORD_API_URL = API_URL + '/password-reset/reset';
const REGISTER_API_URL = API_URL + '/auth/register';

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res.status);
}

export function getOrderNumber() {
    return function(dispatch, state) {
        dispatch({
            type: GET_ORDER_REQUEST
        });

        let orderItems = [];
        state().ingredients.constructorItems.forEach(item => orderItems.push(item._id));
        orderItems.push(state().ingredients.constructorBun._id, state().ingredients.constructorBun._id);

        const data = {
            "ingredients": orderItems
        }

        fetch(GET_ORDER_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(checkResponse)
            .then(res => {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    number: res.order.number
                });
                dispatch({
                    type: SHOW_ORDER_MODAL
                });
                dispatch({
                    type: DELETE_CONSTRUCTOR_BUN
                });
                dispatch({
                    type: RESET_CONSTRUCTOR_ITEMS
                });
                dispatch({
                    type: UPDATE_TOTAL_PRICE
                });
                dispatch({
                    type: RESET_ITEMS_COUNTERS
                });
            })
            .catch(e => {
                dispatch({
                    type: GET_ORDER_ERROR
                });
                console.error(e);
            });
    };
}

export function getIngredients() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        fetch(GET_INGREDIENTS_API_URL)
            .then(checkResponse)
            .then(res => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    items: res.data.map(item => ({
                        ...item,
                        counter: 0
                    }))
                });
            })
            .catch(e => {
                dispatch({
                    type: GET_INGREDIENTS_ERROR
                });
                console.error(e);
            });
    };
}

export function forgotPassword(email) {
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
                .then(checkResponse)
                .then(res => {
                    dispatch({
                        type: FORGOT_PASSWORD_SUCCESS
                    });
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

export function resetPassword(password, code) {
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
            .then(checkResponse)
            .then(res => {
                console.log(res);
                dispatch({
                    type: RESET_PASSWORD_SUCCESS
                });
            })
            .catch(e => {
                dispatch({
                    type: RESET_PASSWORD_ERROR
                });
                console.error(e);
            });
    };
}

export function registerUser(name, email, password) {
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
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(checkResponse)
            .then(res => {
                console.log(res);
                dispatch({
                    type: REGISTER_SUCCESS
                });
            })
            .catch(e => {
                dispatch({
                    type: REGISTER_ERROR
                });
                console.error(e);
            });
    };
}