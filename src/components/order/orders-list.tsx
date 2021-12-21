import React, {FC} from 'react';
import style from './orders-list.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import checkmark from '../../images/order-icon.png';
import {useSelector} from "react-redux";
import {TStates} from "../../../declarations/library-name";
import OrdersListItem from './order-list-item';

const OrdersList:FC = () => {

    return (
        <div className={`${style.orderList}`}>
            <div className='scroll-container'>
                <div className='scroll-inner custom-scroll'>
                    <OrdersListItem 
                        key = {0}
                        _id = 'das6423dasd3'
                        id = {123}
                        date = 'Сегодня, 16:20 i-GMT+3'
                        title = 'Death Star Starship Main бургер'
                        status = 'Создан'
                        status_id = 'created'
                        images = {[
                            'https://code.s3.yandex.net/react/code/bun-01.png',
                            'https://code.s3.yandex.net/react/code/bun-01.png',
                            'https://code.s3.yandex.net/react/code/bun-01.png',
                            'https://code.s3.yandex.net/react/code/bun-01.png',
                            'https://code.s3.yandex.net/react/code/bun-01.png',
                            'https://code.s3.yandex.net/react/code/bun-01.png',
                            'https://code.s3.yandex.net/react/code/bun-01.png'
                        ]}
                        total = {480}
                    />
                    <OrdersListItem 
                        key = {1}
                        _id = 'das6423dasd3'
                        id = {123}
                        date = 'Сегодня, 16:20 i-GMT+3'
                        title = 'Death Star Starship Main бургер'
                        status = 'Создан'
                        status_id = 'created'
                        images = {[
                            'https://code.s3.yandex.net/react/code/bun-01.png',
                            'https://code.s3.yandex.net/react/code/bun-01.png',
                            'https://code.s3.yandex.net/react/code/bun-01.png',
                            'https://code.s3.yandex.net/react/code/bun-01.png',
                            'https://code.s3.yandex.net/react/code/bun-01.png',
                            'https://code.s3.yandex.net/react/code/bun-01.png'
                        ]}
                        total = {480}
                    />
                    <OrdersListItem 
                        key = {2}
                        _id = 'das6423dasd3'
                        id = {123}
                        date = 'Сегодня, 16:20 i-GMT+3'
                        title = 'Death Star Starship Main бургер'
                        status = 'Создан'
                        status_id = 'created'
                        images = {[
                            'https://code.s3.yandex.net/react/code/bun-01.png',
                            'https://code.s3.yandex.net/react/code/bun-01.png',
                            'https://code.s3.yandex.net/react/code/bun-01.png',
                            'https://code.s3.yandex.net/react/code/bun-01.png',
                            'https://code.s3.yandex.net/react/code/bun-01.png'
                        ]}
                        total = {480}
                    />
                    <OrdersListItem 
                        key = {3}
                        _id = 'das6423dasd3'
                        id = {123}
                        date = 'Сегодня, 16:20 i-GMT+3'
                        title = 'Death Star Starship Main бургер'
                        status = 'Создан'
                        status_id = 'created'
                        images = {[
                            'https://code.s3.yandex.net/react/code/bun-01.png',
                            'https://code.s3.yandex.net/react/code/bun-01.png',
                            'https://code.s3.yandex.net/react/code/bun-01.png'
                        ]}
                        total = {480}
                    />
                </div>
            </div>
        </div>
    )
}

export default OrdersList;