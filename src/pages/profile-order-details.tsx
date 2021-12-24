import React, {FC, useEffect} from 'react';
import OrderContent from '../components/order/order-content';
import {useDispatch} from 'react-redux';
import {PRIVATE_FEED_START} from "../services/constants/feed";

const ProfileOrderDetailsPage:FC = () => {

    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch({ type: PRIVATE_FEED_START });
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    return <div className='pt-10'><OrderContent personal={true} /></div>
}

export default ProfileOrderDetailsPage;