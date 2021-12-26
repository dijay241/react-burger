import React, {FC} from 'react';
import style from './orders-list.module.css';
import {TFeedOrder, TFeedOrders} from "../../../declarations/library-name";
import OrdersListItem from './order-list-item';
import moment from 'moment';
import 'moment/locale/ru';
import {formatDate, getImagesArray, getOrderIngredients} from "../../services/utils";
import {useAppSelector} from "../../services/hooks";

const OrdersList:FC<TFeedOrders> = ({orders, status= false, personal = false }) => {

    moment.locale('ru');

    const {ingredients, statuses} = useAppSelector(state => ({
        ingredients: state.ingredients.items,
        statuses: state.feed.statuses
    }));


    return (
        <div className={`${style.orderList}`}>
            <div className='scroll-container'>
                <div className='scroll-inner custom-scroll'>
                    {
                        orders.map((item:TFeedOrder, index: number) => {
                            let orderIngredients = getOrderIngredients(ingredients, item.ingredients);
                            return (
                                <OrdersListItem
                                    key = {index}
                                    _id = {item._id}
                                    id = {item.number}
                                    date = {formatDate(item.createdAt)}
                                    title = {item.name}
                                    status = {status ? statuses[item.status] : null}
                                    status_id = {item.status}
                                    images = {getImagesArray(ingredients, item.ingredients)}
                                    total = {orderIngredients.totalPrice}
                                    personal = {personal}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default OrdersList;