import React from 'react';
import style from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import {useSelector} from "react-redux";

const EnergyItem = ({ name, value }) => {
    return (
        <div className={style['energy-item']}>
            <p className='text text_type_main-default text_color_inactive mb-2'>{name}</p>
            <p className='text text_type_digits-default text_color_inactive'>{value}</p>
        </div>
    )
}

EnergyItem.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
}

const IngredientDetails = () => {

    const {id} = useSelector((state) => ({
        id: state.currentIngredient.id
    }));

    const {items} = useSelector((state) => ({
        items: state.ingredients.items
    }));

    const [currentItem] = items ? items.filter((item) => item._id === id) : null;
    const energy = [
            {
                name: 'Калории, ккал',
                value: currentItem.calories
            },
            {
                name: 'Белки, г',
                value: currentItem.proteins
            },
            {
                name: 'Жиры, г',
                value: currentItem.fat
            },
            {
                name: 'Углеводы, г',
                value: currentItem.carbohydrates
            }
        ];

    return (
        <>
            <div className={`${style.image} mb-4`}>
                <img src={currentItem.image_large} alt='' />
            </div>
            <div className={`${style.name} mb-8 text text_type_main-medium`}>
                {currentItem.name}
            </div>
            <div className={style.energy}> 
                {
                    energy.map( (item, id) => {
                        return (
                            <EnergyItem key={id} name={item.name} value={item.value} />
                        )
                    })
                }
            </div>
        </>
    )
}

export default IngredientDetails;