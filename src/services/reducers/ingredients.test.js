import reducer from './ingredients';
import * as types from '../constants';
import { ingredientsMock, constructorMock, addedItemId, itemsWithCounter, addedBunId, bunsMock } from "../mocks/ingredients-mock";
import {REORDER_CONSTRUCTOR_ITEMS} from "../constants";

describe('ingredients reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
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
        )
    });

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        const startAction = {
            type: types.GET_INGREDIENTS_REQUEST
        };
        expect(reducer({}, startAction)).toEqual({
            request: true
        });
    });

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        const successAction = {
            type: types.GET_INGREDIENTS_SUCCESS,
            items: ingredientsMock
        };
        expect(reducer({}, successAction)).toEqual({
            items: ingredientsMock,
            failed: false,
            request: false
        });
    });

    it('should handle GET_INGREDIENTS_ERROR', () => {
        const failAction = {
            type: types.GET_INGREDIENTS_ERROR
        };
        expect(reducer({}, failAction)).toEqual({
            failed: true,
            request: false
        });
    });

    it('should handle SET_CURRENT_TAB', () => {
        const tabAction = {
            type: types.SET_CURRENT_TAB,
            name: 'buns'
        };
        expect(reducer({}, tabAction)).toEqual({
            currentTab: 'buns'
        });
    });

    it('should handle ADD_CONSTRUCTOR_ITEM', () => {
        const addItemAction = {
            type: types.ADD_CONSTRUCTOR_ITEM,
            id: addedItemId
        };
        expect(reducer({
            items: ingredientsMock,
            constructorItems: []
        }, addItemAction)).toEqual({
            items: ingredientsMock,
            constructorItems: constructorMock
        });
    });

    it('should handle INCREASE_ITEM_COUNTER', () => {
        const increaseAction = {
            type: types.INCREASE_ITEM_COUNTER,
            id: addedItemId
        };
        expect(reducer({
            items: ingredientsMock
        }, increaseAction)).toEqual({
            items: ingredientsMock.map(item => ({
                ...item,
                counter: item._id === addedItemId ? 1 : undefined
            }))
        });
    });

    it('should handle DELETE_CONSTRUCTOR_ITEM', () => {
        const deleteAction = {
            type: types.DELETE_CONSTRUCTOR_ITEM,
            index: 0
        };
        expect(reducer({
            constructorItems: constructorMock
        }, deleteAction)).toEqual({
            constructorItems: []
        });
    });

    it('should handle RESET_CONSTRUCTOR_ITEMS', () => {
        const resetAction = {
            type: types.RESET_CONSTRUCTOR_ITEMS
        };
        expect(reducer({}, resetAction)).toEqual({
            constructorItems: []
        });
    });

    it('should handle DECREASE_ITEM_COUNTER', () => {
        const decreaseAction = {
            type: types.DECREASE_ITEM_COUNTER,
            id: addedItemId
        };
        expect(reducer({
            items: itemsWithCounter
        }, decreaseAction)).toEqual({
            items: itemsWithCounter.map(item => ({
                ...item,
                counter: item._id === addedItemId && item.counter ? 0 : undefined
            }))
        });
    });

    it('should handle RESET_ITEMS_COUNTERS', () => {
        const resetCountersAction = {
            type: types.RESET_ITEMS_COUNTERS
        };
        expect(reducer({
            items: ingredientsMock
        }, resetCountersAction)).toEqual({
            items: ingredientsMock.map(item => ({
                ...item,
                counter: 0
            }))
        });
    });

    it('should handle ADD_CONSTRUCTOR_BUN', () => {
        const addBunAction = {
            type: types.ADD_CONSTRUCTOR_BUN,
            id: addedBunId
        };
        expect(reducer({
            items: ingredientsMock,
            constructorBun: {}
        }, addBunAction)).toEqual({
            items: ingredientsMock,
            constructorBun: bunsMock[0]
        });
    });

    it('should handle INCREASE_BUN_COUNTER', () => {
        const increaseAction = {
            type: types.INCREASE_BUN_COUNTER,
            id: addedBunId
        };
        expect(reducer({
            items: ingredientsMock
        }, increaseAction)).toEqual({
            items: ingredientsMock.map(item => ({
                ...item,
                counter: item.type === 'bun' ? item._id === addedBunId ? 2 : 0 : undefined
            }))
        });
    });

    it('should handle DELETE_CONSTRUCTOR_BUN', () => {
        const deleteAction = {
            type: types.DELETE_CONSTRUCTOR_BUN
        };
        expect(reducer({}, deleteAction)).toEqual({
            constructorBun: {}
        });
    });

    it('should handle RESET_BUN_COUNTER', () => {
        const resetCountersAction = {
            type: types.RESET_BUN_COUNTER,
            id: addedBunId
        };
        expect(reducer({
            items: ingredientsMock
        }, resetCountersAction)).toEqual({
            items: ingredientsMock.map(item => ({
                ...item,
                counter: item._id === addedBunId ? 0 : undefined
            }))
        });
    });

    it('should handle UPDATE_TOTAL_PRICE', () => {
        const updatePriceAction = {
            type: types.UPDATE_TOTAL_PRICE
        };
        expect(reducer({
            constructorItems: constructorMock,
            constructorBun: bunsMock[0]
        }, updatePriceAction)).toEqual({
            constructorItems: constructorMock,
            constructorBun: bunsMock[0],
            totalPrice: 3847
        });
    });

    it('should handle REORDER_CONSTRUCTOR_ITEMS', () => {
        const reorderAction = {
            type: types.REORDER_CONSTRUCTOR_ITEMS,
            items: constructorMock
        };
        expect(reducer({}, reorderAction)).toEqual({
            constructorItems: constructorMock
        });
    });

})
