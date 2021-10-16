import React from 'react';
import style from './burger-ingredients.module.css';
import {CurrencyIcon, Tab, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {ingridients, groups} from '../../utils/data';

function BurgerIngredientsGroup(props:any) {
    return (
        <article key={props.id} className='pb-10'>
            <h2 className='pb-6 text text_type_main-medium'>{props.title}</h2>
            <div className={`${style.items} pl-4 pr-1`}>
            { ingridients.map(item =>
                {if(item.type === props.name) {
                    return (
                        <BurgerIngredientsItem
                            key = {item._id}
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

function BurgerIngredientsTabs() {
    const [current, setCurrent] = React.useState('one')
    return (
        <div style={{ display: 'flex' }}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    )
}

function BurgerIngredientsItem(props:any) {
    return (
        <article key={props.id} className={style.item}>
            <p className='mb-1'><img src={props.image} /></p>
            <p className='mb-1 text text_type_digits-default'>
                <span className='mr-2'>{props.price}</span>
                <CurrencyIcon type='primary' />
            </p>
            <p>{props.name}</p>
            <Counter count={props.counter} size="default" />
        </article>
    );
}

function BurgerIngredients() {
    return (
        <>
            <header className='pt-10'>
                <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
                <BurgerIngredientsTabs />
            </header>
            <section className='scroll-container'>  
                <div className='scroll-inner custom-scroll pt-10 pb-10'>
                    { 
                        groups.map((group, id) => {
                            return (
                                <BurgerIngredientsGroup
                                    key = {id}
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