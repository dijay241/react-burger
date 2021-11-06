import {
    ADD_CONSTRUCTOR_BUN,
    DELETE_CONSTRUCTOR_BUN,
    ADD_CONSTRUCTOR_ITEM,
    DELETE_CONSTRUCTOR_ITEM,
    GET_INGREDIENTS_ERROR,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    SET_CURRENT_TAB,
    UPDATE_TOTAL_PRICE,
    REORDER_CONSTRUCTOR_ITEMS,
    INCREASE_ITEM_COUNTER,
    DECREASE_ITEM_COUNTER,
    INCREASE_BUN_COUNTER,
    RESET_BUN_COUNTER
} from "../actions";

const initialState = {
    items: [],
    groups: [
        {
            name: 'bun',
            title: 'Булки'
        },
        {
            name: 'sauce',
            title: 'Соусы'
        },
        {
            name: 'main',
            title: 'Начинки'
        }
    ],
    request: false,
    failed: false,
    currentTab: 'bun',
    position: 0,
    constructorItems: [],
    constructorBun: {},
    totalPrice: 0
}

const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {
                ...state,
                request: true
            }
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                items: action.items,
                failed: false,
                request: false
            }
        case GET_INGREDIENTS_ERROR:
            return {
                ...state,
                failed: true,
                request: false
            }
        case SET_CURRENT_TAB:
            return {
                ...state,
                currentTab: action.name
            }
        case ADD_CONSTRUCTOR_ITEM: {
            return {
                ...state,
                constructorItems: [
                    ...state.constructorItems,
                    ...state.items.filter(item => item._id === action.id)
                ]
            }
        }
        case INCREASE_ITEM_COUNTER: {
            return {
                ...state,
                items: [...state.items].map(item => ({
                    ...item,
                    counter: item._id === action.id ? item.counter + 1 : item.counter
                }))
            }
        }
        case DELETE_CONSTRUCTOR_ITEM: {
            return {
                ...state,
                constructorItems: [...state.constructorItems].filter((item, index) => index !== action.index)
            }
        }
        case DECREASE_ITEM_COUNTER: {
            return {
                ...state,
                items: [...state.items].map(item => ({
                    ...item,
                    counter: item._id === action.id && item.counter ? item.counter - 1 : item.counter
                }))
            }
        }
        case ADD_CONSTRUCTOR_BUN: {
            return {
                ...state,
                constructorBun: [...state.items].filter(item => item._id === action.id)[0]
            }
        }
        case INCREASE_BUN_COUNTER: {
            return {
                ...state,
                items: [...state.items].map(item => ({
                    ...item,
                    counter: item.type === 'bun' ? item._id === action.id ? 2 : 0 : item.counter
                }))
            }
        }
        case DELETE_CONSTRUCTOR_BUN: {
            return {
                ...state,
                constructorBun: []
            }
        }
        case RESET_BUN_COUNTER: {
            return {
                ...state,
                items: [...state.items].map(item => ({
                    ...item,
                    counter: item._id === action.id ? 0 : item.counter
                }))
            }
        }
        case UPDATE_TOTAL_PRICE: {
            return {
                ...state,
                totalPrice: state.constructorItems.reduce((sum,item) => sum + item.price, 0) + 2 * ~~state.constructorBun.price || 0
            }
        }
        case REORDER_CONSTRUCTOR_ITEMS: {
            return {
                ...state,
                constructorItems: action.items
            }
        }
        default:
            return state
    }
}

export default ingredientsReducer