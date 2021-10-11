import React from 'react';
import Style from './App.module.css';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingridients/burger-ingredients";

function App() {
  return (
    <div className={Style.app}>
        <AppHeader />
        <main className={Style.main}>
            <section className={Style.column}>
                <BurgerIngredients />
            </section>
            <section className={Style.column}>
                2
            </section>
        </main>
    </div>
  );
}

export default App;
