import React, {FC} from 'react';
import ReactDom from 'react-dom';
import style from './modal.module.css'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay';
import {TModal} from "../../../declarations/library-name";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

const Modal:FC<TModal> = ({ header, children, closeModal }) => {

    React.useEffect(() => {
        const handleEsc = (event:KeyboardEvent) => {
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
                <div className={`${style['modal-container']}`}>
                    <div className={`${style.modal} p-10`}>
                        <header className={style.header}>
                            <div className={`${style['header-text']} text text_type_main-large`}>{header}</div>
                            <div className={style.close} onClick={closeModal}><CloseIcon type="primary" /></div>
                        </header>
                        {children}
                    </div>
                    <ModalOverlay closeModal={closeModal} />
                </div>
            </>
        ),
        modalRoot
    )
}

export default Modal;