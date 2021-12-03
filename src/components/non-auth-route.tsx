import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {useSelector} from "react-redux";

function NonAuthRoute() {
    const location = useLocation();
    const path = location.state?.from.pathname ? location.state?.from.pathname : '/';

    const {isAuthenticated, user} = useSelector((state) => ({
        isAuthenticated: state?.auth.isAuthenticated,
        user: state?.auth.user
    }));

    if (isAuthenticated && Boolean(user)) {
        return <Navigate to={path} replace={true} />;
    }

    return <Outlet />;
}

export default NonAuthRoute