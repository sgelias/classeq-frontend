import { AxiosRequestConfig, Method } from 'axios';

import { v4 as uuid } from 'uuid/interfaces';

// *******************
// Shared utilities.
// *******************


/**
 * Base url to perform request to backend API.
 */
const backendUrl: string = 'http://localhost:8000';
const baseUrl: string = `${backendUrl}/api/v1`;


/**
 * Gene connector base url.
 */
const geneConnectorBaseUrl: string = 'https://lepiota.herokuapp.com/api';


/**
 * A custom request interface to abstract AxiosRequestConfig.
 * 
 * @see `AxiosRequestConfig` of axios package.
 */
export interface CustomRequestConfig extends AxiosRequestConfig { }


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
 * Define the basic interface for http requests.
 */
export interface HttpQueryParams {
    id?: uuid,
    query_params?: ListResponseInterface,
    data?: Object | any
}


/**
 * Interface for also created records.
 */
export interface CreatedRecords {
    readonly uuid?: uuid,
    readonly created?: | Date | undefined,
    readonly updated?: Date | undefined,
    [key: string]: any;
}


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
 * 
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
 * Validate query parameters for queries performed with a list as a response.
 * 
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
 * Interface for payload variables (variables decoded from auth token).
 */
export interface Payload {
    email: string,
    exp: number,
    orig_iat: number,
    user_id: number,
    username: string,
}


/**
 * Provide a configured URL for create requests.
 * 
 * @see `AuthCredentials`
 * @see `Method` from axios package.
 * @param method An http method.
 * @param data Data to be submited as a new record.
 */
export const provideAuthLoginUrl = (data: AuthCredentials): CustomRequestConfig => {
    return {
        method: "POST",
        url: `${baseUrl}/auth/get-token/`,
        headers: getCommonHeaders(),
        data: data,
    }
}


// *******************
// User utilities.
// *******************


/**
 * Basic user interface.
 */
