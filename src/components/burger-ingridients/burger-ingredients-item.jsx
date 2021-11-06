import style from "./burger-ingredients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import React from "react";
import { useDrag } from 'react-dnd';

function BurgerIngredientsItem({ openModal, id, type, image, price, counter, name }) {

    function handleOpenModal() {
        openModal(id)
    }

    const [, refIngredient] = useDrag({
        type: 'ingredient',
        item: { id }
    });

    const [, refBun] = useDrag({
        type: 'bun',
        item: { id }
    });


    return (
        <article key={id} className={style.item} onClick={handleOpenModal} ref={type === 'bun' ? refBun : refIngredient}>
            <p className='mb-1'><img src={image} alt='' /></p>
            <p className='mb-1 text text_type_digits-default'>
                <span className='mr-2'>{price}</span>
                <CurrencyIcon type='primary' />
            </p>
            <p>{name}</p>
            {
                counter && <Counter count={counter} size="default" />
            }
        </article>
    )
}

BurgerIngredientsItem.propTypes = {
    openModal: PropTypes.func,
    id: PropTypes.string,
    type: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    counter: PropTypes.any,
    name: PropTypes.string
}

export default BurgerIngredientsItem