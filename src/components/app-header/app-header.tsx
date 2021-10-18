import React from 'react';
import style from './app-header.module.css';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
    return (
        <header className={`${style.header} p-4`}>
            <div className={style.content}>
                <ul className={`${style.nav} ${style['nav-left']} inline-list`}>
                    <li className={`${style['nav-item']} ${style['nav-item-active']} pt-4 pb-4 pl-5 pr-5 mr-2`}>
                        <BurgerIcon type="primary" />
                        <span className={`${style['nav-item-text']} ml-2 text`}>Конструктор</span>
                    </li>
                    <li className={`${style['nav-item']} pt-4 pb-4 pl-5 pr-5`}>
                        <ListIcon type="secondary" />
                        <span className={`${style['nav-item-text']} ml-2 text`}>Лента заказов</span>
                    </li>
                </ul>
                <figure className={style.logo}>
                    <Logo />
                </figure>
                <ul className={`${style.nav} ${style['nav-right']} inline-list`}>
                    <li className={`${style['nav-item']} pt-4 pb-4 pl-5 pr-5`}>
                        <ProfileIcon type="secondary" />
                        <span className={`${style['nav-item-text']} ml-2 text`}>Личный кабинет</span>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default AppHeader;