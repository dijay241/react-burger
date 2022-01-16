import React, {FC} from 'react';
import style from './order-content.module.css';
import listStyle from './orders-list.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {TOrderContentItem} from "../../../declarations/library-name";

const OrderContentItem:FC<TOrderContentItem> = ({image, name, qty, price}) => {

    return (
        <article className={`${style.item} mb-4 mr-6`}>
            <div className={`${style.itemImage}`}>
                <div className={listStyle.orderItemImage}><span><img src={image} alt='' /></span></div>
            </div>
            <div className={`${style.itemName} text text_type_main-default ml-4 mr-4`}>{name}</div>
            <div className={`${style.itemPrice} text text_type_digits-default`}>{qty} x {price} <CurrencyIcon type="primary" /></div>
        </article>
    )
}

export default OrderContentItem;