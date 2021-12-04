import React, {useState, useRef, useCallback, FC} from 'react';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './profile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {updateUser} from '../services/actions/auth';
import {TRefs, TStates, TSubmitCallback} from "../../declarations/library-name";

const ProfilePage:FC = () => {
    const dispatch = useDispatch();
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const {user} = useSelector((state:TStates) => ({
        user: state.auth.user
    }));

    const [dataChanged, setDataChanged] = useState<boolean>(false);

    const [nameValue, setNameValue] = useState<string>(user.name);
    const [nameDisabled, setNameDisabled] = useState<boolean>(true);

    const [emailValue, setEmailValue] = useState<string>(user.email);
    const [emailDisabled, setEmailDisabled] = useState<boolean>(true);

    const [passwordValue, setPasswordValue] = useState<string>('reset_me');
    const [passwordDisabled, setPasswordDisabled] = useState<boolean>(true);
    const [passwordShown, setPasswordShown] = useState<boolean>(false);

    

    const onDataChange = (value:string, ref:TRefs):void => {
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

    const toggleEdit = (ref:TRefs):void => {

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
                passwordValue === 'reset_me' && setPasswordValue('');
                passwordValue === '' && setPasswordValue('reset_me');
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

    const onReset = (e:React.FormEvent):void => {
        e.preventDefault();
        setDataChanged(false);
        setNameValue(user.name);
        setEmailValue(user.email);
        setPasswordValue('reset_me');
    }

    const onSubmit = useCallback<TSubmitCallback>(
        (e) => {
            e.preventDefault();
            setDataChanged(false);
            emailValue && nameValue ?
                dispatch(updateUser(nameValue, emailValue, passwordValue === 'reset_me' ? '' : passwordValue))
                :
                alert('Надо заполнить имя и логин');
        },
        [dispatch, emailValue, nameValue, passwordValue]
    );

    return (
        <div className={`${style['form-container']} form-container`}>
            <form onSubmit={onSubmit}>
                <div className='pb-6'>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => onDataChange(e.target.value, nameRef)}
                        value={nameValue}
                        icon={nameDisabled ? 'EditIcon' : undefined}
                        onIconClick={e => toggleEdit(nameRef)}
                        disabled={nameDisabled}
                        ref={nameRef}
                        name={'name'}
                        onBlur={() => toggleEdit(nameRef)}
                    />
                </div>
                <div className='pb-6'>
                    <Input
                        type={'email'}
                        placeholder={'Логин'}
                        onChange={e => onDataChange(e.target.value, emailRef)}
                        value={emailValue}
                        icon={emailDisabled ? 'EditIcon' : undefined}
                        onIconClick={e => toggleEdit(emailRef)}
                        disabled={emailDisabled}
                        ref={emailRef}
                        name={'email'}
                        onBlur={() => toggleEdit(emailRef)}
                    />
                </div>
                <div className='pb-6'>
                    <Input
                        type={passwordShown ? 'text' : 'password'}
                        placeholder={'Пароль'}
                        onChange={e => onDataChange(e.target.value, passwordRef)}
                        value={passwordValue}
                        icon={passwordDisabled ? 'EditIcon' : undefined}
                        onIconClick={() => toggleEdit(passwordRef)}
                        disabled={passwordDisabled}
                        ref={passwordRef}
                        name={'password'}
                        onBlur={() => toggleEdit(passwordRef)}
                    />
                </div>
                {
                    dataChanged && (
                        <div className={style.buttons}>
                            <Button type="primary" size="medium">Сохранить</Button>
                            <Button type="secondary" size="medium" onClick={onReset}>Отмена</Button>
                        </div>
                    )
                }
            </form>
        </div>
    )
}

export default ProfilePage;