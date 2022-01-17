import reducer from './auth';
import * as types from '../constants/auth';
import {userMock} from '../mocks/auth-mock';
import {
    FORGOT_PASSWORD_ERROR,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS, GET_USER_SUCCESS, LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS,
    REGISTER_ERROR,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    RESET_PASSWORD_ERROR,
    RESET_PASSWORD_FLUSH,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS, UPDATE_USER_SUCCESS
} from "../constants/auth";

describe('auth reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                forgotRequest: false,
                forgotFailed: false,
                resetRequest: false,
                resetFailed: false,
                isReset: false,
                registerRequest: false,
                registerFailed: false,
                logoutRequest: false,
                logoutFailed: false,
                refreshRequest: false,
                refreshFailed: false,
                loginRequest: false,
                loginFailed: false,
                isAuthenticated: false,
                user: null
            }
        )
    });

    it('should handle FORGOT_PASSWORD_REQUEST', () => {
        const startAction = {
            type: types.FORGOT_PASSWORD_REQUEST
        };
        expect(reducer({}, startAction)).toEqual({
            forgotRequest: true
        });
    });

    it('should handle FORGOT_PASSWORD_SUCCESS', () => {
        const successAction = {
            type: types.FORGOT_PASSWORD_SUCCESS
        };
        expect(reducer({}, successAction)).toEqual({
            forgotFailed: false,
            forgotRequest: false,
            isReset: true
        });
    });

    it('should handle FORGOT_PASSWORD_ERROR', () => {
        const failAction = {
            type: types.FORGOT_PASSWORD_ERROR
        };
        expect(reducer({}, failAction)).toEqual({
            forgotFailed: true,
            forgotRequest: false,
            isReset: false
        });
    });

    it('should handle RESET_PASSWORD_REQUEST', () => {
        const startAction = {
            type: types.RESET_PASSWORD_REQUEST
        };
        expect(reducer({}, startAction)).toEqual({
            resetRequest: true
        });
    });

    it('should handle RESET_PASSWORD_FLUSH', () => {
        const flushAction = {
            type: types.RESET_PASSWORD_FLUSH
        };
        expect(reducer({}, flushAction)).toEqual({
            resetRequest: false,
            resetFailed: false
        });
    });

    it('should handle RESET_PASSWORD_SUCCESS', () => {
        const successAction = {
            type: types.RESET_PASSWORD_SUCCESS
        };
        expect(reducer({}, successAction)).toEqual({
            resetFailed: false,
            resetRequest: false
        });
    });

    it('should handle RESET_PASSWORD_ERROR', () => {
        const failAction = {
            type: types.RESET_PASSWORD_ERROR
        };
        expect(reducer({}, failAction)).toEqual({
            resetFailed: true,
            resetRequest: false
        });
    });

    it('should handle REGISTER_REQUEST', () => {
        const startAction = {
            type: types.REGISTER_REQUEST
        };
        expect(reducer({}, startAction)).toEqual({
            registerRequest: true
        });
    });

    it('should handle REGISTER_SUCCESS', () => {
        const successAction = {
            type: types.REGISTER_SUCCESS,
            user: userMock
        };
        expect(reducer({}, successAction)).toEqual({
            registerFailed: false,
            registerRequest: false,
            isAuthenticated: true,
            user: userMock
        });
    });

    it('should handle REGISTER_ERROR', () => {
        const failAction = {
            type: types.REGISTER_ERROR
        };
        expect(reducer({}, failAction)).toEqual({
            registerFailed: true,
            registerRequest: false
        });
    });

    it('should handle LOGIN_REQUEST', () => {
        const startAction = {
            type: types.LOGIN_REQUEST
        };
        expect(reducer({}, startAction)).toEqual({
            loginRequest: true
        });
    });

    it('should handle LOGIN_SUCCESS', () => {
        const successAction = {
            type: types.LOGIN_SUCCESS,
            user: userMock
        };
        expect(reducer({}, successAction)).toEqual({
            loginFailed: false,
            loginRequest: false,
            isAuthenticated: true,
            user: userMock
        });
    });

    it('should handle LOGIN_ERROR', () => {
        const failAction = {
            type: types.LOGIN_ERROR
        };
        expect(reducer({}, failAction)).toEqual({
            loginFailed: true,
            loginRequest: false
        });
    });

    it('should handle LOGOUT_SUCCESS', () => {
        const successAction = {
            type: types.LOGOUT_SUCCESS
        };
        expect(reducer({}, successAction)).toEqual({
            isAuthenticated: false,
            user: null
        });
    });

    it('should handle GET_USER_SUCCESS', () => {
        const successAction = {
            type: types.GET_USER_SUCCESS,
            user: userMock
        };
        expect(reducer({}, successAction)).toEqual({
            isAuthenticated: true,
            user: userMock
        });
    });

    it('should handle UPDATE_USER_SUCCESS', () => {
        const successAction = {
            type: types.UPDATE_USER_SUCCESS,
            user: userMock
        };
        expect(reducer({}, successAction)).toEqual({
            user: userMock
        });
    });

})
