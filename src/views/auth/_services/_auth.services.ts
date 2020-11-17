import axios from 'axios';

import {
    provideAuthLoginUrl,
    provideAuthGetTokenUrl,
    provideGetSSOUserUrl,
    AuthCredentials,
    CustomRequestConfig,
} from '../../../_helpers/_url-providers';


/**
 * @deprecated The authentication process will be replaced by an single sign-on
 * authorization process. This function and all related to authorization are
 * deprecated and will be further removed.
 * 
 * @description Getter like method for token management.
 */
const getToken = () => {
    const _token: string | null = localStorage.getItem('user');
    if (_token) return JSON.parse(_token);
};


/**
 * @deprecated The authentication process will be replaced by an single sign-on
 * authorization process. This function and all related to authorization are
 * deprecated and will be further removed.
 * 
 * @description Try to Sign-in user.
 * 
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
 * @deprecated The authentication process will be replaced by an single sign-on
 * authorization process. This function and all related to authorization are
 * deprecated and will be further removed.
 * 
 * @description Remove user token from local storage to log-out user.
 */
const logout = () => {
    localStorage.removeItem('user');
};


/**
 * @description Request a authorization token from sso server.
 * 
 * @param code A string returned from oauth/token url.
 */
const oAuthGetToken = async (code: string) => {
    const config: CustomRequestConfig = provideAuthGetTokenUrl(code);
    return await axios(config);
};


const getUser = async (access_token: string) => {
    const config: CustomRequestConfig = provideGetSSOUserUrl(access_token);
    console.log(config);
    return await axios(config);
}


export const authService = {
    oAuthGetToken,
    login,
    logout,
    getToken,
    getUser,
};
