import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef,FC} from "react";
import { useDrag, useDrop } from 'react-dnd';
import {useDispatch} from "react-redux";
import style from './burger-constructor.module.css';
import {DECREASE_ITEM_COUNTER, DELETE_CONSTRUCTOR_ITEM, UPDATE_TOTAL_PRICE} from "../../services/constants";
import {TBurgerItem} from "../../../declarations/library-name";

const BurgerItem:FC<TBurgerItem> = ({index, id, name, price, image, dragItem}) => {

    const dispatch = useDispatch();
    const ref = useRef<HTMLDivElement>(null);

    const deleteItem = ():void => {
        dispatch({
            type: DELETE_CONSTRUCTOR_ITEM,
            index
        });
        dispatch({
            type: DECREASE_ITEM_COUNTER,
            id
        });
        dispatch({
            type: UPDATE_TOTAL_PRICE
        });
    }

    const [, drop] = useDrop({
        accept: 'item',
        collect(monitor:any) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover: (item:{index:number}, monitor:any) => {
            const dragIndex = item.index,
                  hoverIndex = index;

            if (dragIndex === hoverIndex) return;

            if (!ref.current) return;

            const hoverBoundingRect = ref.current.getBoundingClientRect(),
                  hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2,
                  clientOffset = monitor.getClientOffset(),
                  hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

            dragItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    const [, drag] = useDrag({
        type: 'item',
        item: ():{id:string | undefined,index:number} => {
            return { id, index };
        }
    });
    drag(drop(ref));

    return (
        <div ref={ref} className={`${style.item} ml-4 mr-1 pl-8`}>
            <div className={style.drag}><DragIcon type="primary" /></div>
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                handleClose={deleteItem}
            />
        </div>
    )
}

export default BurgerItem;