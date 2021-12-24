import moment from "moment";
import {TBurgerIngredientsItem, TObjectAny} from "../../declarations/library-name";

export function getCookie(name:string):string {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)') // eslint-disable-line
    );
    return matches ? decodeURIComponent(matches[1]) : '';
}

interface ICookieProps { 
    [name: string]: any;
}

export function setCookie(name:string, value:string|number|boolean|null, props:ICookieProps = {}):void {
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000 * 60);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = value ? encodeURIComponent(value) : null;
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function deleteCookie(name:string):void {
    setCookie(name, null, { expires: -1 });
}

export function formatDate(date:string):string {
    let dateDiff:number = moment(date).diff(moment(), 'days');
    let timeZone:string = new Date(date).toLocaleTimeString('en-US',{timeZoneName:'short'}).split(' ')[2]
    return `${dateDiff === 0 ? 'Сегодня' : dateDiff === -1 ? 'Вчера' : moment(date).fromNow()}, ${moment(date).format('HH:mm')} i-${timeZone}`;
}

export function getImagesArray(source:Array<TBurgerIngredientsItem>, seek:Array<string | undefined>):Array<string> {
    let result:Array<string> = [];
    seek.forEach(item => {
        let [filteredItem] = source.filter((itm:TBurgerIngredientsItem) => itm._id === item);
        result.push(filteredItem.image);
    });

    return result;
}

export function getOrderIngredients(source:Array<TBurgerIngredientsItem>, seek:Array<string | undefined> = []):TObjectAny {
    let result:TObjectAny = {
        totalPrice: 0,
        ingredients: []
    }
    seek?.length &&
        seek.forEach(item => {
            let [existingItem] = result.ingredients.filter((itm:TBurgerIngredientsItem) => itm._id === item);
            if(existingItem) {
                result.ingredients = result.ingredients.map((itm:TBurgerIngredientsItem) => {
                    return {
                        ...itm,
                        count: existingItem._id === itm._id ? existingItem.count + 1 : itm.count
                    }
                });
                result.totalPrice += existingItem.price;
            } else {
                let [filteredItem] = source.filter((itm:TBurgerIngredientsItem) => itm._id === item);
                filteredItem = {
                    ...filteredItem,
                    count: 1
                }
                result = {
                    totalPrice: result.totalPrice + filteredItem.price,
                    ingredients: [
                        ...result.ingredients,
                        filteredItem
                    ]
                }
            }
        });

    return result;
}
