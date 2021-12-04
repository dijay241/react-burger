import React, {FC} from 'react';
import IngredientDetails from '../components/ingredient-details/ingredient-details';

const IngredientsPage:FC = () => {
    return (
        <section className='align-self-center'>
            <IngredientDetails />
        </section>
    )
}

export default IngredientsPage;