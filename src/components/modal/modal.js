import React from 'react';
import ReactDom from 'react-dom';
import style from './modal.module.css'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay';

const modalRoot = document.getElementById("react-modals");

const Modal = ({ header, children, closeModal }) => { 
    return ReactDom.createPortal(
        (
            <>
                <div className={`${style.modal} p-10`}>
                    <header className={style.header}>
                        <div className={`${style['header-text']} text text_type_main-large`}>{header}</div>
                        <div className={style.close} onClick={closeModal}><CloseIcon /></div>
                    </header>
                    {children}
                </div>
                <ModalOverlay closeModal={closeModal} />
            </>
        ),
        modalRoot
    );
};

export default Modal;