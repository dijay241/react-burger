import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import style from './profile-menu.module.css';

const ProfileMenu = () => {

    const location = useLocation();
    const path = location.pathname;

    return (
        <>
            <ul className='text text_type_main-medium inline-list'>
                <li><Link to='/profile' className={`${style['menu-item']} ${path === '/profile' && style['menu-item-active']}`}>Профиль</Link></li>
                <li><Link to='/profile/orders' className={`${style['menu-item']} ${path === '/profile/orders' && style['menu-item-active']}`}>История заказов</Link></li>
                <li><Link to='/' className={style['menu-item']}>Выход</Link></li>
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