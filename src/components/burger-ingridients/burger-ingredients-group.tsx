import React, {PropsWithChildren} from "react";
import style from "./burger-ingredients.module.css";
import BurgerIngredientsItem from './burger-ingredients-item';
import {TBurgerIngredientsGroup, TBurgerIngredientsItem} from "../../../declarations/library-name";

const BurgerIngredientsGroup = React.forwardRef<HTMLDivElement, PropsWithChildren<TBurgerIngredientsGroup>>( ({name, title, ingredients}, ref) => {
    return (
        <article ref={ref} id={name} className='pb-10'>
            <h2 className='pb-6 text text_type_main-medium'>{title}</h2>
            <div className={`${style.items} pl-4 pr-1`}>
                { ingredients && ingredients.map((item:TBurgerIngredientsItem) => {
                        return (
                            <BurgerIngredientsItem
                                key={item._id}
                                id={item._id}
                                type={item.type}
                                image={item.image}
                                price={item.price}
                                name={item.name}
                                counter={item.counter}
                            />
                        )
                    }
                )}
            </div>
        </article>
    )
});

export default BurgerIngredientsGroup;