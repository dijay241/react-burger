import React, {useState, useCallback, FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Navigate} from "react-router-dom";
import {forgotPassword} from '../services/actions/auth'
import {TStates, TSubmitCallback} from "../../declarations/library-name";

const ForgotPasswordPage:FC = () => {

    const dispatch = useDispatch();
    const [emailValue, setEmailValue] = useState<string>('');

    const {isReset} = useSelector((state:TStates) => ({
        isReset: state.auth.isReset
    }));

    const onSubmit = useCallback<TSubmitCallback>(
        (e) => {
            e.preventDefault();
            emailValue ?
                dispatch(forgotPassword(emailValue))
                :
                alert('Надо бы заполнить email');
        },
        [dispatch, emailValue]
    );

    return isReset ?
        (
            <Navigate to="/reset-password" />
        )
        :
        (
            <section className='form-container pt-10'>
                <h1 className='text text_type_main-medium pb-6'>Восстановление пароля</h1>
                <form onSubmit={onSubmit}>
                    <div className='pb-6'>
                        <Input
                            type={'email'}
                            placeholder={'Укажите e-mail'}
                            onChange={e => setEmailValue(e.target.value)}
                            value={emailValue}
                            name={'email'}
                        />
                    </div>
                    <div className='pb-20'>
                        <Button type="primary" size="medium">Восстановить</Button>
                    </div>
                </form>
                <p>Вспомнили пароль? <Link to="/login">Войти</Link></p>
            </section>
        )
}

export default ForgotPasswordPage;