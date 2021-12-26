import {GET_INGREDIENTS_API_URL, GET_ORDER_API_URL, checkResponse} from '../api';
import {getCookie} from '../utils';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_ERROR,
    SHOW_ORDER_MODAL,
    UPDATE_TOTAL_PRICE,
    DELETE_CONSTRUCTOR_BUN,
    RESET_CONSTRUCTOR_ITEMS,
    RESET_ITEMS_COUNTERS,
    SET_CURRENT_TAB,
    ADD_CONSTRUCTOR_ITEM,
    INCREASE_ITEM_COUNTER,
    DECREASE_ITEM_COUNTER,
    DELETE_CONSTRUCTOR_ITEM,
    ADD_CONSTRUCTOR_BUN,
    INCREASE_BUN_COUNTER,
    RESET_BUN_COUNTER,
    REORDER_CONSTRUCTOR_ITEMS, CLOSE_ORDER_MODAL
} from '../constants'
import {TBurgerIngredientsItem} from "../../../declarations/library-name";
import {AppDispatch, AppThunk} from "../store";

export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly items: Array<TBurgerIngredientsItem>;
}

export interface IGetIngredientsErrorAction {
    readonly type: typeof GET_INGREDIENTS_ERROR;
}

export interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly number: number;
}

export interface IGetOrderErrorAction {
    readonly type: typeof GET_ORDER_ERROR;
}

export interface IShowOrderModalAction {
    readonly type: typeof SHOW_ORDER_MODAL;
}

export interface IUpdateTotalPriceAction {
    readonly type: typeof UPDATE_TOTAL_PRICE;
}

export interface IDeleteConstructorBunAction {
    readonly type: typeof DELETE_CONSTRUCTOR_BUN;
}

export interface IResetConstructorItemsAction {
    readonly type: typeof RESET_CONSTRUCTOR_ITEMS;
}

export interface IResetItemCountersAction {
    readonly type: typeof RESET_ITEMS_COUNTERS;
}

export interface ISetCurrentTabAction {
    readonly type: typeof SET_CURRENT_TAB;
    readonly name: string;
}

export interface IAddConstructorItemAction {
    readonly type: typeof ADD_CONSTRUCTOR_ITEM;
    readonly id: string;
}

export interface IIncreaseItemCounterAction {
    readonly type: typeof INCREASE_ITEM_COUNTER;
    readonly id: string;
}

export interface IDecreaseItemCounterAction {
    readonly type: typeof DECREASE_ITEM_COUNTER;
    readonly id: string | undefined;
}

export interface IDeleteConstructorItemAction {
    readonly type: typeof DELETE_CONSTRUCTOR_ITEM;
    readonly index: number;
}

export interface IAddConstructorBunAction {
    readonly type: typeof ADD_CONSTRUCTOR_BUN;
    readonly id: string;
}

export interface IIncreaseBunCounterAction {
    readonly type: typeof INCREASE_BUN_COUNTER;
    readonly id: string;
}

export interface IResetBunCounterAction {
    readonly type: typeof RESET_BUN_COUNTER;
    readonly id: string;
}

export interface IReorderConstructorItemsAction {
    readonly type: typeof REORDER_CONSTRUCTOR_ITEMS;
    readonly items: Array<TBurgerIngredientsItem>;
}

export interface ICloseOrderModalAction {
    readonly type: typeof CLOSE_ORDER_MODAL;
}

export type TMainActions =
    | IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsErrorAction
    | IGetOrderRequestAction
    | IGetOrderSuccessAction
    | IGetOrderErrorAction
    | IShowOrderModalAction
    | IUpdateTotalPriceAction
    | IDeleteConstructorBunAction
    | IResetConstructorItemsAction
    | IResetItemCountersAction
    | ISetCurrentTabAction
    | IAddConstructorItemAction
    | IIncreaseItemCounterAction
    | IDeleteConstructorItemAction
    | IDecreaseItemCounterAction
    | IAddConstructorBunAction
    | IIncreaseBunCounterAction
    | IResetBunCounterAction
    | IReorderConstructorItemsAction
    | ICloseOrderModalAction;

export function getOrderNumber():AppThunk {
    return function(dispatch:AppDispatch, state:any) {
        dispatch({
            type: GET_ORDER_REQUEST
        });

        let orderItems = [];
        state().ingredients.constructorItems.forEach((item:TBurgerIngredientsItem) => orderItems.push(item._id));
        orderItems.push(state().ingredients.constructorBun._id, state().ingredients.constructorBun._id);

        const data = {
            "ingredients": orderItems
        }

        fetch(GET_ORDER_API_URL, {
            method: 'POST',
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
                        type: GET_ORDER_SUCCESS,
                        number: data.order.number
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
                } else {
                    dispatch({
                        type: GET_ORDER_ERROR
                    });
                    alert(data.message);
                }
            })
            .catch(e => {
                dispatch({
                    type: GET_ORDER_ERROR
                });
                console.error(e);
            });
    };
}

export function getIngredients():AppThunk {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        fetch(GET_INGREDIENTS_API_URL)
            .then(checkResponse)
            .then((res:any) => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    items: res && res.data.map((item:TBurgerIngredientsItem) => ({
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