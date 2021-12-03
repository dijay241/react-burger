import React from "react";
import style from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import BurgerIngredientsItem from './burger-ingredients-item';

const BurgerIngredientsGroup = React.forwardRef( ({name, title, ingredients}, ref) => {
    return (
        <article ref={ref} id={name} className='pb-10'>
            <h2 className='pb-6 text text_type_main-medium'>{title}</h2>
            <div className={`${style.items} pl-4 pr-1`}>
                { ingredients && ingredients.map((item) => {
                        return <BurgerIngredientsItem
                            key={item._id}
                            id={item._id}
                            type={item.type}
                            image={item.image}
                            bigImage={item.image_large}
                            price={item.price}
                            name={item.name}
                            calories={item.calories}
                            carbohydrates={item.carbohydrates}
                            fat={item.fat}
                            proteins={item.proteins}
                            counter={item.counter}
                        />
                    }
                )}
            </div>
        </article>
    )
});

BurgerIngredientsGroup.propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
    name: PropTypes.string.isRequired
}

export default BurgerIngredientsGroup;