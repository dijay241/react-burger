import React from 'react';
import Style from './app-header.module.css';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
    return (
        <header className={`${Style.header} p-4`}>
            <div className={Style.content}>
                <ul className={`${Style.nav} ${Style['nav-left']} inline-list`}>
                    <li className={`${Style['nav-item']} ${Style['nav-item-active']} pt-4 pb-4 pl-5 pr-5 mr-2`}>
                        <BurgerIcon type="primary" />
                        <span className={`${Style['nav-item-text']} ml-2 text`}>Конструктор</span>
                    </li>
                    <li className={`${Style['nav-item']} pt-4 pb-4 pl-5 pr-5`}>
                        <ListIcon type="secondary" />
                        <span className={`${Style['nav-item-text']} ml-2 text`}>Лента заказов</span>
                    </li>
                </ul>
                <figure className={Style.logo}>
                    <Logo />
                </figure>
                <ul className={`${Style.nav} ${Style['nav-right']} inline-list`}>
                    <li className={`${Style['nav-item']} pt-4 pb-4 pl-5 pr-5`}>
                        <ProfileIcon type="secondary" />
                        <span className={`${Style['nav-item-text']} ml-2 text`}>Личный кабинет</span>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default AppHeader;