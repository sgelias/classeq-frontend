import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authService } from '../auth/_services/_auth.services';


console.log(authService.getToken())

// @ts-ignore
export default ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        authService.getToken()
            ? <Component {...props} />
            : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            )
    )} />
);