import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC} from "react";
import {useDrop} from 'react-dnd';
import {useDispatch, useSelector} from "react-redux";
import style from './burger-constructor.module.css';
import {ADD_CONSTRUCTOR_BUN, INCREASE_BUN_COUNTER, UPDATE_TOTAL_PRICE} from "../../services/constants";
import {TBurgerBun, TMove, TStates} from "../../../declarations/library-name";

const BurgerBun:FC<TBurgerBun> = ({type}) => {

    const dispatch = useDispatch();
    const bun = useSelector((state:TStates) => state.ingredients.constructorBun);
    const isBunAdded = Object.keys(bun).length;

    const moveBun:TMove = (item) => {
        dispatch({
            type: ADD_CONSTRUCTOR_BUN,
            id: item.id
        });
        dispatch({
            type: INCREASE_BUN_COUNTER,
            id: item.id
        });
        dispatch({
            type: UPDATE_TOTAL_PRICE
        });
    }

    const [, dropTarget] = useDrop({
        accept: 'bun',
        drop(item:{id:string}) {
            moveBun(item);
        },
        collect: (monitor:any) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    return (
        <div ref={dropTarget}>
            {
                isBunAdded ?
                    <ConstructorElement
                        type={type}
                        isLocked={true}
                        text={`${bun.name} ${type === 'top' ? ' (верх)' : ' (низ)'}`}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />
                    :
                    <div className={style.emptyBun}>Перетащите сюда булку</div>
            }
        </div>
    )
}

export default BurgerBun;