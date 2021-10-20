import React from 'react';
import PropTypes from 'prop-types';
import style from './burger-constructor.module.css';
import {CurrencyIcon, DragIcon, Button, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = ({ ingredients, openModal }:any) => {
    return (
        <>
            <section className='pb-4 ml-4 mr-4 pl-8'>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                  />
            </section>
            <section className={`${style.ingredients} scroll-container`}>
                <div className='scroll-inner custom-scroll'>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {
                        ingredients.map((item:any, id:number) => {
                            return item.type !== 'bun' && (
                                <div key = {id} className={`${style.item} ml-4 mr-1 pl-8`}>
                                    <div className={style.drag}><DragIcon type="primary" /></div>
                                    <ConstructorElement
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                    />
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            </section>
            <section className='pt-4 ml-4 mr-4 pl-8'>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
                />
            </section>
            <footer className={`${style.footer} pt-10 pb-10 mr-4 ml-4`}>
                <div className={`${style['total-price']}`}>
                    <span className='text text_type_digits-medium mr-2'>234</span>
                    <CurrencyIcon type="primary" />
                </div>
                <div>
                    <Button type="primary" size="large" onClick={openModal}>
                        Оформить заказ
                    </Button>
                </div>
            </footer>
        </>
    )
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.object),
    openModal: PropTypes.func
}

export default BurgerConstructor;