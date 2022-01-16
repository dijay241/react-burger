import React, {FC} from 'react';
import {Outlet} from 'react-router-dom';
import style from './profile.module.css';
import ProfileMenu from '../components/profile/profile-menu';

const ProfileLayout:FC = () => {
    return (
        <section className={`${style.container} pt-10`}>
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