import { v4 as uuid } from 'uuid/interfaces';

import { AxiosRequestConfig } from 'axios';

// *******************
// Shared utilities.
// *******************


export interface CustomRequestConfig extends AxiosRequestConfig {}


// Common headers.
const baseHeader: Headers = new Headers();
baseHeader.append('Access-Control-Allow-Origin', 'http://localhost:8000/*');
baseHeader.append('Content-Type', 'application/json');


// Base url to perform request to backend API.
const baseUrl: string = 'http://localhost:8000/api/v1';


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
 * Validate query parameters for default.
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
    let params = buildParamsForLists(query_params);
    return {
        url: `${baseUrl}/projs/`,
        params: params,
        headers: baseHeader,
    }
}


/**
 * Provide a configured URL for create requests.
 * @param data Data to be submited as a new record.
 */
export const provideProjectsCreateUrl = (data: any): CustomRequestConfig => {
    return {
        url: `${baseUrl}/projs/new`,
        headers: baseHeader,
        data: data,
    }
}


export const provideProjectsEditUrl = () => { }


// *******************
// Auth utilities.
// *******************


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
        headers: baseHeader,
        data: data,
    }
}
