import axios from 'axios';
import { v4 as uuid } from 'uuid/interfaces';

import {
    BaseProject,
    CustomRequestConfig,
    CreatedProject,
    ListResponseInterface,
    ProjectsListObjects,
    provideProjectsUrl,
} from '../../../_helpers/_url-providers';


/**
 * List all records.
 * 
 * @see `ListResponseInterface`
 * @param params An object of type ListResponseInterface.
 */
const list = async (
    access_token?: string,  params?: ListResponseInterface
): Promise<{ data: ProjectsListObjects }> => {
    let config: CustomRequestConfig = provideProjectsUrl(
        "GET", { query_params: params }
    );
    return await axios(config);
}


/**
 * Get a single record.
 * 
 * @see `ListResponseInterface`
 * @param params An object of type ListResponseInterface.
 */
const get = async (
    id: uuid, access_token?: string
): Promise<{ data: CreatedProject }> => {
    let config: CustomRequestConfig = provideProjectsUrl(
        "GET", { id: id }
    );
    return await axios(config);
}


/**
 * Create a new record.
 * 
 * @param record An project object.
 */
const create = async (
    record: BaseProject, access_token?: string
): Promise<CreatedProject> => {
    let config: CustomRequestConfig = provideProjectsUrl(
        "POST", { data: record }
    );
    return await axios(config);
}


/**
 * Update an existent record.
 * 
 * @param record An project object.
 */
const update = async (
    record: CreatedProject, access_token?: string
): Promise<CreatedProject> => {
    let config: CustomRequestConfig = provideProjectsUrl(
        "PUT", { data: record }
    );
    return await axios(config);
}


/**
 * Delete a single record.
 * 
 * @param id The uuid of the records to be deleted.
 */
const deleteRecord = async (id: uuid, access_token?: string): Promise<any> => {
    let config: CustomRequestConfig = provideProjectsUrl(
        "DELETE", { id: id }
    );
    return await axios(config);
}


export const projectServices = {
    list,
    get,
    create,
    update,
    deleteRecord,
}
