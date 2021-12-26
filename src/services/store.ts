import {applyMiddleware, compose, createStore, Action, AnyAction} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import { rootReducer } from './reducers';
import {ORDER_FEED_WS_URL, ORDER_USER_FEED_WS_URL} from "./api";
import {socketMiddleware} from './middlewares/socketMiddleware';
import {
    TFeedActions,
    wsActions,
    wsPrivateActions
} from "./actions/feed";
import {TMainActions} from "./actions";
import {TAuthActions} from "./actions/auth";

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(socketMiddleware(ORDER_FEED_WS_URL, wsActions)),
    applyMiddleware(socketMiddleware(ORDER_USER_FEED_WS_URL, wsPrivateActions, true)));
const store = createStore(rootReducer, enhancer);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = <TReturnType>(action: TMainActions | TFeedActions | TAuthActions | AppThunk) => TReturnType;
declare type ThunkAction<R, S, E, A extends Action> = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;