import React, {FC} from 'react';
import style from './orders-list.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import checkmark from '../../images/order-icon.png';
import {useSelector} from "react-redux";
import {TStates} from "../../../declarations/library-name";

const OrdersList:FC = () => {

    return (
        <div className={`pt-10 ${style.orderList}`}>
            <div className='scroll-container'>
                <div className='scroll-inner custom-scroll'>
                    <article className={`p-6 mr-2 mb-6 ${style.orderItem}`}>
                        <div className={`${style.orderItemHeader} pb-6`}>
                            <div className={`${style.orderItemNumber} text text_type_digits-default`}>#034535</div>
                            <div className={`${style.orderItemDate} text text_type_main-default text_color_inactive`}>Сегодня, 16:20 i-GMT+3</div>
                        </div>
                        <div className={`${style.orderItemName} text text_type_main-medium pb-2`}>Death Star Starship Main бургер</div>
                        <div className={`${style.orderItemStatus} text text_type_main-default pb-6`}>Создан</div>
                        <div className={style.orderItemFooter}>
                            <div className={style.orderItemImages}>
                                <div className={style.orderItemImage}>
                                    <span><img src='https://code.s3.yandex.net/react/code/bun-01.png' /></span>
                                    <span className={style.orderItemImagesMore}>+3</span>
                                </div>
                                <div className={style.orderItemImage}><span><img src='https://code.s3.yandex.net/react/code/bun-01.png' /></span></div>
                                <div className={style.orderItemImage}><span><img src='https://code.s3.yandex.net/react/code/bun-01.png' /></span></div>
                                <div className={style.orderItemImage}><span><img src='https://code.s3.yandex.net/react/code/bun-01.png' /></span></div>
                                <div className={style.orderItemImage}><span><img src='https://code.s3.yandex.net/react/code/bun-01.png' /></span></div>
                            </div>
                            <div className={`${style.orderItemPrice} text text_type_digits-default`}>480 <CurrencyIcon type="primary" /></div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}

export default OrdersList;