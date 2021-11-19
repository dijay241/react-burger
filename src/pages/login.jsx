import React, {useCallback, useState} from 'react';
import {Link} from 'react-router-dom';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch} from "react-redux";
import {logIn} from "../services/actions/auth";

const LoginPage = () => {
    const dispatch = useDispatch();
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            emailValue && passwordValue ?
                dispatch(logIn(emailValue, passwordValue))
                :
                alert('Надо заполнить все поля');
        },
        [dispatch, passwordValue, emailValue]
    );

    return (
        <section className='form-container'>
            <h1 className='text text_type_main-medium pb-6'>Вход</h1>
            <form onSubmit={onSubmit}>
                <div className='pb-6'>
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        onChange={e => setEmailValue(e.target.value)}
                        value={emailValue}
                        name={'email'}
                        />
                </div>
                <div className='pb-6'>
                    <PasswordInput
                        onChange={e => setPasswordValue(e.target.value)}
                        value={passwordValue}
                        name={'password'}
                        />
                </div>
                <div className='pb-20'>
                    <Button type="primary" size="medium">Войти</Button>
                </div>
            </form>
            <p>Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link></p>
            <p>Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link></p>
        </section>
    )
}

export default LoginPage;