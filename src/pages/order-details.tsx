import React, {FC, useEffect} from 'react';
import OrderContent from '../components/order/order-content';
import {PUBLIC_FEED_START} from "../services/constants/feed";
import {useAppDispatch} from "../services/hooks";

const OrderDetailsPage:FC = () => {

    const dispatch = useAppDispatch();

    useEffect(
        () => {
            dispatch({ type: PUBLIC_FEED_START });
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    return <div className='pt-10'><OrderContent /></div>
}

export default OrderDetailsPage;