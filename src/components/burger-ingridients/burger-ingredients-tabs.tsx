import React, {PropsWithChildren} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import { SET_CURRENT_TAB } from '../../services/actions';
import {TBurgerIngredientsGroup, TStates} from "../../../declarations/library-name";

const BurgerIngredientsTabs = React.forwardRef<HTMLDivElement, PropsWithChildren<any>>( (props , ref) => {

    const dispatch = useDispatch();
    const {groups, itemsCurrentTab} = useSelector((state:TStates) => ({
        groups: state?.ingredients.groups,
        itemsCurrentTab: state?.ingredients.currentTab
    }));

    const handleTabClick = (name:string):void => {
        dispatch({
            type: SET_CURRENT_TAB,
            name
        });
    }

    return (
        <div ref={ref} style={{ display: 'flex' }}>
            {
                groups.map((group:TBurgerIngredientsGroup, id:number) => {
                    return (
                        <Tab key={id} value={group.name} active={itemsCurrentTab === group.name} onClick={handleTabClick}>
                            {group.title}
                        </Tab>
                    )
                })
            }
        </div>
    )
});

export default BurgerIngredientsTabs;