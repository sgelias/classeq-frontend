import {
    BaseTrees,
    CreatedTrees,
    CustomRequestConfig,
    GeneListObjects,
    ListResponseInterface,
    provideGeneSearchUrl,
    provideGetLeavesUrl,
    provideMapCladesUrl,
    provideSequenceFeatureGenerationUrl,
    provideTestCladesUrl,
    provideTreesUrl,
    provideUploadAlignmentUrl,
    provideSequenceFeatureListUrl,
} from "../../../_helpers/_url-providers";

import axios from 'axios';
import { treesActions as ta } from '../_reducers/_trees.actions';
import { v4 as uuid } from 'uuid/interfaces';


/**
 * @description List all records.
 * 
 * @see `ListResponseInterface`
 * @param project_pk A primary key of a reference project.
 * @param dispacher A dispach object of redux.
 * @param params An object of type ListResponseInterface.
 */
const list = async (
    access_token: string, project_pk: uuid, dispatcher: any, params?: ListResponseInterface
): Promise<void> => {
    
    let config: CustomRequestConfig = provideTreesUrl(
        "GET", access_token, project_pk, { query_params: params }
    );

    await dispatcher(ta.treesListPending(true));
    await axios(config)
        .then(async res => {
            await dispatcher(ta.treesListSuccess(res.data.results));
            await dispatcher(ta.treesListPending(false));
        })
        .catch(err => dispatcher(ta.treesListFail(err)));
};


/**
 * @description Get a single record.
 * 
 * @see `ListResponseInterface`
 * @param project_pk A primary key of a reference tree.
 * @param id The tree primary key.
 */
const get = async (
    access_token: string, project_pk: uuid, id: uuid
): Promise<{ data: CreatedTrees }> => {
    
    let config: CustomRequestConfig = provideTreesUrl(
        "GET", access_token, project_pk, { id: id }
    );
    
    return await axios(config);
};


/**
 * @description Create a new record.
 * 
 * @param project_pk A primary key of a reference tree.
 * @param record An project object.
 */
const create = async (
    access_token: string, project_pk: uuid, record: BaseTrees
): Promise<CreatedTrees> => {
    
    let config: CustomRequestConfig = provideTreesUrl(
        "POST", access_token, project_pk, { data: record }
    );
    
    return await axios(config);
};


/**
 * @description Update an existent record.
 * 
 * @param project_pk A primary key of a reference tree.
 * @param record An project object.
 */
const update = async (
    access_token: string, project_pk: uuid, record: CreatedTrees
): Promise<CreatedTrees> => {
    
    let config: CustomRequestConfig = provideTreesUrl(
        "PUT", access_token, project_pk, { data: record }
    );
    
    return await axios(config);
};


/**
 * @description Delete a single record.
 * 
 * @param project_pk A primary key of a reference tree.
 * @param id The uuid of the records to be deleted.
 */
const deleteRecord = async (
    access_token: string, project_pk: uuid, id: uuid
): Promise<any> => {
    
    let config: CustomRequestConfig = provideTreesUrl(
        "DELETE", access_token, project_pk, { id: id }
    );
    
    return await axios(config);
};


/**
 * @description Get genes given a search term.
 * 
 * @param term A string to filter results.
 */
const searchGene = async (
    term: string
): Promise<{ data: GeneListObjects }> => {
    
    let config: CustomRequestConfig = provideGeneSearchUrl(term);
    
    return await axios(config);
};


/**
 * @description Get all leaves of a specified tree.
 * 
 * @param project_pk A primary key of a reference tree.
 * @param id The uuid of the records to be deleted.
 */
const getLeaves = async (project_pk: uuid, id: uuid): Promise<any> => {
    
    let config: CustomRequestConfig = provideGetLeavesUrl(
        project_pk, { id: id }
    );
    
    return await axios(config);
};


/**
 * @description Map tree clades to database representations.
 * 
 * @param project_pk A primary key of a reference tree.
 * @param id The uuid of the target tree.
 * @param data An array containing outgroups as strings.
 */
const mapClades = async (
    access_token: string, project_pk: uuid, id: uuid, data: Array<string>
): Promise<any> => {
    
    let config: CustomRequestConfig = provideMapCladesUrl(
        access_token, project_pk, {id: id, data: { outgroup_list: data }
    });
    
    return await axios(config);
};


/**
 * @description Test outgroup monophyletism.
 * 
 * @param project_pk A primary key of a reference tree.
 * @param id The uuid of the target tree.
 * @param data An array containing outgroups as strings.
 */
const testClade = async (
    access_token: string, project_pk: uuid, id: uuid, data: Array<string>
): Promise<any> => {
    
    let config: CustomRequestConfig = provideTestCladesUrl(
        access_token, project_pk, { id: id, data: { outgroup_list: data } 
    });
    
    return await axios(config);
};


/**
 * @description Send multiple sequence alignment to upload.
 * 
 * @param id The uuid of the target tree.
 * @param data A fasta file as a string.
 */
const uploadAlignment = async (
    access_token: string, id: uuid, data: string
): Promise<any> => {
    
    let config: CustomRequestConfig = provideUploadAlignmentUrl(
        access_token, { id: id, data: { fasta: data }
    });
    
    return await axios(config);
};


const mapSequenceFeatures = async (
    access_token: string, tree_pk: uuid
): Promise<any> => {
    
    let config: CustomRequestConfig = provideSequenceFeatureGenerationUrl(
        access_token, tree_pk
    );
    
    return await axios(config);
};


const listSequenceFeatures = async (
    access_token: string, project_pk: uuid
): Promise<any> => {
    
    let config: CustomRequestConfig = provideSequenceFeatureListUrl(
        access_token, project_pk
    );
    
    return await axios(config);
};


export const treesServices = {
    list,
    get,
    create,
    update,
    deleteRecord,
    searchGene,
    getLeaves,
    mapClades,
    testClade,
    uploadAlignment,
    mapSequenceFeatures,
    listSequenceFeatures,
};
