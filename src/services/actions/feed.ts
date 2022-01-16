import {
    PUBLIC_FEED_START,
    PUBLIC_FEED_SUCCESS,
    PUBLIC_FEED_ERROR,
    PUBLIC_FEED_CLOSED,
    PUBLIC_FEED_GET_MESSAGE,
    PUBLIC_FEED_SEND_MESSAGE,
    PRIVATE_FEED_START,
    PRIVATE_FEED_SUCCESS,
    PRIVATE_FEED_ERROR,
    PRIVATE_FEED_CLOSED,
    PRIVATE_FEED_GET_MESSAGE,
    PRIVATE_FEED_SEND_MESSAGE
} from '../constants/feed';

export interface IPublicFeedStartAction {
    readonly type: typeof PUBLIC_FEED_START;
}

export interface IPublicFeedSuccessAction {
    readonly type: typeof PUBLIC_FEED_SUCCESS;
}

export interface IPublicFeedErrorAction {
    readonly type: typeof PUBLIC_FEED_ERROR;
}

export interface IPublicFeedClosedAction {
    readonly type: typeof PUBLIC_FEED_CLOSED;
}

export interface IPublicFeedGetMessageAction {
    readonly type: typeof PUBLIC_FEED_GET_MESSAGE;
    readonly payload: any;
}

export interface IPublicFeedSendMessageAction {
    readonly type: typeof PUBLIC_FEED_SEND_MESSAGE;
    readonly payload: any;
}

export interface IPrivateFeedStartAction {
    readonly type: typeof PRIVATE_FEED_START;
}

export interface IPrivateFeedSuccessAction {
    readonly type: typeof PRIVATE_FEED_SUCCESS;
}

export interface IPrivateFeedErrorAction {
    readonly type: typeof PRIVATE_FEED_ERROR;
}

export interface IPrivateFeedClosedAction {
    readonly type: typeof PRIVATE_FEED_CLOSED;
}

export interface IPrivateFeedGetMessageAction {
    readonly type: typeof PRIVATE_FEED_GET_MESSAGE;
    readonly payload: any;
}

export interface IPrivateFeedSendMessageAction {
    readonly type: typeof PRIVATE_FEED_SEND_MESSAGE;
    readonly payload: any;
}

export type TFeedActions =
    | IPublicFeedStartAction
    | IPublicFeedSuccessAction
    | IPublicFeedErrorAction
    | IPublicFeedClosedAction
    | IPublicFeedGetMessageAction
    | IPublicFeedSendMessageAction
    | IPrivateFeedStartAction
    | IPrivateFeedSuccessAction
    | IPrivateFeedErrorAction
    | IPrivateFeedClosedAction
    | IPrivateFeedGetMessageAction
    | IPrivateFeedSendMessageAction;

export const wsActions = {
    wsInit: PUBLIC_FEED_START,
    wsSendMessage: PUBLIC_FEED_SEND_MESSAGE,
    onOpen: PUBLIC_FEED_SUCCESS,
    onClose: PUBLIC_FEED_CLOSED,
    onError: PUBLIC_FEED_ERROR,
    onMessage: PUBLIC_FEED_GET_MESSAGE
};

export const wsPrivateActions = {
    wsInit: PRIVATE_FEED_START,
    wsSendMessage: PRIVATE_FEED_SEND_MESSAGE,
    onOpen: PRIVATE_FEED_SUCCESS,
    onClose: PRIVATE_FEED_CLOSED,
    onError: PRIVATE_FEED_ERROR,
    onMessage: PRIVATE_FEED_GET_MESSAGE
};