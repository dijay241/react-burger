import React, {FC, useEffect} from 'react';
import OrderContent from '../components/order/order-content';
import {useDispatch} from 'react-redux';
import {PUBLIC_FEED_START} from "../services/constants/feed";

const OrderDetailsPage:FC = () => {

    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch({ type: PUBLIC_FEED_START });
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    return <div className='pt-10'><OrderContent /></div>
}

export default OrderDetailsPage;