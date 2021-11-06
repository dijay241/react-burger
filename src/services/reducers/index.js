import { combineReducers } from 'redux';
import ingredientsReducer from './ingredients';
import orderReducer from './order';
import currentIngredientReducer from './current-ingredient';

export const rootReducer = combineReducers({
    order: orderReducer,
    ingredients: ingredientsReducer,
    currentIngredient: currentIngredientReducer
});