import { combineReducers } from 'redux';
import ingredientsReducer from './ingredients';
import orderReducer from './order';
import authReducer from './auth';
import feedReducer from "./feed";

export const rootReducer = combineReducers({
    order: orderReducer,
    ingredients: ingredientsReducer,
    auth: authReducer,
    feed: feedReducer
});