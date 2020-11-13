import React, { createRef, useState } from 'react';
import { useAsyncEffect } from 'use-async-effect';
import queryString from 'query-string';
import { useCookies } from 'react-cookie'
import { keys } from 'ts-transformer-keys';

import OauthPopup from './OauthPopup';


interface AuthResponse {
    access_token: string
    expires_in: number
    refresh_token: string
    scope: "read write groups introspection"
    token_type: "Bearer"
};


export default () => {


    const [, setCookie] = useCookies();


    /**
     * Validate if all keys of the authentication object exists.
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


    useAsyncEffect(() => {

        //@ts-ignore
        const params: AuthResponse = queryString.parse(window.location.search);

        if (validate_auth_query_params(params)) {
            if (params.expires_in) {
                const expires_in = params.expires_in;
                console.log(expires_in);
                const expires = new Date(Date.now() + expires_in * 200);
                localStorage.setItem("pas_auth", JSON.stringify(params));
                setCookie("pas_auth", params, { path: "/", expires: expires });
            }
        }
    }, [])


    return (
        <OauthPopup
            url={"http://0.0.0.0:8000/api/auth/authorize/"}
            width={600}
            height={600}
            title={"OauthPopup"}
            onClose={() => console.log('closed')}
        >
            <button>Enter</button>
        </OauthPopup>
    );
};
