import React, {FC} from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {useSelector} from "react-redux";
import {TStates} from "../../declarations/library-name";

const NonAuthRoute:FC = () => {
    const location = useLocation();
    const path = location.state?.from.pathname ? location.state?.from.pathname : '/';

    const {isAuthenticated, user} = useSelector((state:TStates) => ({
        isAuthenticated: state?.auth.isAuthenticated,
        user: state?.auth.user
    }));

    if (isAuthenticated && Boolean(user)) {
        return <Navigate to={path} replace={true} />;
    }

    return <Outlet />;
}

export default NonAuthRoute