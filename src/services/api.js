const API_URL = 'https://norma.nomoreparties.space/api';

export const GET_INGREDIENTS_API_URL = API_URL + '/ingredients';
export const GET_ORDER_API_URL = API_URL + '/orders';

export const FORGOT_PASSWORD_API_URL = API_URL + '/password-reset';
export const RESET_PASSWORD_API_URL = API_URL + '/password-reset/reset';
export const REGISTER_API_URL = API_URL + '/auth/register';

export function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res.status);
}

const logIn = async form => {
    const data = await loginRequest(form)
      .then(res => {
        let authToken;
        res.headers.forEach(header => {
          if (header.indexOf('Bearer') === 0) {
            authToken = header.split('Bearer ')[1];
          }
        });
        if (authToken) {
          setCookie('token', authToken);
        }
        return res.json();
      })
      .then(data => data);

    if (data.success) {
      setUser({ ...data.user, id: data.user._id });
    }
  };