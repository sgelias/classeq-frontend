import { authConstants } from './auth.constants';
import { authService } from '../components/_auth.services';
import { alertActions } from '../../alerts/_reducers/alerts.actions';
import { history } from '../../../_helpers/history';


const login = (username: string, password: string) => {

    const request = (user: any) => { return { type: authConstants.LOGIN_REQUEST, user } }
    const success = (user: any) => { return { type: authConstants.LOGIN_SUCCESS, user } }
    const failure = (error: any) => { return { type: authConstants.LOGIN_FAILURE, error } }

    return (dispatch: any) => {
        dispatch(request({ username }));
        authService.login(username, password)
            .then(
                (user: any) => { 
                    dispatch(success(user));
                    history.push('/');
                },
                (error: any) => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
}


const logout = () => {
    authService.logout();
    return { type: authConstants.LOGOUT };
}


export const authActions = {
    login,
    logout,
};
