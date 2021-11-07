import React, {useEffect, useCallback} from 'react';
import style from './app.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import {
    CLOSE_CURRENT_ITEM_MODAL,
    CLOSE_ORDER_MODAL,
    getIngredients,
    getOrderNumber,
    SHOW_CURRENT_ITEM_MODAL
} from '../../services/actions';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingridients/burger-ingredients'; 
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

function App() {

    const dispatch = useDispatch();

    const {items, constructorItems, constructorBun, orderModalShow, ingredientModalShow} = useSelector((state) => ({
        items: state.ingredients.items,
        orderModalShow: state.order.modalShow,
        ingredientModalShow: state.currentIngredient.modalShow,
        constructorItems: state.ingredients.constructorItems,
        constructorBun: state.ingredients.constructorBun
    }));

    function closeModal() {
        dispatch({
            type: CLOSE_ORDER_MODAL
        });
        dispatch({
            type: CLOSE_CURRENT_ITEM_MODAL
        });
    }

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
        <div className={style.app}>
            <AppHeader/>
            <main className={style.main}>
                <DndProvider backend={HTML5Backend}>
                    <section className={style.column}>
                        <BurgerIngredients openModal={openIngredientModal} />
                    </section>
                    <section className={`${style.column} pt-25`}>
                        <BurgerConstructor openModal={openOrderModal} />
                    </section>
                </DndProvider>
            </main>
            {
                ingredientModalShow && (
                    <Modal header='Детали ингредиента' closeModal={closeModal}>
                        <IngredientDetails />
                    </Modal>
                )
            }
            {
                orderModalShow && (
                    <Modal header='' closeModal={closeModal}>
                        <OrderDetails />
                    </Modal>
                )
            }
            
        </div>
    )
}

export default App;