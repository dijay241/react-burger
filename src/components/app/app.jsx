import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { CLOSE_CURRENT_ITEM_MODAL, CLOSE_ORDER_MODAL } from '../../services/actions';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { 
    Layout,
    LoginPage, 
    MainPage, 
    IngredientsPage, 
    ForgotPasswordPage, 
    ProfilePage, 
    RegisterPage, 
    ResetPasswordPage, 
    Page404 
} from '../../pages';

function App() {

    const dispatch = useDispatch();

    const {orderModalShow, ingredientModalShow} = useSelector((state) => ({
        orderModalShow: state.order.modalShow,
        ingredientModalShow: state.currentIngredient.modalShow
    }));

    function closeModal() {
        dispatch({
            type: CLOSE_ORDER_MODAL
        });
        dispatch({
            type: CLOSE_CURRENT_ITEM_MODAL
        });
    }

    return (
            <>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" exact element={<MainPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/reset-password" element={<ResetPasswordPage />} />
                        <Route path="/ingredients/:id" element={<IngredientsPage />} />
                        <Route path="*" element={<Page404 />} />
                    </Route>
                </Routes>
                
                {
                    ingredientModalShow && (
                        <Modal header='Детали ингредиента' closeModal={closeModal}>
                            <IngredientDetails />
                        </Modal>
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