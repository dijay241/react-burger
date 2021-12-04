import React, {FC} from 'react';
import IngredientDetails from './ingredient-details';
import Modal from '../modal/modal';
import { useNavigate } from 'react-router-dom';

const IngredientModal:FC = () => {

    const navigate = useNavigate();

    const closeModal = ():void => {
        navigate(-1);
    }

    return (
        <Modal header='Детали ингредиента' closeModal={closeModal}>
            <IngredientDetails />
        </Modal>
    );
}

export default IngredientModal;