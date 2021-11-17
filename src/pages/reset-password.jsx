import React, {useState} from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
    const [codeValue, setCodeValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    return (
        <section className='form-container'>
            <h1 className='text text_type_main-medium pb-6'>Восстановление пароля</h1>
            <form>
                <div className='pb-6'>
                    <PasswordInput
                        onChange={e => setPasswordValue(e.target.value)}
                        value={passwordValue}
                        name={'password'}
                    />
                </div>
                <div className='pb-6'>
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={e => setCodeValue(e.target.value)}
                        value={codeValue}
                        name={'code'}
                    />
                </div>
                <div className='pb-20'>
                    <Button type="primary" size="medium">Сохранить</Button>
                </div>
            </form>
            <p>Вспомнили пароль? <Link to="/login">Войти</Link></p>
        </section>
    )
}

export default ResetPasswordPage;