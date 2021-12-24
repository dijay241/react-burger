import React, {FC, useMemo, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BurgerIngredientsTabs from './burger-ingredients-tabs';
import BurgerIngredientsGroup from './burger-ingredients-group';
import {SET_CURRENT_TAB} from '../../services/constants'
import {TBurgerIngredientsGroup, TIngredients, TStates} from "../../../declarations/library-name";

const BurgerIngredients:FC = () => {

    const dispatch = useDispatch();
    const tabsRef = useRef<HTMLDivElement>(null);
    const bunsRef = useRef<HTMLDivElement>(null);
    const saucesRef = useRef<HTMLDivElement>(null);
    const mainsRef = useRef<HTMLDivElement>(null);

    const {groups, items, itemsRequest} = useSelector((state:TStates) => ({
        groups: state?.ingredients.groups,
        items: state?.ingredients.items,
        itemsRequest: state?.ingredients.request
    }));

    const setCurrentTab = (name:string):void => {
        dispatch({
            type: SET_CURRENT_TAB,
            name
        });
    }

    const findCurrentTab = ():void => {

        const tabsTop = tabsRef.current ? tabsRef.current.getBoundingClientRect().top : 0;
        const bunsDistance = Math.abs(tabsTop - (bunsRef.current ? bunsRef.current.getBoundingClientRect().top : 0));
        const saucesDistance = Math.abs(tabsTop - (saucesRef.current ? saucesRef.current.getBoundingClientRect().top : 0));
        const mainsDistance = Math.abs(tabsTop - (mainsRef.current ? mainsRef.current.getBoundingClientRect().top : 0));

        const maxValue = Math.min(bunsDistance, saucesDistance, mainsDistance);

        maxValue === bunsDistance ?
            setCurrentTab('bun') :
                maxValue === saucesDistance ?
                    setCurrentTab('sauce') :
                        setCurrentTab('main')
    };

    const groupContent = useMemo(() => {
        return itemsRequest ?
            ( <div>Loading...</div>)
            :
            groups.map((group:TBurgerIngredientsGroup, id:number) => {
                    return (
                        <BurgerIngredientsGroup
                            key = {id}
                            ref = {
                                group.name === 'bun' ? bunsRef :
                                    group.name === 'sauce' ? saucesRef :
                                        group.name === 'main' ? mainsRef :
                                            undefined
                            }
                            title = {group.title}
                            name = {group.name}
                            ingredients = {
                                items && items.filter((item:TIngredients) => item.type === group.name)
                            }
                        />
                    )
                }
            )
    }, [groups, items, itemsRequest]);

    return (
        <>
            <header className='pt-10'>
                <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
                <BurgerIngredientsTabs ref={tabsRef} />
            </header>
            <section className='scroll-container'>
                <div className='scroll-inner custom-scroll pt-10 pb-10' onScroll={findCurrentTab}>
                    { groupContent }
                </div>
            </section>
        </>
    )
}

export default BurgerIngredients;