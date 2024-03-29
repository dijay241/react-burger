import React, {FC, useCallback, useState} from 'react';
import {Link} from 'react-router-dom';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import {logIn} from "../services/actions/auth";
import {TSubmitCallback} from "../../declarations/library-name";
import {useAppDispatch} from "../services/hooks";

const LoginPage:FC = () => {
    const dispatch = useAppDispatch();
    const [emailValue, setEmailValue] = useState<string>('');
    const [passwordValue, setPasswordValue] = useState<string>('');

    const onSubmit = useCallback<TSubmitCallback>(
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
        <section className='form-container pt-10'>
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