import React, {FC} from 'react';
import style from './orders-list.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import checkmark from '../../images/order-icon.png';
import {useSelector} from "react-redux";
import {TOrdersListItem} from "../../../declarations/library-name";

const OrdersListItem:FC<TOrdersListItem> = ({id, date, title, status, status_id, images, total}) => {

    const max = 5;
    let more = false;

    return (
        <article className={`p-6 mr-2 mb-6 ${style.orderItem}`}>
            <div className={`${style.orderItemHeader} pb-6`}>
                <div className={`${style.orderItemNumber} text text_type_digits-default`}>#{id}</div>
                <div className={`${style.orderItemDate} text text_type_main-default text_color_inactive`}>{date}</div>
            </div>
            <div className={`${style.orderItemName} text text_type_main-medium pb-2`}>{title}</div>
            <div className={`${style.orderItemStatus} text text_type_main-default pb-6`}>{status}</div>
            <div className={style.orderItemFooter}>
                <div className={style.orderItemImages}>
                    {
                        images?.map((item, index, arr) => {

                            more = arr.length >= max + 1 ? true : false;

                            return more && index === 0 ? (
                                <div className={style.orderItemImage}>
                                    <span><img src={item} /></span>
                                    <span className={style.orderItemImagesMore}>+{arr.length - max + 1}</span>
                                </div> 
                            ) : (
                                index < max ? <div className={style.orderItemImage}><span><img src={item} /></span></div> : ''
                            )
                        })
                    }
                </div>
                <div className={`${style.orderItemPrice} text text_type_digits-default`}>{total} <CurrencyIcon type="primary" /></div>
            </div>
        </article>
    )
}

export default OrdersListItem;