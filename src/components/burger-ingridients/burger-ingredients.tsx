import React from 'react';
import style from './burger-ingredients.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ingridients, groups} from '../../utils/data';

function BurgerIngredients() {
    return (
        <>
            <header className='pt-10'>
                <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
                <nav className={style.tabs}>
                    <ul className={`${style['tabs-content']} inline-list`}>
                        <li className={`${style['tabs-item']} ${style['tabs-item-active']} pt-4 pb-4`}>Булки</li>
                        <li className={`${style['tabs-item']} pt-4 pb-4`}>Соусы</li>
                        <li className={`${style['tabs-item']} pt-4 pb-4`}>Начинки</li>
                    </ul>
                </nav>
            </header>
            <section className='scroll-container'>  
                <div className='scroll-inner pt-10 pb-10'>
                    <article className={style.group}>
                        <h2>Булки</h2>
                        <article>
                            {mock.map((item) => {

                                return item.type === 'bun' ? 
                                    <div key={item._id}>{item.name}</div>

                                return {if (item.type === 'bun')} 
                            })}
                        </article>
                    </article>
                </div>
            </section>
        </>
    );
}

export default BurgerIngredients;