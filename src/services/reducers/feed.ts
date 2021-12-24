import {
    PUBLIC_FEED_SUCCESS,
    PUBLIC_FEED_ERROR,
    PUBLIC_FEED_CLOSED,
    PUBLIC_FEED_GET_MESSAGE,
    PRIVATE_FEED_SUCCESS,
    PRIVATE_FEED_ERROR,
    PRIVATE_FEED_CLOSED,
    PRIVATE_FEED_GET_MESSAGE
} from "../constants/feed";
import {TFeedState} from "../../../declarations/library-name";
import {TFeedActions} from "../actions/feed";

const initialState:TFeedState = {
    publicFeed: [],
    publicFeedDone: null,
    publicFeedInProcess: null,
    publicFeedTotal: 0,
    publicFeedTotalToday: 0,
    publicFeedConnected: false,

    userFeed: [],
    userFeedConnected: false,

    statuses: {
        done: ' Выполнен',
        pending: 'Готовится',
        created: 'Создан'
    }
}

const feedReducer = (state = initialState, action:TFeedActions):TFeedState => {
    switch (action.type) {
        case PUBLIC_FEED_SUCCESS:
            return {
                ...state,
                publicFeedConnected: true
            }
        case PUBLIC_FEED_ERROR:
            return {
                ...state,
                publicFeedConnected: false
            }
        case PUBLIC_FEED_CLOSED:
            return {
                ...state,
                publicFeedConnected: false
            }
        case PUBLIC_FEED_GET_MESSAGE:
            return {
                ...state,
                publicFeedTotal: action.payload.total,
                publicFeedTotalToday: action.payload.totalToday,
                publicFeed: action.payload.orders
            }
        case PRIVATE_FEED_SUCCESS:
            return {
                ...state,
                userFeedConnected: true
            }
        case PRIVATE_FEED_ERROR:
            return {
                ...state,
                userFeedConnected: false
            }
        case PRIVATE_FEED_CLOSED:
            return {
                ...state,
                userFeedConnected: false
            }
        case PRIVATE_FEED_GET_MESSAGE:
            return {
                ...state,
                userFeed: action.payload.orders
            }
        default:
            return state
    }
}

export default feedReducer;