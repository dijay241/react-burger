import reducer from './feed';
import * as types from '../constants/feed';
import {ordersMock, userOrdersMock} from '../mocks/feed-mock';

describe('feed reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
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
        )
    });

    it('should handle PUBLIC_FEED_SUCCESS', () => {
        const startAction = {
            type: types.PUBLIC_FEED_SUCCESS
        };
        expect(reducer({}, startAction)).toEqual({
            publicFeedConnected: true
        });
    });

    it('should handle PUBLIC_FEED_ERROR', () => {
        const errorAction = {
            type: types.PUBLIC_FEED_ERROR
        };
        expect(reducer({}, errorAction)).toEqual({
            publicFeedConnected: false
        });
    });

    it('should handle PUBLIC_FEED_CLOSED', () => {
        const closeAction = {
            type: types.PUBLIC_FEED_CLOSED
        };
        expect(reducer({}, closeAction)).toEqual({
            publicFeedConnected: false
        });
    });

    it('should handle PUBLIC_FEED_GET_MESSAGE', () => {
        const successAction = {
            type: types.PUBLIC_FEED_GET_MESSAGE,
            payload: ordersMock
        };
        expect(reducer({}, successAction)).toEqual({
            publicFeedTotal: ordersMock.total,
            publicFeedTotalToday: ordersMock.totalToday,
            publicFeed: ordersMock.orders
        });
    });

    it('should handle PRIVATE_FEED_SUCCESS', () => {
        const startAction = {
            type: types.PRIVATE_FEED_SUCCESS
        };
        expect(reducer({}, startAction)).toEqual({
            userFeedConnected: true
        });
    });

    it('should handle PRIVATE_FEED_ERROR', () => {
        const errorAction = {
            type: types.PRIVATE_FEED_ERROR
        };
        expect(reducer({}, errorAction)).toEqual({
            userFeedConnected: false
        });
    });

    it('should handle PRIVATE_FEED_CLOSED', () => {
        const closeAction = {
            type: types.PRIVATE_FEED_CLOSED
        };
        expect(reducer({}, closeAction)).toEqual({
            userFeedConnected: false
        });
    });

    it('should handle PRIVATE_FEED_GET_MESSAGE', () => {
        const successAction = {
            type: types.PRIVATE_FEED_GET_MESSAGE,
            payload: {
                orders: userOrdersMock
            }
        };
        expect(reducer({}, successAction)).toEqual({
            userFeed: userOrdersMock
        });
    });

})
