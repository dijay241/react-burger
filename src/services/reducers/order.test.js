import reducer from './order';
import * as types from '../constants';

describe('order reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                number: null,
                request: false,
                failed: false,
                modalShow: false
            }
        )
    });

    it('should handle GET_ORDER_REQUEST', () => {
        const startAction = {
            type: types.GET_ORDER_REQUEST
        };
        expect(reducer({}, startAction)).toEqual({
            number: null,
            request: true
        });
    });

    it('should handle GET_ORDER_SUCCESS', () => {
        const successAction = {
            type: types.GET_ORDER_SUCCESS,
            number: 1234
        };
        expect(reducer({}, successAction)).toEqual({
            failed: false,
            number: 1234,
            request: false
        });
    });

    it('should handle GET_ORDER_ERROR', () => {
        const failAction = {
            type: types.GET_ORDER_ERROR
        };
        expect(reducer({}, failAction)).toEqual({
            failed: true,
            request: false
        });
    });

    it('should handle SHOW_ORDER_MODAL', () => {
        const showAction = {
            type: types.SHOW_ORDER_MODAL
        };
        expect(reducer({}, showAction)).toEqual({
            modalShow: true
        });
    });

    it('should handle CLOSE_ORDER_MODAL', () => {
        const closeAction = {
            type: types.CLOSE_ORDER_MODAL
        };
        expect(reducer({}, closeAction)).toEqual({
            modalShow: false,
            number: null
        });
    });

})
