import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {useSelector} from "react-redux";

function ProtectedRoute() {
    const location = useLocation();
    const {isAuthenticated, user} = useSelector((state) => ({
        isAuthenticated: state?.auth.isAuthenticated,
        user: state?.auth.user
    }));

    console.log(isAuthenticated);
    console.log(user);

    if (!isAuthenticated || !Boolean(user)) {
        return <Navigate to="/login" replace={true} state={{ from: location }} />;
    }

    return <Outlet />;
}

export default ProtectedRoute