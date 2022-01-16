import React, {FC, useEffect} from 'react';
import OrderContent from '../components/order/order-content';
import {PRIVATE_FEED_START} from "../services/constants/feed";
import {useAppDispatch} from "../services/hooks";

const ProfileOrderDetailsPage:FC = () => {

    const dispatch = useAppDispatch();

    useEffect(
        () => {
            dispatch({ type: PRIVATE_FEED_START });
        },
        [] // eslint-disable-line react-hooks/exhaustive-deps
    );

    return <div className='pt-10'><OrderContent personal={true} /></div>
}

export default ProfileOrderDetailsPage;