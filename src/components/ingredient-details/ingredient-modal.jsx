import React from 'react';
import style from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import IngredientDetails from './ingredient-details';
import Modal from '../modal/modal';
import { CLOSE_CURRENT_ITEM_MODAL } from '../../services/actions';

const IngredientModal = () => {
    const dispatch = useDispatch();

    function closeModal() {
        dispatch({
            type: CLOSE_CURRENT_ITEM_MODAL
        });
    }

    return (
        <Modal header='Детали ингредиента' closeModal={closeModal}>
            <IngredientDetails />
        </Modal>
    );
}

export default IngredientModal;