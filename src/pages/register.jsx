import React, {useCallback, useState} from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux";
import {registerUser} from "../services/actions/auth";

const RegisterPage = () => {

    const dispatch = useDispatch();
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            nameValue && emailValue && passwordValue ?
                dispatch(registerUser(nameValue, emailValue, passwordValue))
                :
                alert('Надо заполнить все поля');
        },
        [dispatch, passwordValue, nameValue, emailValue]
    );

    return (
        <section className='form-container'>
            <h1 className='text text_type_main-medium pb-6'>Регистрация</h1>
            <form onSubmit={onSubmit}>
                <div className='pb-6'>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => setNameValue(e.target.value)}
                        value={nameValue}
                        name={'name'}
                    />
                </div>
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
                    <Button type="primary" size="medium">Зарегистрироваться</Button>
                </div>
            </form>
            <p>Уже зарегистрированы? <Link to="/login">Войти</Link></p>
        </section>
    )
}

export default RegisterPage;