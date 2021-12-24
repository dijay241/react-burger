import React, {FC} from 'react';
import style from './order-content.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderContentItem from './order-content-item';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {
    TBurgerIngredientsItem,
    TFeedOrder,
    TPersonalComponent,
    TStates
} from "../../../declarations/library-name";
import {formatDate, getOrderIngredients} from "../../services/utils";

const OrderContent:FC<TPersonalComponent> = ({personal = false}) => {

    const {id} = useParams();

    const {allIngredients, orders, statuses, userOrders} = useSelector((state:TStates) => ({
        allIngredients: state.ingredients.items,
        orders: state?.feed.publicFeed,
        userOrders: state?.feed.userFeed,
        statuses: state?.feed.statuses
    }));

    const [order] = personal ? userOrders.filter((item:TFeedOrder) => item._id === id) : orders.filter((item:TFeedOrder) => item._id === id);
    const {totalPrice, ingredients} = getOrderIngredients(allIngredients, order?.ingredients);

    return (
        <section className={`${style.section}`}>
            <div className={style.container}>
                {
                    order ?
                        <>
                            <div className={`${style.number} text text_type_digits-default mb-10`}>#{order?.number}</div>
                            <div className='text text_type_main-medium mb-3'>{order?.name}</div>
                            <div className={`${style.status} mb-15 text text_type_main-default`}>{statuses[order?.status]}</div>
                            <div className='text text_type_main-medium mb-6'>Состав:</div>
                            <div className={`${style.items} mb-10`}>
                                <div className='scroll-container'>
                                    <div className='scroll-inner custom-scroll'>
                                        {
                                            ingredients?.length &&
                                                ingredients.map((item:TBurgerIngredientsItem, index:number) => {
                                                    return (
                                                        <OrderContentItem
                                                            key = {index}
                                                            image = {item.image}
                                                            name = {item.name}
                                                            qty = {item.count}
                                                            price = {item.price}
                                                        />
                                                    )
                                                })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={`${style.footer} pb-20`}>
                                <div className='text text_type_main-default text_color_inactive'>{formatDate(order?.createdAt)}</div>
                                <div className='text text_type_digits-default'>{totalPrice} <CurrencyIcon type="primary" /></div>
                            </div>
                        </>
                    : <div className={`${style.empty} mb-15`}>Заказ не найден</div>
                }
            </div>
        </section>
    )
}

export default OrderContent;