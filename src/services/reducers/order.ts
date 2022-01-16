import {
    GET_ORDER_ERROR,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    SHOW_ORDER_MODAL,
    CLOSE_ORDER_MODAL
} from "../constants";
import {TOrderState} from "../../../declarations/library-name";
import {TMainActions} from '../actions';

const initialState:TOrderState = {
    number: null,
    request: false,
    failed: false,
    modalShow: false
}

const orderReducer = (state = initialState, action:TMainActions):TOrderState => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return {
                ...state,
                number: null,
                request: true
            }
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                number: action.number,
                failed: false,
                request: false
            }
        case GET_ORDER_ERROR:
            return {
                ...state,
                failed: true,
                request: false
            }
        case SHOW_ORDER_MODAL:
            return {
                ...state,
                modalShow: true
            }
        case CLOSE_ORDER_MODAL:
            return {
                ...state,
                modalShow: false,
                number: null
            }
        default:
            return state
    }
}

export default orderReducer;