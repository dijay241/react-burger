import React, {FC} from 'react';
import style from './order-content.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderContentItem from './order-content-item';

const OrderContent:FC = () => {
    return (
        <section className={`${style.section} pt-20`}>
            <div className={style.container}>
                <div className={`${style.number} text text_type_digits-default mb-10`}>#034533</div>
                <div className='text text_type_main-medium mb-3'>Black Hole Singularity острый бургер</div>
                <div className={`${style.status} mb-15 text text_type_main-small`}>Выполнен</div>
                <div className='text text_type_main-medium mb-6'>Состав:</div>
                <div className={`${style.items} mb-10`}>
                    <div className='scroll-container'>
                        <div className='scroll-inner custom-scroll'>
                            <OrderContentItem 
                                key = {0}
                                _id = '4234'
                                id = {1}
                                image = 'https://code.s3.yandex.net/react/code/bun-01.png'
                                name = 'Соус традиционный галактический'
                                qty = {1}
                                price = {20}
                            />
                            <OrderContentItem 
                                key = {1}
                                _id = '4234'
                                id = {1}
                                image = 'https://code.s3.yandex.net/react/code/bun-01.png'
                                name = 'Соус традиционный галактический'
                                qty = {1}
                                price = {20}
                            />
                            <OrderContentItem 
                                key = {2}
                                _id = '4234'
                                id = {1}
                                image = 'https://code.s3.yandex.net/react/code/bun-01.png'
                                name = 'Соус традиционный галактический'
                                qty = {1}
                                price = {20}
                            />
                        </div>
                    </div>
                </div>
                <div className={`${style.footer} pb-20`}>
                    <div className='text text_type_main-small text_color_inactive'>Вчера, 13:50 i-GMT+3</div>
                    <div className='text text_type_digits-default'>510 <CurrencyIcon type="primary" /></div>
                </div>
            </div>
        </section>
    )
}

export default OrderContent;