import React from 'react';
import style from './burger-constructor.module.css';
import {CurrencyIcon, DragIcon, LockIcon, DeleteIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ingridients, groups} from '../../utils/data';

function BurgerConstructorItem(props:any) {
    return (
        <article key={props.id} className={`ml-4 ${props.isBun ? 'mr-4' : 'mr-2'} ${style.item} ${props.isTop && style['top-item']} ${props.isBottom && style['bottom-item']}`}>
            {
                props.isDrag && <div className={style.drag}><DragIcon type="primary" /></div>
            }
            <div className={`${style['item-content']} ml-8 pt-4 pb-4 pl-6 pr-8`}>
                <div className={style['item-image']}><img src={props.image} /></div>
                <div className={style['item-name']}>{props.name}</div>
                <div className={`${style['item-price']} text text_type_digits-default`}><span className='mr-2'>{props.price}</span><CurrencyIcon type="primary" /></div>
                <div className={style['item-icon']}>
                    {
                        props.isBun ? <LockIcon type="secondary" /> : <a href='#' className={style['item-icon-remove']}><DeleteIcon type="primary" /></a>
                    }
                </div>
            </div>
        </article>
    );
}

function BurgerConstructor() {
    return (
        <>
            <section className={`${style.bun} pb-4`}>
                <BurgerConstructorItem 
                    image = 'https://code.s3.yandex.net/react/code/bun-02.png'
                    name = 'Краторная булка N-200i (верх)'
                    price = {1255}
                    isBun = {true}
                    isTop = {true}
                />
            </section>
            <section className={`${style.ingridients} scroll-container`}>
                <div className='scroll-inner'>
                    {
                        ingridients.map(item => {
                            return (
                                item.type !== 'bun' && 
                                <BurgerConstructorItem 
                                    id = {item._id}
                                    isDrag = {true}
                                    image = {item.image}
                                    name = {item.name}
                                    price = {item.price}
                                />
                            )
                            
                        })
                    }
                </div>
            </section>
            <section className={`${style.bun} pt-4`}>
                <BurgerConstructorItem 
                    image = 'https://code.s3.yandex.net/react/code/bun-02.png'
                    name = 'Краторная булка N-200i (низ)'
                    price = {1255}
                    isBun = {true}
                    isBottom = {true}
                />
            </section>
            <footer className={`${style.footer} pt-10 pb-10`}>
                footer
            </footer>
        </>
    );
}

export default BurgerConstructor;