import React, {useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import BurgerIngredients from '../components/burger-ingridients/burger-ingredients'; 
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import style from '../components/app/app.module.css';
import {
    getIngredients,
    getOrderNumber,
    SHOW_CURRENT_ITEM_MODAL
} from '../services/actions';

const MainPage = () => {

    const dispatch = useDispatch();

    const {items, constructorItems, constructorBun} = useSelector((state) => ({
        items: state.ingredients.items,
        constructorItems: state.ingredients.constructorItems,
        constructorBun: state.ingredients.constructorBun
    }));

    function openIngredientModal(id) {
        dispatch({
            type: SHOW_CURRENT_ITEM_MODAL,
            id
        });
    }

    const openOrderModal = useCallback(
        () => {
            constructorItems.length && Object.keys(constructorBun).length ?
                dispatch(getOrderNumber())
                :
                alert('Бургер не получится сделать без булки и ингридиентов.');
        },
        [dispatch, constructorItems, constructorBun]
    );

    useEffect(() => {
        !items.length && dispatch(getIngredients());
    }, [dispatch, items.length]);

    return (
        <DndProvider backend={HTML5Backend}>
            <section className={style.column}>
                <BurgerIngredients openModal={openIngredientModal} />
            </section>
            <section className={`${style.column} pt-25`}>
                <BurgerConstructor openModal={openOrderModal} />
            </section>
        </DndProvider>
    )
}

export default MainPage;