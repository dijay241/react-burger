import React from 'react';
import style from './burger-ingredients.module.css';
import {CurrencyIcon, Tab, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {groups} from '../../utils/data';
import PropTypes from 'prop-types';

function BurgerIngredientsGroup({ id, title, ingredients, name, openModal }:any) {
    return (
        <article key={id} className='pb-10'>
            <h2 className='pb-6 text text_type_main-medium'>{title}</h2>
            <div className={`${style.items} pl-4 pr-1`}>
            { ingredients.map((item:any) =>
                {if(item.type === name) {
                    return (
                        <BurgerIngredientsItem
                            key = {item._id}
                            id = {item._id} 
                            image = {item.image}
                            bigImage = {item.image_large}
                            price = {item.price}
                            name = {item.name}
                            calories = {item.calories}
                            carbohydrates = {item.carbohydrates}
                            fat = {item.fat}
                            proteins = {item.proteins}
                            counter = {1}
                            openModal = {openModal}
                        />
                    )
                } else return '' }
            )}
            </div>
        </article> 
    )
}

BurgerIngredientsGroup.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string,
    openModal: PropTypes.func
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

function BurgerIngredientsItem({ openModal, id, image, price, counter, bigImage, name, calories, proteins, fat, carbohydrates }:any) {

    function handleOpenModal() {
        openModal({
            image: bigImage,
            name: name,
            energy: [
                {
                    name: 'Калории, ккал',
                    value: calories
                },
                {
                    name: 'Белки, г',
                    value: proteins
                },
                {
                    name: 'Жиры, г',
                    value: fat
                },
                {
                    name: 'Углеводы, г',
                    value: carbohydrates
                }
            ]
        })
    }

    return (
        <article key={id} className={style.item} onClick={handleOpenModal}>
            <p className='mb-1'><img src={image} alt='' /></p>
            <p className='mb-1 text text_type_digits-default'>
                <span className='mr-2'>{price}</span>
                <CurrencyIcon type='primary' />
            </p>
            <p>{name}</p>
            <Counter count={counter} size="default" />
        </article>
    )
}

BurgerIngredientsItem.propTypes = {
    openModal: PropTypes.func,
    id: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    counter: PropTypes.number,
    bigImage: PropTypes.string,
    name: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number
}

const BurgerIngredients = ({ ingredients, openModal }:any) => {
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
                                    ingredients = {ingredients}
                                    openModal = {openModal}
                                />
                            )
                        })
                    }
                </div>
            </section>
        </>
    )
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.object),
    openModal: PropTypes.func
}

export default BurgerIngredients;