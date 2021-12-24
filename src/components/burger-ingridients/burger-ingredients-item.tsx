import React, {FC} from "react";
import { useDrag } from 'react-dnd';
import style from "./burger-ingredients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation} from 'react-router-dom';
import {TBurgerIngredientsItem} from "../../../declarations/library-name";

const BurgerIngredientsItem:FC<TBurgerIngredientsItem> = ({ id, type, image, price, counter, name }) => {

    const location = useLocation();
    const [, refIngredient] = useDrag({
        type: 'ingredient',
        item: { id }
    });

    const [, refBun] = useDrag({
        type: 'bun',
        item: { id }
    });

    return (
        <article className={style.item} ref={type === 'bun' ? refBun : refIngredient}>
            <Link
                to={`/ingredients/${id}`}
                state={{ ingredientModalShow: location }}
                className={style['item-link']}
            >
                <p className='mb-1'><img src={image} alt='' /></p>
                <p className='mb-1 text text_type_digits-default'>
                    <span className='mr-2'>{price}</span>
                    <CurrencyIcon type='primary' />
                </p>
                <p>{name}</p>
                {
                    counter ? <Counter count={counter} size="default" /> : ''
                }
            </Link>
        </article>
    )
}

export default BurgerIngredientsItem