import React from 'react';
import {Outlet} from 'react-router-dom';
import style from './profile.module.css';
import ProfileMenu from '../components/profile/profile-menu';

const ProfileLayout = () => {
    return (
        <section className={style.container}>
            <div className={`${style.menu}`}>
                <ProfileMenu />
            </div>
            <div className={style.content}>
                <Outlet />
            </div>
        </section>
    )
}

export default ProfileLayout;