import React from 'react';
import style from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingridients/burger-ingredients"; 
import BurgerConstructor from "../burger-constructor/burger-constructor"; 

function App() {
  return (
    <div className={style.app}>
        <AppHeader />
        <main className={style.main}>
            <section className={style.column}>
                <BurgerIngredients />
            </section>
            <section className={`${style.column} pt-25`}>
                <BurgerConstructor />
            </section>
        </main>
    </div>
  );
}

export default App;
