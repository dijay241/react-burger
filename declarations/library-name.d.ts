import React, {ReactElement} from "react";
import { Moment } from 'moment'

declare type TSubmitCallback = (e: React.FormEvent) => void;
declare type TCallback = (e: React.Event) => void;
declare type TObjectAny = {[string: string]: any};
declare type TRefs = TObjectAny;

declare type TOrdersListItem = {
    _id: string | undefined;
    id: number;
    date: Moment | string;
    title: string;
    status: string | null;
    status_id: string;
    images: Array<string> | undefined;
    total: number;
    personal: boolean;
};

declare type TGetOrderIngredients = {
    totalPrice:number;
    ingredients:Array<TBurgerIngredientsItem>;
}

declare type TPersonalComponent = {
    personal?: boolean;
};

declare type TOrderContentItem = {
    image: string;
    name: string;
    qty: number | undefined;
    price: number;
};

declare type TBurgerIngredientsItem = {
    id: string | undefined;
    type: string;
    image: string;
    image_large?: string;
    image_mobile?: string;
    price: number;
    counter: number;
    name: string;
    proteins?: number;
    fat?: number;
    carbohydrates?: number;
    calories?: number
    _id?: string | undefined;
    count?: number;
};

declare type TBurgerIngredientsGroup = {
    name: string;
    title: string;
    ingredients?: Array<TBurgerIngredientsItem>;
};

declare type TBurgerItem = {
    index: number;
    id: string | undefined;
    name: string;
    price: number;
    image: string;
    dragItem: (dragIndex:number,hoverIndex:number) => void;
}

declare type TEnergyItem = {
    name: string;
    value: number | undefined;
};

declare type TBurgerConstructor = {
    openModal: () => void;
}

declare type TBurgerBun = {
    type?: "top" | "bottom";
}

declare type TModal = {
    header: string;
    children: ReactElement;
    closeModal: () => void;
};

declare type TModalOverlay = {
    closeModal: () => void;
};

declare type TMove = (item:{id:string}) => void;

declare type TIngredientsState = {
    items: Array<TBurgerIngredientsItem> | [];
    groups: Array<{name: string; title: string;}>;
    request: boolean;
    failed: boolean;
    currentTab: string;
    position: number;
    constructorItems: Array<TBurgerIngredientsItem> | [];
    constructorBun: TBurgerIngredientsItem;
    totalPrice: number;
}

declare type TOrderState = {
    number: number | null;
    request: boolean;
    failed: boolean;
    modalShow: boolean;
}

declare type TFeedOrder = {
    createdAt: string;
    ingredients: Array<string | undefined>;
    name: string;
    number: number;
    status: string;
    updatedAt: string;
    _id?: string | undefined;
}

declare type TFeedOrders = {
    orders: Array<TFeedOrder>;
    status?: boolean;
    personal?: boolean;
}

declare type TFeedState = {
    publicFeed: Array<TFeedOrder>;
    publicFeedDone: Array<string> | null;
    publicFeedInProcess: Array<string> | null;
    publicFeedTotal: number;
    publicFeedTotalToday: number;
    publicFeedConnected: boolean;
    userFeed: Array<TFeedOrder>;
    userFeedConnected: boolean;
    statuses: TObjectAny;
}

declare type TAuthState = {
    forgotRequest: boolean;
    forgotFailed: boolean;
    resetRequest: boolean;
    resetFailed: boolean;
    isReset: boolean;
    registerRequest: boolean;
    registerFailed: boolean;
    logoutRequest: boolean;
    logoutFailed: boolean;
    refreshRequest: boolean;
    refreshFailed: boolean;
    loginRequest: boolean;
    loginFailed: boolean;
    isAuthenticated: boolean;
    user: TUser | null;
}

declare type TUser = {
    email: string;
    name: string;
}