import React, {FC} from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader:FC = () => {
    const location = useLocation();
    const path = location.pathname;

    return (
        <header className={`${style.header} p-4`}>
            <div className={style.content}>
                <ul className={`${style.nav} ${style['nav-left']} inline-list`}>
                    <li className='mr-2'>
                        <Link to="/" className={`${style['nav-item']} pt-4 pb-4 pl-5 pr-5 ${path === '/' && style['nav-item-active']}`}>
                            <BurgerIcon type={path === '/' ? 'primary' : 'secondary'} />
                            <span className={`${style['nav-item-text']} ml-2 text`}>Конструктор</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/order-list" className={`${style['nav-item']} pt-4 pb-4 pl-5 pr-5 ${path === '/order-list' && style['nav-item-active']}`}>
                            <ListIcon type={path === '/order-list' ? 'primary' : 'secondary'} />
                            <span className={`${style['nav-item-text']} ml-2 text`}>Лента заказов</span>
                        </Link>
                    </li>
                </ul>
                <figure className={style.logo}>
                    <Logo />
                </figure>
                <ul className={`${style.nav} ${style['nav-right']} inline-list`}>
                    <li>
                        <Link to="/profile" className={`${style['nav-item']} pt-4 pb-4 pl-5 pr-5 ${(path === '/profile' || path === '/profile/orders') && style['nav-item-active']}`}>
                            <ProfileIcon type={(path === '/profile' || path === '/profile/orders') ? 'primary' : 'secondary'} />
                            <span className={`${style['nav-item-text']} ml-2 text`}>Личный кабинет</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default AppHeader;