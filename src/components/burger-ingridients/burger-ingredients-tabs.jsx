import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import { SET_CURRENT_TAB } from '../../services/actions';

const BurgerIngredientsTabs = React.forwardRef( (props , ref) => {

    const dispatch = useDispatch();
    const {groups, itemsCurrentTab} = useSelector((state) => ({
        groups: state?.ingredients.groups,
        itemsCurrentTab: state?.ingredients.currentTab
    }));

    const handleTabClick = (name) => {
        dispatch({
            type: SET_CURRENT_TAB,
            name
        });
    }

    return (
        <div ref={ref} style={{ display: 'flex' }}>
            {
                groups.map((group, id) => {
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