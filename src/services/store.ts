import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import { rootReducer } from './reducers';
import {socketMiddleware, ORDER_FEED_WS_URL, ORDER_USER_FEED_WS_URL} from "./api";
import {
    wsActions,
    wsPrivateActions
} from "./actions/feed";

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(socketMiddleware(ORDER_FEED_WS_URL, wsActions)),
    applyMiddleware(socketMiddleware(ORDER_USER_FEED_WS_URL, wsPrivateActions, true)));
const store = createStore(rootReducer, enhancer);

export default store;