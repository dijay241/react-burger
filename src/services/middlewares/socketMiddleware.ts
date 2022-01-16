import {TObjectAny} from "../../../declarations/library-name";
import {getCookie} from "../utils";
import { MiddlewareAPI } from 'redux';
import {AppDispatch, RootState} from "../store";

export const socketMiddleware = (wsUrl:string, wsActions:TObjectAny, personal:boolean = false):any => {
    return (store:MiddlewareAPI<AppDispatch, RootState>) =>  {
        let socket:TObjectAny | null = null;

        return (next:Function) => (action:{type:string; payload:TObjectAny;}) => {
            const { dispatch } = store;
            const { type } = action;
            const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

            if (type === wsInit) {
                if (personal) {
                    const token = getCookie('accessToken').replace('Bearer ','');
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