import React, {FC, useCallback, useState} from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from "react-router-dom";
import {resetPassword} from "../services/actions/auth";
import {TSubmitCallback} from "../../declarations/library-name";
import {useAppDispatch} from "../services/hooks";

const ResetPasswordPage:FC = () => {

    const dispatch = useAppDispatch();
    const [codeValue, setCodeValue] = useState<string>('');
    const [passwordValue, setPasswordValue] = useState<string>('');

    const onSubmit = useCallback<TSubmitCallback>(
        (e) => {
            e.preventDefault();
            codeValue && passwordValue ?
                dispatch(resetPassword(passwordValue, codeValue))
                :
                alert('Надо заполнить все поля');
        },
        [dispatch, passwordValue, codeValue]
    );

    return (
        <section className='form-container pt-10'>
            <h1 className='text text_type_main-medium pb-6'>Восстановление пароля</h1>
            <form onSubmit={onSubmit}>
                <div className='mb-6'>
                    <PasswordInput
                        onChange={e => setPasswordValue(e.target.value)}
                        value={passwordValue}
                        name={'password'}
                    />
                </div>
                <div className='mb-6'>
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={e => setCodeValue(e.target.value)}
                        value={codeValue}
                        name={'code'}
                    />
                </div>
                <div className='mb-20'>
                    <Button type="primary" size="medium">Сохранить</Button>
                </div>
            </form>
            <p>Вспомнили пароль? <Link to="/login">Войти</Link></p>
        </section>
    )
}

export default ResetPasswordPage;