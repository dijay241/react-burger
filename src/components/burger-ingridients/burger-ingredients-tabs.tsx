import React, {PropsWithChildren} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import { SET_CURRENT_TAB } from '../../services/constants';
import {TBurgerIngredientsGroup} from "../../../declarations/library-name";
import {useAppDispatch, useAppSelector} from "../../services/hooks";

const BurgerIngredientsTabs = React.forwardRef<HTMLDivElement, PropsWithChildren<any>>( (props , ref) => {

    const dispatch = useAppDispatch();
    const {groups, itemsCurrentTab} = useAppSelector(state => ({
        groups: state?.ingredients.groups,
        itemsCurrentTab: state?.ingredients.currentTab
    }));

    const handleTabClick = (name:string):void => {
        dispatch({
            type: SET_CURRENT_TAB,
            name
        });
        props.blockRefs[name].current.scrollIntoView({behavior: "smooth"});
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