import React, {useState, useCallback, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from "react-router-dom";
import {forgotPassword} from '../services/actions'

const ForgotPasswordPage = () => {

    const dispatch = useDispatch();
    const emailRef = useRef(null);

    const [emailValue, setEmailValue] = useState('');

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(forgotPassword('www@www.com'));
        },
        [dispatch]
    );

    return (
        <section className='form-container'>
            <h1 className='text text_type_main-medium pb-6'>Восстановление пароля</h1>
            <form>
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
                    <Button type="primary" size="medium" onClick={onSubmit}>Восстановить</Button>
                </div>
            </form>
            <p>Вспомнили пароль? <Link to="/login">Войти</Link></p>
        </section>
    )
}

export default ForgotPasswordPage;