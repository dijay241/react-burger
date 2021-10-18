import React from 'react';
import ReactDom from 'react-dom';
import style from './modal.module.css'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");

const Modal = ({ header, children, closeModal }) => {

    React.useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                closeModal();
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
    )
}

Modal.propTypes = {
    header: PropTypes.string,
    children: PropTypes.element,
    closeModal: PropTypes.func
}

export default Modal;