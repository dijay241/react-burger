import React, {useState,useRef} from 'react';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, useLocation} from 'react-router-dom';
import style from './profile.module.css';

const ProfilePage = () => {
    const location = useLocation();
    const path = location.pathname;

    const formRef = useRef(null);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [dataChanged, setDataChanged] = useState(false);

    const [nameValue, setNameValue] = useState('Марк');
    const [nameDisabled, setNameDisabled] = useState(true);

    const [emailValue, setEmailValue] = useState('my@email.com');
    const [emailDisabled, setEmailDisabled] = useState(true);

    const [passwordValue, setPasswordValue] = useState('qwerty');
    const [passwordDisabled, setPasswordDisabled] = useState(true);
    const [passwordShown, setPasswordShown] = useState(false);

    const onDataChange = (value, ref) => {
        setDataChanged(true);
        switch (ref.current.name) {
            case 'name':
                setNameValue(value);
                break;
            case 'email':
                setEmailValue(value);
                break;
            case 'password':
                setPasswordValue(value);
                break;
            default:
                break;
        }
    }

    const toggleEdit = (ref) => {

        switch (ref.current.name) {
            case 'name':
                setNameDisabled(!nameDisabled);
                setEmailDisabled(true);
                setPasswordDisabled(true);
                break;
            case 'email':
                setEmailDisabled(!emailDisabled);
                setNameDisabled(true);
                setPasswordDisabled(true);
                break;
            case 'password':
                setPasswordDisabled(!passwordDisabled);
                setEmailDisabled(true);
                setNameDisabled(true);
                break;
            default:
                break;
        }

        setPasswordShown && setPasswordShown(false);
        ref.current.type === 'password' && setPasswordShown(!passwordShown);

        setTimeout(() => ref.current.focus(), 0);
    }

    const onReset = (e) => {
        e.preventDefault();
        setDataChanged(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setDataChanged(false);
    }

    return (
        <section className={style.container}>
            <div className={`${style.menu}`}>
                <ul className='text text_type_main-medium inline-list'>
                    <li><Link to='/profile' className={`${style['menu-item']} ${path === '/profile' && style['menu-item-active']}`}>Профиль</Link></li>
                    <li><Link to='/profile/orders' className={style['menu-item']}>История заказов</Link></li>
                    <li><Link to='/' className={style['menu-item']}>Выход</Link></li>
                </ul>
                <p className={`${style.note} mt-20 text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
            </div>
            <div className={`${style['form-container']} form-container`}>
                <form ref={formRef}>
                    <div className='pb-6'>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={e => onDataChange(e.target.value, nameRef)}
                            value={nameValue}
                            icon={nameDisabled && 'EditIcon'}
                            onIconClick={e => toggleEdit(nameRef)}
                            disabled={nameDisabled}
                            ref={nameRef}
                            name={'name'}
                            onBlur={e => toggleEdit(nameRef)}
                        />
                    </div>
                    <div className='pb-6'>
                        <Input
                            type={'email'}
                            placeholder={'Логин'}
                            onChange={e => onDataChange(e.target.value, emailRef)}
                            value={emailValue}
                            icon={emailDisabled && 'EditIcon'}
                            onIconClick={e => toggleEdit(emailRef)}
                            disabled={emailDisabled}
                            ref={emailRef}
                            name={'email'}
                            onBlur={e => toggleEdit(emailRef)}
                        />
                    </div>
                    <div className='pb-6'>
                        <Input
                            type={passwordShown ? 'text' : 'password'}
                            placeholder={'Пароль'}
                            onChange={e => onDataChange(e.target.value, passwordRef)}
                            value={passwordValue}
                            icon={passwordDisabled && 'EditIcon'}
                            onIconClick={e => toggleEdit(passwordRef)}
                            disabled={passwordDisabled}
                            ref={passwordRef}
                            name={'password'}
                            onBlur={e => toggleEdit(passwordRef)}
                        />
                    </div>
                    {
                        dataChanged && (
                            <div className={style.buttons}>
                                <Button type="primary" size="medium" onClick={onSubmit}>Сохранить</Button>
                                <Button type="secondary" size="medium" onClick={onReset}>Отмена</Button>
                            </div>
                        )
                    }
                </form>
            </div>
        </section>
    )
}

export default ProfilePage;