import React from 'react';
import style from './ingredient-details.module.css';

const EnergyItem = ({ name, value }:any) => {

    return (
        <div className={style['energy-item']}>
            <p className='text text_type_main-default text_color_inactive mb-2'>{name}</p>
            <p className='text text_type_digits-default text_color_inactive'>{value}</p>
        </div>
    );

}

const IngredientDetails = ({ image, name, energy }:any) => {


    return (
        <>
            <div className={`${style.image} mb-4`}>
                <img src={image} alt='' />
            </div>
            <div className={`${style.name} mb-8 text text_type_main-medium`}>
                {name}
            </div>
            <div className={style.energy}> 
                {
                    energy.map( (item:any, id:number) => {
                        return (
                            <EnergyItem key={id} name={item.name} value={item.value} />
                        )
                    })
                }
            </div>
        </>
    );
}

export default IngredientDetails;