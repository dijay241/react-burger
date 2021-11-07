import React from 'react';
import PropTypes from 'prop-types';
import style from './burger-constructor.module.css';
import {CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector, useDispatch} from "react-redux";
import {useDrop} from 'react-dnd';
import {
    ADD_CONSTRUCTOR_ITEM,
    INCREASE_ITEM_COUNTER,
    REORDER_CONSTRUCTOR_ITEMS,
    UPDATE_TOTAL_PRICE
} from "../../services/actions";
import BurgerBun from './burger-bun';
import BurgerItem from './burger-item';

const BurgerConstructor = ({ openModal }) => {

    const dispatch = useDispatch();

    const {items, totalPrice} = useSelector((state) => ({
        items: state.ingredients.constructorItems,
        totalPrice: state.ingredients.totalPrice
    }));

    const moveIngredient = (item) => {
        dispatch({
            type: ADD_CONSTRUCTOR_ITEM,
            id: item.id
        });
        dispatch({
            type: INCREASE_ITEM_COUNTER,
            id: item.id
        });
        dispatch({
            type: UPDATE_TOTAL_PRICE
        });
    }

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(id) {
            moveIngredient(id);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const dragIngredient = (dragIndex, hoverIndex) => {
        const draggingItem = items[dragIndex];
        const reorderedItems = [...items];
        reorderedItems.splice(dragIndex, 1);
        reorderedItems.splice(hoverIndex, 0, draggingItem);
        dispatch({
            type: REORDER_CONSTRUCTOR_ITEMS,
            items: reorderedItems
        });
    };

    return (
        <>
            <section className='pb-4 ml-4 mr-4 pl-8'>
                <BurgerBun type='top' moveIngredient={moveIngredient} />
            </section>
            <section className={`${style.ingredients} scroll-container`}>
                <div className='scroll-inner custom-scroll'>
                    <div ref={dropTarget} className={style.content}>
                    {
                        items.length ?
                            items.map((item, index) => {
                                return item.type !== 'bun' && (
                                    <BurgerItem
                                        key={index}
                                        index={index}
                                        id={item._id}
                                        name={item.name}
                                        price={item.price}
                                        image={item.image}
                                        dragItem={dragIngredient}
                                    />
                                )
                            })
                        :
                        <div className={`${style.emptyItem} ml-4 mr-1 pl-8`}>Перетащите сюда ингридиенты</div>
                    }
                    </div>
                </div>
            </section>
            <section className='pt-4 ml-4 mr-4 pl-8'>
                <BurgerBun type='bottom' moveIngredient={moveIngredient} />
            </section>
            <footer className={`${style.footer} pt-10 pb-10 mr-4 ml-4`}>
                <div className={style.totalPrice}>
                    <span className='text text_type_digits-medium mr-2'>{totalPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <div>
                    <Button type="primary" size="large" onClick={openModal} >
                        Оформить заказ
                    </Button>
                </div>
            </footer>
        </>
    )
}

BurgerConstructor.propTypes = {
    openModal: PropTypes.func.isRequired
}

export default BurgerConstructor;