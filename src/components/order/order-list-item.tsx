import React, {FC} from 'react';
import style from './orders-list.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import {TOrdersListItem} from "../../../declarations/library-name";

const OrdersListItem:FC<TOrdersListItem> = ({id, _id, date, title, status, status_id, images, total, personal}) => {

    const location = useLocation();
    const max = 5;
    let more = false;

    return (
        <article className={`p-6 mr-2 mb-6 ${style.orderItem}`}>
            <Link
                to={personal ? `/profile/orders/${_id}` : `/feed/${_id}`}
                state={personal ? { userFeedModalShow: location } : { feedModalShow: location }}
                className={style['item-link']}
            >
                <div className={`${style.orderItemHeader} pb-6`}>
                    <div className={`${style.orderItemNumber} text text_type_digits-default`}>#{id}</div>
                    <div className={`${style.orderItemDate} text text_type_main-default text_color_inactive`}>{date}</div>
                </div>
                {
                    title && <div className={`${style.orderItemName} text text_type_main-medium pb-2`}>{title}</div>
                }
                <div className={`${style.orderItemStatus} ${style[status_id]} text text_type_main-default pb-6`}>{status}</div>
                <div className={style.orderItemFooter}>
                    <div className={style.orderItemImages}>
                        {
                            images?.map((item, index, arr) => {
                                more = arr.length >= max + 1;
                                return more && index === 0 ? (
                                    <div key={index} className={style.orderItemImage}>
                                        <span><img src={item} alt='' /></span>
                                        <span className={style.orderItemImagesMore}>+{arr.length - max + 1}</span>
                                    </div>
                                ) : (
                                    index < max ? <div key={index} className={style.orderItemImage}><span><img src={item} alt='' /></span></div> : ''
                                )
                            })
                        }
                    </div>
                    <div className={`${style.orderItemPrice} text text_type_digits-default`}>{total} <CurrencyIcon type="primary" /></div>
                </div>
            </Link>
        </article>
    )
}

export default OrdersListItem;