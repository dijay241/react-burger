import React, {FC} from 'react';
import style from '../components/app/app.module.css';
import styleFeed from './feed.module.css';
import OrdersList from '../components/order/orders-list';

const FeedPage:FC = () => {
    return (
        <>
            <div className={`${style.title} text text_type_main-large mt-10 mb-5`}>Лента заказов</div>
            <div className={style.container}>
                <section className={style.column}>
                    <OrdersList />
                </section>
                <section className={`${style.column}`}>
                    <div className={`${styleFeed.queue} mb-10`}>
                        <div className={`${styleFeed.column} ${styleFeed.done}`}>
                            <div className={`text text_type_main-medium mb-6`}>Готовы:</div>
                            <div className={`${styleFeed.item} text text_type_digits-default mb-2`}>034533</div>
                            <div className={`${styleFeed.item} text text_type_digits-default mb-2`}>034533</div>
                            <div className={`${styleFeed.item} text text_type_digits-default mb-2`}>034533</div>
                            <div className={`${styleFeed.item} text text_type_digits-default mb-2`}>034533</div>
                        </div>
                        <div className={styleFeed.column}>
                            <div className={`text text_type_main-medium mb-6`}>В работе:</div>
                            <div className={`${styleFeed.item} text text_type_digits-default mb-2`}>034533</div>
                            <div className={`${styleFeed.item} text text_type_digits-default mb-2`}>034533</div>
                            <div className={`${styleFeed.item} text text_type_digits-default mb-2`}>034533</div>
                        </div>
                    </div>
                    <div className='mb-10'>
                        <div className='text text_type_main-medium'>Выполнено за все время:</div>
                        <div className='text text_type_digits-large text-glow'>28 752</div>
                    </div>
                    <div>
                        <div className='text text_type_main-medium'>Выполнено за сегодня:</div>
                        <div className='text text_type_digits-large text-glow'>138</div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default FeedPage;