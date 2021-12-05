import {TObjectAny} from "../../declarations/library-name";

const API_URL = 'https://norma.nomoreparties.space/api';

export const GET_INGREDIENTS_API_URL = API_URL + '/ingredients';
export const GET_ORDER_API_URL = API_URL + '/orders';

export const FORGOT_PASSWORD_API_URL = API_URL + '/password-reset';
export const RESET_PASSWORD_API_URL = API_URL + '/password-reset/reset';
export const REGISTER_API_URL = API_URL + '/auth/register';
export const LOGIN_API_URL = API_URL + '/auth/login';
export const LOGOUT_API_URL = API_URL + '/auth/logout';
export const REFRESH_API_URL = API_URL + '/auth/token';
export const USER_API_URL = API_URL + '/auth/user';

export function checkResponse<T>(res:TObjectAny):Promise<T> {
    if (res.ok) {
        return res.json() as Promise<T>;
    }
    return Promise.reject(res.status);
}
