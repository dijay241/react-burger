import React, {useEffect, FC} from 'react';
import style from './ingredient-details.module.css';
import {useParams} from 'react-router-dom';
import {getIngredients} from '../../services/actions';
import {TBurgerIngredientsItem, TEnergyItem} from "../../../declarations/library-name";
import {useAppDispatch, useAppSelector} from "../../services/hooks";

const EnergyItem:FC<TEnergyItem> = ({ name, value }) => {
    return (
        <div className={style['energy-item']}>
            <p className='text text_type_main-default text_color_inactive mb-2'>{name}</p>
            <p className='text text_type_digits-default text_color_inactive'>{value}</p>
        </div>
    )
}

const IngredientDetails:FC = () => {

    const dispatch = useAppDispatch();
    const { id } = useParams();

    const {items} = useAppSelector(state => ({
        items: state.ingredients.items
    }));

    useEffect(() => {
        !items.length && dispatch(getIngredients());
    }, [dispatch, items.length]);

    const [currentItem] = items ? items.filter((item:TBurgerIngredientsItem) => item._id === id) : [];
    const energy:Array<TEnergyItem> = [
            {
                name: 'Калории, ккал',
                value: currentItem?.calories
            },
            {
                name: 'Белки, г',
                value: currentItem?.proteins
            },
            {
                name: 'Жиры, г',
                value: currentItem?.fat
            },
            {
                name: 'Углеводы, г',
                value: currentItem?.carbohydrates
            }
        ];

    return (
        <>
            <div className={`${style.image} mb-4`}>
                <img src={currentItem?.image_large} alt='' />
            </div>
            <div className={`${style.name} mb-8 text text_type_main-medium`}>
                {currentItem?.name}
            </div>
            <div className={style.energy}> 
                {
                    energy.map( (item:TEnergyItem, id:number) => {
                        return item.value && item.name ? <EnergyItem key={id} name={item.name} value={item.value} /> : ''
                    })
                }
            </div>
        </>
    )
}

export default IngredientDetails;