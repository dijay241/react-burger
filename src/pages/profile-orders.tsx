import React, {FC, useEffect} from 'react';
import OrdersList from "../components/order/orders-list";
import {PRIVATE_FEED_START} from "../services/constants/feed";
import {useDispatch, useSelector} from "react-redux";
import {TStates} from "../../declarations/library-name";

const ProfileOrdersPage:FC = () => {

    const dispatch = useDispatch();

    const {orders} = useSelector((state:TStates) => ({
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