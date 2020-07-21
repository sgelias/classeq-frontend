import { v4 as uuid } from 'uuid/interfaces';

import { AxiosRequestConfig } from 'axios';


// *******************
// Shared utilities.
// *******************


// Base url to perform request to backend API.
const backendUrl: string = 'http://localhost:8000';
const baseUrl: string = `${backendUrl}/api/v1`;


/**
 * A custom request interface to abstract AxiosRequestConfig.
 * @see `AxiosRequestConfig` of axios package.
 */
export interface CustomRequestConfig extends AxiosRequestConfig {}


/**
 * Return authorization header with jwt token.
 */
const authHeader = (): Object => {
    // @ts-ignore
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': `JWT ${user.token}` };
    } else {
        return {};
    }
}


/**
 * Get common headers.
 * @param add_headers Additional headers to include on final header object.
 * @param is_authenticated If true the authentication token is also provided.
 */
const getCommonHeaders = (is_authenticated: boolean = false, add_headers?: Object): Object => {
    let headers = {
        'Access-Control-Allow-Origin': `${backendUrl}/*`,
        'Content-Type': 'application/json'
    }

    if (add_headers) headers = { ...headers, ...add_headers };
    if (is_authenticated) headers = { ...headers, ...authHeader() }

    return headers;
}


/**
 * This is a common interface for list requests. Keys denotes:
 * count: the total number of records;
 * previous and next: navigation links;
 * tp: total records at the current page;
 * p: the page to be shown;
 * ps: the expected size of the page to show.
 */
export interface ListResponseInterface {
    count?: number,
    previous?: any,
    next?: any,
    tp?: number,
    p?: number,
    ps?: number,
    q?: string,
}


/**
 * Validate query parameters for queries performed with a list as a response.
 * @param qpars The query parameter object.
 */
const buildParamsForLists = (qpars: any = {}) => {
    let params: any = {}

    /* Page Size */
    if (!qpars.ps) qpars.ps = 10;
    params.ps = qpars.ps;
    
    /* Filter term */
    if (qpars.q)
    params.q = qpars.q;
    
    /* Current page */
    if (qpars.p)
    params.p = qpars.p;
    
    return params;
}


// *******************
// Projects utilities.
// *******************


/**
 * Interface for not also created projects. It would be used in creation forms.
 */
export interface BaseProject {
    title?: string,
    description?: string,
}


/**
 * Interface for also created projects. it would be used in projects lists,
 * updates and delete.
 */
export interface CreatedProject extends BaseProject {
    uuid: uuid,
    user: number,
    created: Date,
    updated: Date,
}


/**
 * Interface for Projects list.
 */
export interface ProjectsListObjects extends ListResponseInterface {
    results: Array<CreatedProject>
}


/**
 * Provide a configured URL for list requests.
 * @see `buildParamsForLists` method.
 * @param query_params Basic query params for request configuration.
 */
export const provideProjectsListUrl = (query_params?: any): CustomRequestConfig => {
    const params = buildParamsForLists(query_params);
    return {
        url: `${baseUrl}/projs/`,
        params: params,
        headers: getCommonHeaders(),
    }
}


/**
 * Provide a configured URL for create requests.
 * @param data Data to be submited as a new record.
 */
export const provideProjectsCreateUrl = (data: any): CustomRequestConfig => {
    return {
        url: `${baseUrl}/projs/new`,
        headers: getCommonHeaders(true),
        data: data,
    }
}


export const provideProjectsEditUrl = () => { }


// *******************
// Auth utilities.
// *******************



/**
 * Interface for minimal credentials object.
 */
export interface AuthCredentials {
    username: string | undefined,
    password: string | undefined,
    submitted?: boolean,
}


/**
 * Provide a configured URL for create requests.
 * @see `AuthCredentials`
 * @param data Data to be submited as a new record.
 */
export const provideAuthLoginUrl = (data: AuthCredentials): CustomRequestConfig => {
    return {
        url: `${baseUrl}/auth/get-token/`,
        headers: getCommonHeaders(),
        data: data,
    }
}
