import {TObjectAny} from "../../declarations/library-name";
import {getCookie} from "./utils";

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

const WS_URL = 'wss://norma.nomoreparties.space';
export const ORDER_FEED_WS_URL = WS_URL + '/orders/all';
export const ORDER_USER_FEED_WS_URL = WS_URL + '/orders';

export function checkResponse<T>(res:TObjectAny):Promise<T> {
    if (res.ok) {
        return res.json() as Promise<T>;
    }
    return Promise.reject(res.status);
}

export const socketMiddleware = (wsUrl:string, wsActions:TObjectAny, personal:boolean = false) => {
    return (store:TObjectAny) =>  {
        let socket:TObjectAny | null = null;

        return (next:Function) => (action:{type:string; payload:TObjectAny;}) => {
            const { dispatch } = store;
            const { type } = action;
            const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

           if (type === wsInit) {
              if (personal) {
                  let token = getCookie('accessToken').replace('Bearer ','');
                  socket = new WebSocket(`${wsUrl}?token=${token}`);
              } else {
                  socket = new WebSocket(`${wsUrl}`);
              }
           }
            if (socket) {
                socket.onopen = (event:TObjectAny) => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = (event:TObjectAny) => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = (event:TObjectAny) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;

                    dispatch({ type: onMessage, payload: restParsedData });
                };

                socket.onclose = (event:TObjectAny) => {
                    dispatch({ type: onClose, payload: event });
                };
            }

            next(action);
        };
    };
};