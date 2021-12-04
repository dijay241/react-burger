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
