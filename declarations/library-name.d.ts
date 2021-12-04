import React, {ReactElement} from "react";

declare type TSubmitCallback = (e: React.FormEvent) => void;
declare type TCallback = (e: React.Event) => void;
declare type TObjectAny = {[string: string]: any};
declare type TRefs = TObjectAny;
declare type TStates = TObjectAny;
declare type TIngredients = TObjectAny;

declare type TBurgerIngredientsItem = {
    id: string | undefined;
    type: string;
    image: string;
    price: number;
    counter: number;
    name: string;
    _id?: string | undefined;
};

declare type TBurgerIngredientsGroup = {
    name: string;
    title: string;
    ingredients: Array<TIngredients>;
};

declare type TBurgerItem = {
    index: number;
    id: string;
    name: string;
    price: number;
    image: string;
    dragItem: (dragIndex:number,hoverIndex:number) => void;
}

declare type TEnergyItem = {
    name: string;
    value: number;
};

declare type TBurgerConstructor = {
    openModal: () => void;
}

declare type TBurgerBun = {
    type: "top" | "bottom" | undefined;
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