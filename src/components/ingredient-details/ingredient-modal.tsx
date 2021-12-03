import React from 'react';
import IngredientDetails from './ingredient-details';
import Modal from '../modal/modal';
import { useNavigate } from 'react-router-dom';

const IngredientModal = () => {

    const navigate = useNavigate();

    function closeModal() {
        navigate(-1);
    }

    return (
        <Modal header='Детали ингредиента' closeModal={closeModal}>
            <IngredientDetails />
        </Modal>
    );
}

export default IngredientModal;