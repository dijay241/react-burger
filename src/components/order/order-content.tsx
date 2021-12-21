import React, {FC} from 'react';
import style from './order-content.module.css';
import listStyle from './orders-list.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const OrderContent:FC = () => {
    return (
        <section className='pt-30'>
            <div className={style.container}>
                <div className={`${style.number} text text_type_digits-default mb-10`}>#034533</div>
                <div className='text text_type_main-medium mb-3'>Black Hole Singularity острый бургер</div>
                <div className={`${style.status} mb-15 text text_type_main-small`}>Выполнен</div>
                <div className='text text_type_main-medium mb-6'>Состав:</div>
                <div className='mb-10'>
                    <article className={`${style.item} mb-4`}>
                        <div className={`${style.itemImage}`}>
                            <div className={listStyle.orderItemImage}><span><img src='https://code.s3.yandex.net/react/code/bun-01.png' /></span></div>
                        </div>
                        <div className={`${style.itemName} text text_type_main-small ml-4 mr-4`}>Флюоресцентная булка R2-D3</div>
                        <div className={`${style.itemPrice} text text_type_digits-default`}>2 x 20 <CurrencyIcon type="primary" /></div>
                    </article>
                </div>
                <div className={`${style.footer} pb-30`}>
                    <div className='text text_type_main-small text_color_inactive'>Вчера, 13:50 i-GMT+3</div>
                    <div className='text text_type_digits-default'>510 <CurrencyIcon type="primary" /></div>
                </div>
            </div>
        </section>
    )
}

export default OrderContent;