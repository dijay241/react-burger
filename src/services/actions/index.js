export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_FAILED';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_FAILED';
export const SHOW_ORDER_MODAL = 'SHOW_ORDER_MODAL';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';
export const UPDATE_TOTAL_PRICE = 'UPDATE_TOTAL_PRICE';

export const SHOW_CURRENT_ITEM_MODAL = 'SHOW_CURRENT_ITEM_MODAL';
export const CLOSE_CURRENT_ITEM_MODAL = 'CLOSE_CURRENT_ITEM_MODAL';

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

const API_URL = 'https://norma.nomoreparties.space/api';
const GET_INGREDIENTS_API_URL = API_URL + '/ingredients';
const GET_ORDER_API_URL = API_URL + '/orders';


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