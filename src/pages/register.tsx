import React, {FC, useCallback, useState} from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from "react-router-dom";
import {registerUser} from "../services/actions/auth";
import {TSubmitCallback} from "../../declarations/library-name";
import {useAppDispatch} from "../services/hooks";

const RegisterPage:FC = () => {

    const dispatch = useAppDispatch();
    const [nameValue, setNameValue] = useState<string>('');
    const [emailValue, setEmailValue] = useState<string>('');
    const [passwordValue, setPasswordValue] = useState<string>('');

    const onSubmit = useCallback<TSubmitCallback>(
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
        <section className='form-container pt-10'>
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