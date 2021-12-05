import React, {FC} from "react";
import { Outlet } from "react-router-dom";
import style from '../components/app/app.module.css';
import AppHeader from '../components/app-header/app-header';

const Layout:FC = () => {
    return (
        <div className={style.app}>
            <AppHeader />
            <main className={style.main}>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;