export interface User {
    id: number,
    email: string,
    username: string,
    first_name: string,
    last_name: string,
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
 * Interface for also created projects. It would be used in projects lists,
 * updates and delete.
 */
export interface CreatedProject extends BaseProject, CreatedRecords {
    user?: User,
}


/**
 * Interface for Projects list.
 */
export interface ProjectsListObjects extends ListResponseInterface {
    results: Array<CreatedProject>
}


/**
 * Return an appropriated http config object of CustomRequestConfig
 * type to be used in axios requests. See example below.
 * 
 * @example axios(provideProjectsUrl("GET", { id: id }))
 * @see `getCommonHeaders` method.
 * @see `buildParamsForLists` method.
 * @see `Method` from axios package.
 * @see `CustomRequestConfig` interface.
 * @param method A valid http verb of class Method from axios package.
 * @param args An Object containing specific params as 
 */
export const provideProjectsUrl = (method: Method, args: HttpQueryParams): CustomRequestConfig => {

    let request: CustomRequestConfig = {
        headers: getCommonHeaders(true),
    };

    switch (method) {
        case "GET":
            if (args.id && !args.query_params) {
                return request = {
                    ...request, ...{
                        method: method,
                        url: `${baseUrl}/projs/${args.id}`,
                    }
                };
            } else {
                return request = {
                    ...request, ...{
                        method: method,
                        url: `${baseUrl}/projs/`,
                        params: buildParamsForLists(args.query_params),
                    }
                };
            };

        case "POST":
            return request = {
                ...request, ...{
                    method: method,
                    url: `${baseUrl}/projs/new`,
                    data: args.data,
                }
            };

        case "PUT":
            return request = {
                ...request, ...{
                    method: method,
                    url: `${baseUrl}/projs/${args.data.uuid}/edit`,
                    data: args.data,
                }
            };

        case "DELETE":
            return request = {
                ...request, ...{
                    method: method,
                    url: `${baseUrl}/projs/${args.id}/delete`,
                }
            };

        default:
            return request;
    }
}


// *******************
// Trees utilities.
// *******************


/**
 * Interface for genes.
 */
export interface Gene {
    id: uuid,
    name: string,
    name_slug: string,
    meta: {
        terms: Array<string>
    }
}


/**
 * Interface for list of Gene objects.
 */
export interface GeneListObjects extends ListResponseInterface {
    results: Array<Gene>
}


export interface TreesValidationSteps {
    map_clade_status?: boolean,
    upload_sequences_status?: boolean,
    map_features_status?: boolean,
}


/**
 * Interface for not also created trees. It would be used in creation forms.
 */
export interface BaseTrees {
    title?: string,
    description?: string,
    gene?: Gene | undefined,
    tree?: string,
    related_tree?: any,
    tree_utils?: TreesValidationSteps,
    [key: string]: any,
}


/**
 * Interface for also created trees. It would be used in tree lists, updates and
 * delete.
 */
export interface CreatedTrees extends BaseTrees, CreatedRecords {
    is_active?: boolean,
}


/**
 * Interface for Projects list.
 */
export interface TreesListObjects extends ListResponseInterface {
    results: Array<CreatedTrees>,
    [key: string]: any,
}


/**
 * Return an appropriated http config object of CustomRequestConfig
 * type to be used in axios requests. See example below.
 * 
 * @example axios(provideProjectsUrl("GET", { id: id }))
 * @see `getCommonHeaders` method.
 * @see `buildParamsForLists` method.
 * @see `Method` from axios package.
 * @see `CustomRequestConfig` interface.
 * @see `HttpQueryParams` interface.
 * @param method A valid http verb of class Method from axios package.
 * @param project_pk A project primary key.
 * @param args An Object containing specific params as HttpQueryParams interface.
 */
export const provideTreesUrl = (method: Method, project_pk: uuid, args: HttpQueryParams): CustomRequestConfig => {

    let request: CustomRequestConfig = {
        headers: getCommonHeaders(true),
    };

    switch (method) {
        case "GET":
            if (args.id && !args.query_params) {
                return request = {
                    ...request, ...{
                        method: method,
                        url: `${baseUrl}/${project_pk}/trees/${args.id}`,
                    }
                };
            } else {
                return request = {
                    ...request, ...{
                        method: method,
                        url: `${baseUrl}/${project_pk}/trees/`,
                        params: buildParamsForLists(args.query_params),
                    }
                };
            };

        case "POST":
            return request = {
                ...request, ...{
                    method: method,
                    url: `${baseUrl}/${project_pk}/trees/new`,
                    data: args.data,
                }
            };

        case "PUT":
            return request = {
                ...request, ...{
                    method: method,
                    url: `${baseUrl}/${project_pk}/trees/${args.data.uuid}/edit`,
                    data: args.data,
                }
            };

        case "DELETE":
            return request = {
                ...request, ...{
                    method: method,
                    url: `${baseUrl}/${project_pk}/trees/${args.id}/delete`,
                }
            };

        default:
            return request;
    }
}


/**
 * Provide a basic url to perform a request to Gene-Connector gene public API.
 * 
 * @param term A string containing a term to filter records.
 */
export const provideGeneSearchUrl = (term: string): CustomRequestConfig => {
    return {
        headers: getCommonHeaders(),
        method: "GET",
        url: `${geneConnectorBaseUrl}/public/gene/`,
        params: { q: term }
    };
}


/**
 * Get all clades of a specific phylogenetic tree.
 * 
 * @see `CustomRequestConfig` interface.
 * @see `HttpQueryParams` interface.
 * @param project_pk A project primary key.
 * @param args An Object containing specific params as HttpQueryParams interface.
 */
export const provideGetLeavesUrl = (project_pk: uuid, args: HttpQueryParams): CustomRequestConfig => {
    return {
        headers: getCommonHeaders(true),
        method: "GET",
        url: `${baseUrl}/${project_pk}/trees/${args.id}/get-leaves`,
    }
}


/**
 * Map clades of tree.
 * 
 * @see `CustomRequestConfig` interface.
 * @see `HttpQueryParams` interface.
 * @param project_pk A project primary key.
 * @param args An Object containing specific params as HttpQueryParams interface.
 */
export const provideMapCladesUrl = (project_pk: uuid, args: HttpQueryParams): CustomRequestConfig => {
    return {
        headers: getCommonHeaders(true),
        method: "PATCH",
        url: `${baseUrl}/${project_pk}/trees/${args.id}/map-clades`,
        data: args.data
    }
}


/**
 * Provide url for test if outgroups are monophyletic.
 * 
 * @see `CustomRequestConfig` interface.
 * @see `HttpQueryParams` interface.
 * @param project_pk A project primary key.
 * @param args An Object containing specific params as HttpQueryParams interface.
 */
export const provideTestCladesUrl = (project_pk: uuid, args: HttpQueryParams): CustomRequestConfig => {
    return {
        headers: getCommonHeaders(true),
        method: "PATCH",
        url: `${baseUrl}/${project_pk}/trees/${args.id}/test-clade`,
        data: args.data
    }
}


/**
 * Provide a url to send fasta file to be uploaded.
 * 
 * @see `CustomRequestConfig` interface.
 * @see `HttpQueryParams` interface.
 * @param args An Object containing specific params as HttpQueryParams interface.
 */
export const provideUploadAlignmentUrl = (args: HttpQueryParams): CustomRequestConfig => {
    return {
        headers: getCommonHeaders(true),
        method: "POST",
        url: `${baseUrl}/seq/${args.id}/map-fasta`,
        data: args.data
    }
}


/**
 * Provide a url to start sequence features mapping.
 * 
 * @see `CustomRequestConfig` interface.
 * @see `HttpQueryParams` interface.
 * @param args An Object containing specific params as HttpQueryParams interface.
 */
export const provideSequenceFeatureGenerationUrl = (args: HttpQueryParams): CustomRequestConfig => {
    return {
        headers: getCommonHeaders(true),
        method: "PATCH",
        url: `${baseUrl}/seq-features/${args.id}/map-features`
    }
}


// *******************
// Clades utilities.
// *******************


/**
 * Interface for created sequences.
 */
export interface CreatedSequences {
    readonly uuid: uuid,
    readonly created: Date,
    readonly updated: Date,
    readonly fasta_head: string,
    readonly fasta_sequence: string,
    readonly length: number,
    readonly source_clade: uuid,
}


/**
 * Interface for created clades.
 */
 export interface CreatedClades extends CreatedRecords {
    tree?: uuid,
    parent?: uuid,
    branch_type?: string,
    name?: string,
    branch_length?: number,
    confidence?: number,
    child?: Array<uuid>,
    is_valid?: boolean,
    is_active?: boolean,
    sequence?: CreatedSequences,
    [key: string]: any,
}


/**
 * Interface for Clades list.
 */
export interface CladesListObjects extends ListResponseInterface {
    results: Array<CreatedClades>,
    [key: string]: any,
}


/**
 * Return an appropriated http config object of CustomRequestConfig
 * type to be used in axios requests. See example below.
 * 
 * @example axios(provideProjectsUrl("GET", { id: id }))
 * @see `getCommonHeaders` method.
 * @see `buildParamsForLists` method.
 * @see `Method` from axios package.
 * @see `CustomRequestConfig` interface.
 * @param method A valid http verb of class Method from axios package.
 * @param tree_pk A tree primary key.
 * @param args An Object containing specific params as 
 */
export const provideCladesUrl = (method: Method, tree_pk: uuid, args: HttpQueryParams): CustomRequestConfig => {

    let request: CustomRequestConfig = {
        headers: getCommonHeaders(true),
    };

    switch (method) {
        case "GET":
            if (args.id && !args.query_params) {
                return request = {
                    ...request, ...{
                        method: method,
                        url: `${baseUrl}/${tree_pk}/clades/${args.id}`,
                    }
                };
            } else {
                return request = {
                    ...request, ...{
                        method: method,
                        url: `${baseUrl}/${tree_pk}/clades/`,
                        params: buildParamsForLists(args.query_params),
                    }
                };
            };

        default:
            return request;
    }
}


/**
 * Provide a url to get all sequences from clades.
 * 
 * @see `CustomRequestConfig` interface.
 * @see `HttpQueryParams` interface.
 * @param args An Object containing specific params as HttpQueryParams interface.
 */
export const provideSequencesUrl = (clades_list: Array<uuid | undefined>): CustomRequestConfig => {
    return {
        headers: getCommonHeaders(true),
        method: "GET",
        url: `${baseUrl}/seq/`,
        params: { clades_list: clades_list.join(',') }
    }
}
