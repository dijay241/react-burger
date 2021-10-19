import React from 'react';
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingridients/burger-ingredients'; 
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details'

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        data: []
    });

    const [ingredientModal, setIngredientModal] = React.useState({
        show: false,
        image: '',
        name: '',
        energy: []
    });

    const [orderModal, setOrderModal] = React.useState({
        show: false
    });

    React.useEffect(() => {
        API_URL && getData(API_URL);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function closeModal() {
        setIngredientModal({
            ...ingredientModal,
            show: false
        });
        setOrderModal({
            show: false
        });
    }

    function openIngredientModal(data:any) {
        setIngredientModal({
            show: true,
            image: data.image,
            name: data.name,
            energy: data.energy
        });
    }

    function openOrderModal() {
        setOrderModal({
            show: true
        });
    }

    function getData(url:string) {
        setState({ ...state, hasError: false, isLoading: true });
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then(res => setState({ ...state, data: res.data, isLoading: false }))
            .catch(e => {
                setState({ ...state, hasError: true, isLoading: false });
                console.error(e);
            });
    }

    return (
        <div className={style.app}>
            <AppHeader/>
            <main className={style.main}>
                <section className={style.column}>
                    {
                        !state.isLoading && !state.hasError && state.data.length && (
                            <BurgerIngredients 
                                openModal={openIngredientModal} 
                                ingredients={state.data} 
                                />
                        )
                    }
                </section>
                <section className={`${style.column} pt-25`}>
                    {
                        !state.isLoading && !state.hasError && state.data.length && (
                            <BurgerConstructor 
                                openModal={openOrderModal} 
                                ingredients={state.data} 
                                />
                        )
                    }
                </section>
            </main>
            {
                ingredientModal.show && (
                    <Modal header='Детали ингредиента' closeModal={closeModal}>
                        <IngredientDetails 
                            image={ingredientModal.image} 
                            name={ingredientModal.name} 
                            energy={ingredientModal.energy} 
                            />
                    </Modal>
                )
            }
            {
                orderModal.show && (
                    <Modal header='' closeModal={closeModal}>
                        <OrderDetails />
                    </Modal>
                )
            }
            
        </div>
    )
}

export default App;