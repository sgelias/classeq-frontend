import axios from 'axios';
import { v4 as uuid } from 'uuid/interfaces';

import {
    BaseTrees,
    CreatedTrees,
    CustomRequestConfig, 
    ListResponseInterface, 
    TreesListObjects, 
    provideTreesUrl,
} from "../../../_helpers/url-providers";


/**
 * List all records.
 * 
 * @param params An object of type ...
 */
const list = async (project_pk: uuid, params?: ListResponseInterface): Promise<{ data: TreesListObjects }> => {
    let config: CustomRequestConfig = provideTreesUrl("GET", project_pk, { query_params: params });
    return await axios(config);
}


/**
 * Get a single record.
 * 
 * @param params An object of type ...
 */
const get = async (project_pk: uuid, id: uuid): Promise<{ data: CreatedTrees }> => {
    let config: CustomRequestConfig = provideTreesUrl("GET", project_pk, { id: id });
    return await axios(config);
}


/**
 * Create a new record.
 * 
 * @param record An project object.
 */
const create = async (project_pk: uuid, record: BaseTrees): Promise<CreatedTrees> => {
    let config: CustomRequestConfig = provideTreesUrl("POST", project_pk, { data: record });
    return await axios(config);
}


/**
 * Update an existent record.
 * 
 * @param record An project object.
 */
const update = async (project_pk: uuid, record: CreatedTrees): Promise<CreatedTrees> => {
    let config: CustomRequestConfig = provideTreesUrl("PUT", project_pk, { data: record });
    return await axios(config);
}


/**
 * Delete a single record.
 * 
 * @param id The uuid of the records to be deleted.
 */
const deleteRecord = async (project_pk: uuid, id: uuid): Promise<any> => {
    let config: CustomRequestConfig = provideTreesUrl("DELETE", project_pk, { id: id });
    return await axios(config);
}


export const treesServices = {
    list,
    get,
    create,
    update,
    deleteRecord,
}
