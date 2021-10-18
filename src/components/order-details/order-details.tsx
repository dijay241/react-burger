import React from 'react';
import style from './order-details.module.css';
import checkmark from '../../images/order-icon.png';

const OrderDetails = () => {


    return (
        <div className={`${style.order} pt-4 pb-20`}>
            <div className={`${style.number} text text_type_digits-large mb-8`}>
                034536
            </div>
            <div className='text text_type_main-medium mb-15'>
                идентификатор заказа
            </div>
            <div className={`${style.icon} mb-15`}>
                <img src={checkmark} alt='' />
            </div>
            <div className='mb-2 text text_type_main-default'>
                Ваш заказ начали готовить
            </div>
            <div className='text text_type_main-default text_color_inactive'>
                Дождитесь готовности на орбитальной станции
            </div>
        </div>
    );
}

export default OrderDetails;