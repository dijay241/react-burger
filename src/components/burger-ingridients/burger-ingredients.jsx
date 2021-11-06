import React, { useMemo, useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import BurgerIngredientsTabs from './burger-ingredients-tabs';
import BurgerIngredientsGroup from './burger-ingredients-group';
import {SET_CURRENT_TAB} from '../../services/actions'

const BurgerIngredients = ({ openModal }) => {

    const dispatch = useDispatch();
    const tabsRef = useRef(null);
    const bunsRef = useRef(null);
    const saucesRef = useRef(null);
    const mainsRef = useRef(null);

    const {groups, items, itemsRequest} = useSelector((state) => ({
        groups: state.ingredients.groups,
        items: state.ingredients.items,
        itemsRequest: state.ingredients.request
    }));

    const setCurrentTab = (name) => {
        dispatch({
            type: SET_CURRENT_TAB,
            name
        });
    }

    const findCurrentTab = () => {

        const tabsTop = tabsRef.current.getBoundingClientRect().top;
        const bunsDistance = Math.abs(tabsTop - bunsRef.current.getBoundingClientRect().top);
        const saucesDistance = Math.abs(tabsTop - saucesRef.current.getBoundingClientRect().top);
        const mainsDistance = Math.abs(tabsTop - mainsRef.current.getBoundingClientRect().top);

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
            groups.map((group, id) => {
                    return (
                        <BurgerIngredientsGroup
                            key = {id}
                            id = {id}
                            ref = {
                                group.name === 'bun' ? bunsRef :
                                    group.name === 'sauce' ? saucesRef :
                                        group.name === 'main' && mainsRef
                            }
                            title = {group.title}
                            name = {group.name}
                            ingredients = {
                                items && items.filter((item) => item.type === group.name)
                            }
                            openModal = {openModal}
                        />
                    )
                }
            )
    }, [groups, items, itemsRequest, openModal]);

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

BurgerIngredients.propTypes = {
    openModal: PropTypes.func
}

export default BurgerIngredients;