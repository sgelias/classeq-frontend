import axios from 'axios';

import {
    provideProjectsListUrl,
    provideProjectsCreateUrl,
    BaseProject,
    CustomRequestConfig,
    CreatedProject,
    ProjectsListObjects
} from '../../../_helpers/url-providers';


// TODO: implantar a utilização de jwt para identificação dos uruários.
// Authentication with jwt
// https://jasonwatmore.com/post/2017/12/07/react-redux-jwt-authentication-tutorial-example


/**
 * Get all projects.
 * @param params An object of type ...
 */
const getAll = async (params?: any): Promise<{ data: ProjectsListObjects }> => {
    let config: CustomRequestConfig = provideProjectsListUrl(params);
    config.method = "GET";
    return await axios(config);
}


const createProject = async (record: BaseProject): Promise<CreatedProject | any> => {
    let config: CustomRequestConfig = provideProjectsCreateUrl(record);
    config.method = "POST"
    return await axios(config);
}


export const projectServices = {
    getAll,
    createProject,
}
