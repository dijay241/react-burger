import React, {FC, useEffect} from 'react';
import style from '../components/app/app.module.css';
import {useDispatch, useSelector} from 'react-redux';
import styleFeed from './feed.module.css';
import OrdersList from '../components/order/orders-list';
import {PUBLIC_FEED_START} from "../services/constants/feed";
import {TStates, TFeedOrder} from "../../declarations/library-name";

const FeedPage:FC = () => {

    const dispatch = useDispatch();

    const {total, totalToday, orders} = useSelector((state:TStates) => ({
        total: state?.feed.publicFeedTotal,
        totalToday: state?.feed.publicFeedTotalToday,
        orders: state?.feed.publicFeed
    }));

    useEffect(
        () => {
            dispatch({ type: PUBLIC_FEED_START });
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    const ordersDone = orders.filter((item:TFeedOrder) => item.status === 'done');
    const ordersInProgress = orders.filter((item:TFeedOrder) => item.status === 'pending');
    
    return (
        <>
            <div className={`${style.title} text text_type_main-large mt-10 mb-5`}>Лента заказов</div>
            <div className={style.container}>
                <section className={style.column}>
                    <OrdersList orders={orders} />
                </section>
                <section className={`${style.column}`}>
                    <div className={`${styleFeed.queue} mb-10`}>
                        <div className={`${styleFeed.column} ${styleFeed.done}`}>
                            <div className={`text text_type_main-medium mb-6`}>Готовы:</div>
                            <div className={styleFeed.columnTwice}>
                                {
                                    ordersDone.map((item:TFeedOrder, index:number) => {
                                        return (
                                            index < 20 && <div key={index} className={`${styleFeed.item} text text_type_digits-default mb-2`}>{item.number}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={styleFeed.column}>
                            <div className={`text text_type_main-medium mb-6`}>В работе:</div>
                            <div className={styleFeed.columnTwice}>
                                {
                                    ordersInProgress.map((item:TFeedOrder, index:number) => {
                                        return (
                                            index < 20 && <div key={index} className={`${styleFeed.item} text text_type_digits-default mb-2`}>{item.number}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='mb-10'>
                        <div className='text text_type_main-medium'>Выполнено за все время:</div>
                        <div className='text text_type_digits-large text-glow'>{total}</div>
                    </div>
                    <div>
                        <div className='text text_type_main-medium'>Выполнено за сегодня:</div>
                        <div className='text text_type_digits-large text-glow'>{totalToday}</div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default FeedPage;