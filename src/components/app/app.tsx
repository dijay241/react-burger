import React from 'react';
import style from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingridients/burger-ingredients"; 
import BurgerConstructor from "../burger-constructor/burger-constructor";

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        data: []
    });

    React.useEffect(() => {
        API_URL && getData(API_URL);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function getData(url:string) {
        setState({ ...state, hasError: false, isLoading: true });
        fetch(url)
            .then(res => res.json())
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
                    {!state.isLoading && !state.hasError && state.data.length && <BurgerIngredients ingredients={state.data} />}
                </section>
                <section className={`${style.column} pt-25`}>
                    {!state.isLoading && !state.hasError && state.data.length && <BurgerConstructor ingredients={state.data} />}
                </section>
            </main>
        </div>
    )
}

export default App;
