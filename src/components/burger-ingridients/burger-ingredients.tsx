import React from 'react';
import style from './burger-ingredients.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ingridients, groups} from '../../utils/data';

function BurgerIngredientsGroup(props:any) {
    return (
        <article key={props.id} className={`${style.group} pb-10`}>
            <h2 className='pb-6 text text_type_main-medium'>{props.title}</h2>
            <div className={`${style.items} pl-4 pr-2`}> 
            { ingridients.map(item =>
                {if(item.type === props.name) {
                    return (
                        <BurgerIngredientsItem 
                            id = {item._id} 
                            image = {item.image}
                            price = {item.price}
                            name = {item.name}
                            counter = {1}
                        />
                    )
                }} 
            )}
            </div>
        </article> 
    );
}

function BurgerIngredientsTab(props:any) {
    return (
        <li key={props.id} className={`${style['tabs-item']} ${props.isActive && style['tabs-item-active']} pt-4 pb-4`}>{props.title}</li>
    );
}

function BurgerIngredientsItem(props:any) {
    return (
        <article key={props.id} className={style.item}>
            <p className={`${style['item-img']} mb-1`}><img src={props.image} /></p>
            <p className={`${style['item-price']} mb-1 text text_type_digits-default`}>
                <span className='mr-2'>{props.price}</span>
                <CurrencyIcon type='primary' />
            </p>
            <p>{props.name}</p>
            <div className={`${style['item-counter']} text text_type_digits-default`}>{props.counter}</div>
        </article>
    );
}

function BurgerIngredients() {
    return (
        <>
            <header className='pt-10'>
                <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
                <nav className={style.tabs}>
                    <ul className={`${style['tabs-content']} inline-list`}>
                        {
                            groups.map((group, id) => {
                                return (
                                    <BurgerIngredientsTab 
                                        id = {id}
                                        title = {group.title}
                                        isActive = {!id ? true : false}
                                    />
                                )
                            })
                        }
                    </ul>
                </nav>
            </header>
            <section className='scroll-container'>  
                <div className='scroll-inner pt-10 pb-10'>
                    { 
                        groups.map((group, id) => {
                            return (
                                <BurgerIngredientsGroup 
                                    id = {id}
                                    title = {group.title}
                                    name = {group.name}
                                />
                            )
                        })
                    }
                </div>
            </section>
        </>
    );
}

export default BurgerIngredients;