import React, {useEffect, FC} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CLOSE_ORDER_MODAL } from '../../services/actions';
import { getUser } from '../../services/actions/auth';
import Modal from '../modal/modal';
import IngredientModal from '../ingredient-details/ingredient-modal';
import OrderDetails from '../order-details/order-details';
import ProtectedRoute from '../protected-route';
import NonAuthRoute from '../non-auth-route';
import { 
    Layout,
    LoginPage, 
    MainPage, 
    IngredientsPage, 
    ForgotPasswordPage, 
    ProfilePage, 
    ProfileLayout,
    ProfileOrdersPage,
    RegisterPage, 
    ResetPasswordPage, 
    Page404 
} from '../../pages';
import {getCookie} from '../../services/utils';
import {TStates} from "../../../declarations/library-name";
import OrderContent from "../order/order-content";

const App:FC = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const ingredientModalShow = location.state?.ingredientModalShow;

    const {orderModalShow, isAuthenticated, user} = useSelector((state:TStates) => ({
        orderModalShow: state.order.modalShow,
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }));

    const closeModal = ():void => {
        dispatch({
            type: CLOSE_ORDER_MODAL
        });
    }

    useEffect(() => {
        if(getCookie('accessToken') && (!isAuthenticated || !Boolean(user))) {
            dispatch(getUser());
        }
    }, [dispatch, isAuthenticated, user]);

    return (
            <>
                <Routes location={ingredientModalShow || location}>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<MainPage />} />
                        <Route element={<NonAuthRoute />}>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                            <Route path="/reset-password" element={<ResetPasswordPage />} />
                        </Route>
                        <Route element={<ProtectedRoute />}>
                            <Route path="/profile" element={<ProfileLayout />}>
                                <Route path="/profile" element={<ProfilePage />} />
                                <Route path="/profile/orders" element={<ProfileOrdersPage />} />
                            </Route>
                            <Route path="/order" element={<OrderContent />} />
                        </Route>
                        <Route path="/ingredients/:id" element={<IngredientsPage />} />
                        <Route path="*" element={<Page404 />} />
                    </Route>
                </Routes>

                {
                    ingredientModalShow && (
                        <Routes>
                            <Route path="/ingredients/:id" element={<IngredientModal />} />
                        </Routes>
                    )
                }

                {
                    orderModalShow && (
                        <Modal header='' closeModal={closeModal}>
                            <OrderDetails />
                        </Modal>
                    )
                }
             </>      
    )
}

export default App;