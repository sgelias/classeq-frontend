import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authService } from '../auth/_services/_auth.services';


// @ts-ignore
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        authService.getToken()
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/pages/login', state: { from: props.location } }} />
    )} />
)

export default PrivateRoute;