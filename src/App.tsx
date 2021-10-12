import React from 'react';
import style from './App.module.css';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingridients/burger-ingredients";

function App() {
  return (
    <div className={style.app}>
        <AppHeader />
        <main className={style.main}>
            <section className={style.column}>
                <BurgerIngredients />
            </section>
            <section className={style.column}>
                2
            </section>
        </main>
    </div>
  );
}

export default App;
