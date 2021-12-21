import React, {FC} from 'react';
import style from './order-content.module.css';
import listStyle from './orders-list.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import checkmark from '../../images/order-icon.png';
import {useSelector} from "react-redux";
import {TOrderContentItem} from "../../../declarations/library-name";

const OrderContentItem:FC<TOrderContentItem> = ({id, image, name, qty, price}) => {

    return (
        <article className={`${style.item} mb-4 mr-6`}>
            <div className={`${style.itemImage}`}>
                <div className={listStyle.orderItemImage}><span><img src={image} /></span></div>
            </div>
            <div className={`${style.itemName} text text_type_main-small ml-4 mr-4`}>{name}</div>
            <div className={`${style.itemPrice} text text_type_digits-default`}>{qty} x {price} <CurrencyIcon type="primary" /></div>
        </article>
    )
}

export default OrderContentItem;