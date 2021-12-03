import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {useSelector} from "react-redux";

function ProtectedRoute() {
    const location = useLocation();
    const {isAuthenticated, user} = useSelector((state) => ({
        isAuthenticated: state?.auth.isAuthenticated,
        user: state?.auth.user
    }));

    if (!isAuthenticated || !Boolean(user)) {
        console.log('ok');
        return <Navigate to="/login" replace={true} state={{ from: location }} />;
    }

    return <Outlet />;
}

export default ProtectedRoute