import React, {FC} from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {useAppSelector} from "../services/hooks";

const ProtectedRoute:FC = () => {
    const location = useLocation();
    const {isAuthenticated, user} = useAppSelector(state => ({
        isAuthenticated: state?.auth.isAuthenticated,
        user: state?.auth.user
    }));

    if (!isAuthenticated || !Boolean(user)) {
        return <Navigate to="/login" replace={true} state={{ from: location }} />;
    }

    return <Outlet />;
}

export default ProtectedRoute