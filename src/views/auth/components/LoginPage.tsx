import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useCookies } from 'react-cookie'

import OauthPopup from './OauthPopup';
import { authService } from '../_services/_auth.services';
import { LocationInterface } from '../../../layouts/AuthLayout';


interface AuthResponse {
    access_token: string,
    expires_in: number,
    refresh_token: string,
    scope: string,
    token_type: "Bearer",
};


interface Props {
    match: LocationInterface,
}


export default (props: Props) => {


    /**
     * @description A boolean to specify if the authorization process is
     * running.
     */
    const [authenticating, setAuthenticating] = useState<boolean>(false);


    /**
     * @description Create a write-only hook cookies management.
     */
    const [, setCookie] = useCookies();


    /**
     * @description Validate if all keys of the authentication object exists.
     * @param params An object containing all keys of the `AuthResponse`
     * interface.
     */
    const validate_auth_query_params = (params: any) => {
        const {
            access_token, expires_in, refresh_token, scope, token_type
        } = params;

        if (
            [access_token, expires_in, refresh_token, scope, token_type]
                .every((key) => key !== undefined)
        ) {
            return true
        } else {
            return undefined
        }
    };


    /**
     * @description Verify the validity of authorization parameters and store
     * the resulting object in cookies using a `pas_auth` key.
     * @param params A object containing all keys of `AuthResponse` interface.
     */
    const storeAuthParams = (params: AuthResponse): void => {
        if (validate_auth_query_params(params)) {
            if (params.expires_in) {
                const expires = new Date(Date.now() + params.expires_in * 1000);
                setCookie("pas_auth", params, { path: "/", expires: expires });
            }
        }
    };


    /**
     * @description Create an effect to store authorization parameters passed
     * through url query parameters during component initialization.
     */
    useEffect(() => {
        const params = queryString.parse(window.location.search);
        if ("code" in params) {
            setAuthenticating(true);
            //@ts-ignore
            authService.oAuthGetToken(params.code)
                .then((res: { data: AuthResponse }) => storeAuthParams(res.data))
                .then(() => setAuthenticating(false))
                .catch(err => console.log(err));
        };
    }, []);


    return (
        <>
            {authenticating
                ? (
                    <div>
                        Authorizing... Please, don't close this window.
                    </div>
                )
                : (
                    <OauthPopup
                        width={600}
                        height={600}
                        title={"OauthPopup"}
                        match={props.match}
                    >
                        Authorize
                    </OauthPopup>
                )}
        </>
    );
};
