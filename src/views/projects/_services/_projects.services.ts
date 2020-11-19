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
import { projectsActions as pa } from '../_reducers/_projects.actions';


/**
 * @description List all records.
 * 
 * @see `ListResponseInterface`
 * @param params An object of type ListResponseInterface.
 */
const list = async (
  access_token: string, dispatcher: any, params?: ListResponseInterface
): Promise<void> => {

  let config: CustomRequestConfig = provideProjectsUrl(
    "GET", access_token, { query_params: params }
  );

  await dispatcher(pa.projectsListPending(true));
  await axios(config)
    .then(async res => {
      await dispatcher(pa.projectsListSuccess(res.data.results));
      await dispatcher(pa.projectsListPending(false));
    })
    .catch(err => dispatcher(pa.projectsListFail(err)));
}


/**
 * @description Get a single record.
 * 
 * @see `ListResponseInterface`
 * @param params An object of type ListResponseInterface.
 */
const get = async (
  id: uuid, access_token: string
): Promise<{ data: CreatedProject }> => {
  let config: CustomRequestConfig = provideProjectsUrl(
    "GET", access_token, { id: id }
  );
  return await axios(config);
}


/**
 * @description Create a new record.
 * 
 * @param record An project object.
 */
const create = async (
  record: BaseProject, access_token: string
): Promise<CreatedProject> => {
  let config: CustomRequestConfig = provideProjectsUrl(
    "POST", access_token, { data: record }
  );
  return await axios(config);
}


/**
 * @description Update an existent record.
 * 
 * @param record An project object.
 */
const update = async (
  record: CreatedProject, access_token: string
): Promise<CreatedProject> => {
  let config: CustomRequestConfig = provideProjectsUrl(
    "PUT", access_token, { data: record }
  );
  return await axios(config);
}


/**
 * @description Delete a single record.
 * 
 * @param id The uuid of the records to be deleted.
 */
const deleteRecord = async (
  id: uuid, access_token: string
): Promise<any> => {
  let config: CustomRequestConfig = provideProjectsUrl(
    "DELETE", access_token, { id: id }
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
