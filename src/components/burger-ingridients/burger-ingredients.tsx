import React from 'react';
import Style from './burger-ingredients.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredients() {
    return (
        <>
            <header className='pt-10 pb-10'>
                <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
                <nav className={Style.tabs}>
                    <ul className={`${Style['tabs-content']} inline-list`}>
                        <li className={`${Style['tabs-item']} ${Style['tabs-item-active']} pt-4 pb-4`}>Булки</li>
                        <li className={`${Style['tabs-item']} pt-4 pb-4`}>Соусы</li>
                        <li className={`${Style['tabs-item']} pt-4 pb-4`}>Начинки</li>
                    </ul>
                </nav>
            </header>
            <section>
                123
            </section>
        </>
    );
}

export default BurgerIngredients;