import { combineReducers } from 'redux';
import ingredientsReducer from './ingredients';
import orderReducer from './order';
import authReducer from './auth';

export const rootReducer = combineReducers({
    order: orderReducer,
    ingredients: ingredientsReducer,
    auth: authReducer
});