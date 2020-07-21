import axios from 'axios';

import { provideAuthLoginUrl, AuthCredentials, CustomRequestConfig } from '../../../_helpers/url-providers';


/**
 * Try to Sign-in user.
 * @param username A string as username.
 * @param password A string as password.
 */
const login = async (username: string, password: string) => {

    const credentials: AuthCredentials = {
        username: username,
        password: password,
    }

    let config: CustomRequestConfig = provideAuthLoginUrl(credentials)
    config.method = "POST"

    return await axios(config)
        //.then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user['data']));
            return user;
        });
}


/**
 * Remove user from local storage to log user out.
 */
const logout = () => {
    localStorage.removeItem('user');
}


const handleResponse = (response: any) => {
    console.log(response);
    
    return response.then((text: any) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}


export const authService = {
    login,
    logout,
};
