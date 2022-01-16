import React, {FC} from 'react';
import OrderContent from './order-content';
import Modal from '../modal/modal';
import { useNavigate } from 'react-router-dom';
import {TPersonalComponent} from "../../../declarations/library-name";

const OrderModal:FC<TPersonalComponent> = ({personal = false}) => {

    const navigate = useNavigate();

    const closeModal = ():void => {
        navigate(-1);
    }

    return (
        <Modal header='' closeModal={closeModal}>
            <OrderContent personal={personal} />
        </Modal>
    );
}

export default OrderModal;