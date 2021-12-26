import React, {FC, useEffect} from 'react';
import OrdersList from "../components/order/orders-list";
import {PRIVATE_FEED_START} from "../services/constants/feed";
import {useAppDispatch, useAppSelector} from "../services/hooks";

const ProfileOrdersPage:FC = () => {

    const dispatch = useAppDispatch();

    const {orders} = useAppSelector(state => ({
        orders: state?.feed.userFeed.reverse()
    }));

    useEffect(
        () => {
            dispatch({ type: PRIVATE_FEED_START });
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    return (
        <OrdersList orders={orders} status={true} personal={true} />
    )
}

export default ProfileOrdersPage;