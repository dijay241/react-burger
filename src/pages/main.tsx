import React, {useCallback, FC} from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useNavigate } from "react-router-dom";
import BurgerIngredients from '../components/burger-ingridients/burger-ingredients'; 
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import style from '../components/app/app.module.css';
import {getOrderNumber} from '../services/actions';
import {useAppDispatch, useAppSelector} from "../services/hooks";

const MainPage:FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {constructorItems, constructorBun, isAuthenticated} = useAppSelector(state => ({
        constructorItems: state.ingredients.constructorItems,
        constructorBun: state.ingredients.constructorBun,
        isAuthenticated: state.auth.isAuthenticated
    }));

    const openOrderModal = useCallback(
        () => {
            if(constructorItems.length && Object.keys(constructorBun).length) {
                isAuthenticated ? dispatch(getOrderNumber()) : navigate('login');
            } else {
                alert('Бургер не получится сделать без булки и ингридиентов.');
            }
        },
        [dispatch, constructorItems.length, constructorBun, isAuthenticated, navigate]
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={style.container}>
                <section className={style.column}>
                    <BurgerIngredients />
                </section>
                <section className={`${style.column} pt-25`}>
                    <BurgerConstructor openModal={openOrderModal} />
                </section>
            </div>
        </DndProvider>
    )
}

export default MainPage;