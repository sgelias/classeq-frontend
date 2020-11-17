import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';


export default ({ component: Component, ...rest }) => {


    /**
     * @description Create a read-only hook for cookies.
     */
    const [cookie] = useCookies();


    return (
        <Route {...rest} render={props => {

            console.log(props);

            return cookie.pas_auth
                ? <Component {...props} />
                : (
                    <Redirect
                        to={{
                            pathname: '/auth/',
                            state: { from: props.match }
                        }}
                    />
                )
        }} />
    );
};
