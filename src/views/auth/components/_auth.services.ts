import axios from 'axios';

import {
    provideAuthLoginUrl,
    AuthCredentials,
    CustomRequestConfig,
} from '../../../_helpers/url-providers';


/**
 * Getter like method for token management.
 */
const getToken = () => {
    const _token: string | null = localStorage.getItem('user');
    if (_token) return JSON.parse(_token);
}


/**
 * Try to Sign-in user.
 * @param username A string as username.
 * @param password A string as password.
 */
const login = async (username: string, password: string) => {

    const credentials: AuthCredentials = {
        username: username,
        password: password,
    };

    let config: CustomRequestConfig = provideAuthLoginUrl(credentials);

    return await axios(config)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user['data']));
            return user;
        })
        .catch(err => {
            logout();
            return err;
        });
};


/**
 * Remove user token from local storage to log-out user.
 */
const logout = () => {
    localStorage.removeItem('user');
};


export const authService = {
    login,
    logout,
    getToken,
};
