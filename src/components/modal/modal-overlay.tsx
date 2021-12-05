import React, {FC} from 'react';
import style from './modal-overlay.module.css'
import {TModalOverlay} from "../../../declarations/library-name";

const ModalOverlay:FC<TModalOverlay> = ({closeModal}) => {
    return (
        <div className={style.overlay} onClick={closeModal} />
    )
}

export default ModalOverlay;