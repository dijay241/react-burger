import React, {useCallback} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import style from './profile-menu.module.css';
import {logOut} from '../../services/actions/auth';
import {useDispatch} from "react-redux";

const ProfileMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const onLogOut = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(logOut());
            navigate('/login', {replace: true, state: {from: '/login'}});
        },
        [dispatch, navigate]
    );

    return (
        <>
            <ul className='text text_type_main-medium inline-list'>
                <li><Link to='/profile' className={`${style['menu-item']} ${path === '/profile' && style['menu-item-active']}`}>Профиль</Link></li>
                <li><Link to='/profile/orders' className={`${style['menu-item']} ${path === '/profile/orders' && style['menu-item-active']}`}>История заказов</Link></li>
                <li><a href='/' className={style['menu-item']} onClick={onLogOut}>Выход</a></li>
            </ul>
            <p className={`${style.note} mt-20 text text_type_main-default text_color_inactive`}>
            {
                {
                    '/profile': <>В этом разделе вы можете изменить свои персональные данные</>,
                    '/profile/orders': <>В этом разделе вы можете просмотреть свою историю заказов</>
                }[path]
            }
            </p>
        </>
    )
}

export default ProfileMenu;