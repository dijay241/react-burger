import React from 'react';
import {CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {useParams} from 'react-router-dom';
import IngredientDetails from '../components/ingredient-details/ingredient-details';

const IngredientsPage = () => {

    return (
        <section>
            <IngredientDetails />
        </section>
    )
}

export default IngredientsPage;