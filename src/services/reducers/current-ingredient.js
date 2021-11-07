import {
    SHOW_CURRENT_ITEM_MODAL,
    CLOSE_CURRENT_ITEM_MODAL
} from "../actions";

const initialState = {
    id: null,
    modalShow: false
}

const currentIngredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_CURRENT_ITEM_MODAL:
            return {
                ...state,
                modalShow: true,
                id: action.id
            }
        case CLOSE_CURRENT_ITEM_MODAL:
            return {
                ...state,
                modalShow: false,
                id: null
            }
        default:
            return state
    }
}

export default currentIngredientReducer