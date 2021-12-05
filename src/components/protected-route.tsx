import React, {FC} from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {useSelector} from "react-redux";
import {TStates} from "../../declarations/library-name";

const ProtectedRoute:FC = () => {
    const location = useLocation();
    const {isAuthenticated, user} = useSelector((state:TStates) => ({
        isAuthenticated: state?.auth.isAuthenticated,
        user: state?.auth.user
    }));

    if (!isAuthenticated || !Boolean(user)) {
        return <Navigate to="/login" replace={true} state={{ from: location }} />;
    }

    return <Outlet />;
}

export default ProtectedRoute