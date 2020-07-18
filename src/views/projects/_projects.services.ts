import axios from 'axios';

import {
    provideProjectsListUrl,
    provideProjectsCreateUrl,
    BaseProject,
    CreatedProject,
    ProjectsListObjects
} from '../../helpers/urlProviders';


// TODO: implantar a utilização de jwt para identificação dos uruários.
// Authentication with jwt
// https://jasonwatmore.com/post/2017/12/07/react-redux-jwt-authentication-tutorial-example


// TODO: terminar de implantas os params para a o retorno da lista, incluindo tamando da página, e tal.
/**
 * Get all projects.
 * @param params An object of type ...
 */
const getAll = async (params?: any): Promise<{ data: ProjectsListObjects }> => {
    const url = provideProjectsListUrl({});
    return await axios.get(url.url);
}


const createProject = async (record: BaseProject): Promise<CreatedProject> => {
    const url = provideProjectsCreateUrl();
    return await axios.post(url.url, record);
}


export const projectServices = {
    getAll,
    createProject,
}
