import { v4 as uuid } from 'uuid/interfaces';

// *******************
// Shared utilities.
// *******************


// Common headers.
const baseHeader: Headers = new Headers();
baseHeader.append('Access-Control-Allow-Origin', 'http://localhost:8000/*');


// Common params.
const baseParams: URLSearchParams = new URLSearchParams()


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
}


/**
 * Validate query parameters for default.
 * @param qpars The query parameter object.
 */
const validateParams = (qpars: any) => {
    let params = baseParams;

    /* Page Size */
    if (!qpars.ps) qpars.ps = 10;
    params.set('ps', `${qpars.ps}`);

    /* Filter term */
    if (qpars.q)
    params.append('q', `${qpars.q}`);

    /* Current page */
    if (qpars.p)
    params.append('p', `${qpars.p}`);

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
 * @see `validateParams` method.
 * @param query_params Basic query params for request configuration.
 */
export const provideProjectsListUrl = (query_params?: any) => {
    let params = validateParams(query_params);
    return {
        url: `${baseUrl}/projs/`,
        params: params,
        headers: baseHeader,
    }
}


/**
 * Provide a configured URL for create requests.
 * @see `validateParams` method.
 * @param query_params Basic query params for request configuration.
 */
export const provideProjectsCreateUrl = () => {
    return {
        url: `${baseUrl}/projs/new`,
        headers: baseHeader,
    }
}


export const provideProjectsEditUrl = () => { }
