import React from 'react';
import style from './modal-overlay.module.css'
import PropTypes from 'prop-types';

const ModalOverlay = ({closeModal}) => {
    return (
        <div className={style.overlay} onClick={closeModal} />
    )
}

ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired
}

export default ModalOverlay;