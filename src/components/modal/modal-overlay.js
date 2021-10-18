import React from 'react';
import style from './modal-overlay.module.css'

const ModalOverlay = ({closeModal}) => {
    return (
        <div className={style.overlay} onClick={closeModal}></div>
    );
}

export default ModalOverlay;