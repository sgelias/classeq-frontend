import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authService } from '../auth/components/_auth.services';


// @ts-ignore
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        authService.getToken()
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)