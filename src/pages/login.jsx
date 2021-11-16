import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './login.module.css';

const LoginPage = () => {
    const [value, setValue] = useState('value');
    const inputRef = useRef(null);

    return (
        <section className={style.container}>
            <h1 className='text text_type_main-medium pb-6'>Вход</h1>
            <form>
                <div className='pb-6'>
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        onChange={e => setValue(e.target.value)}
                        value={value}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                        />
                </div>
                <div className='pb-6'>
                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        onChange={e => setValue(e.target.value)}
                        value={value}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
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