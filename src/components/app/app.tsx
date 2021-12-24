import React, {useEffect, FC} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CLOSE_ORDER_MODAL } from '../../services/constants';
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
    FeedPage,
    IngredientsPage, 
    ForgotPasswordPage, 
    ProfilePage, 
    ProfileLayout,
    ProfileOrdersPage,
    RegisterPage, 
    ResetPasswordPage, 
    Page404,
    OrderDetailsPage,
    ProfileOrderDetailsPage
} from '../../pages';
import {getCookie} from '../../services/utils';
import {TStates} from "../../../declarations/library-name";
import OrderContent from "../order/order-content";
import OrderModal from "../order/order-modal";
import {getIngredients} from "../../services/actions";

const App:FC = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const ingredientModalShow = location.state?.ingredientModalShow;
    const feedModalShow =  location.state?.feedModalShow;
    const userFeedModalShow =  location.state?.userFeedModalShow;

    const {orderModalShow, isAuthenticated, user, items} = useSelector((state:TStates) => ({
        items: state.ingredients.items,
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
        !items.length && dispatch(getIngredients());
    }, [dispatch, isAuthenticated, user, items.length]);

    return (
            <>
                <Routes location={ingredientModalShow || userFeedModalShow || feedModalShow || location}>
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
                            <Route path="/profile/orders/:id" element={<ProfileOrderDetailsPage />} />
                        </Route>
                        <Route path="/feed" element={<FeedPage />} />
                        <Route path="/feed/:id" element={<OrderDetailsPage />} />
                        <Route path="/order" element={<OrderContent />} />
                        <Route path="/ingredients/:id" element={<IngredientsPage />} />
                        <Route path="*" element={<Page404 />} />
                    </Route>

                </Routes>

                {
                    feedModalShow && (
                        <Routes>
                            <Route path="/feed/:id" element={<OrderModal />} />
                        </Routes>
                    )
                }

                {
                    userFeedModalShow && (
                        <Routes>
                            <Route path="/profile/orders/:id" element={<OrderModal personal={true} />} />
                        </Routes>
                    )
                }

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