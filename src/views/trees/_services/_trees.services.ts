import axios from 'axios';
import { v4 as uuid } from 'uuid/interfaces';

import { treesActions as ta } from '../_reducers/_trees.actions';
import {
    BaseTrees,
    CreatedTrees,
    CustomRequestConfig,
    GeneListObjects,
    ListResponseInterface,
    provideTreesUrl,
    provideGeneSearchUrl,
    provideGetLeavesUrl,
    provideMapCladesUrl,
    provideTestCladesUrl,
    provideUploadAlignmentUrl,
} from "../../../_helpers/_url-providers";


/**
 * List all records.
 * 
 * @see `ListResponseInterface`
 * @param project_pk A primary key of a reference project.
 * @param dispacher A dispach object of redux.
 * @param params An object of type ListResponseInterface.
 */
const list = async (project_pk: uuid, dispacher: any, params?: ListResponseInterface): Promise<void> => {
    let config: CustomRequestConfig = provideTreesUrl("GET", project_pk, { query_params: params });

    await dispacher(ta.treesListPending(true));
    await axios(config)
        .then(async res => {
            await dispacher(ta.treesListSuccess(res.data.results));
            await dispacher(ta.treesListPending(false));
        })
        .catch(err => dispacher(ta.treesListFail(err)));
};


/**
 * Get a single record.
 * 
 * @see `ListResponseInterface`
 * @param project_pk A primary key of a reference tree.
 * @param id The tree primary key.
 */
const get = async (project_pk: uuid, id: uuid): Promise<{ data: CreatedTrees }> => {
    let config: CustomRequestConfig = provideTreesUrl("GET", project_pk, { id: id });
    return await axios(config);
};


/**
 * Create a new record.
 * 
 * @param project_pk A primary key of a reference tree.
 * @param record An project object.
 */
const create = async (project_pk: uuid, record: BaseTrees): Promise<CreatedTrees> => {
    let config: CustomRequestConfig = provideTreesUrl("POST", project_pk, { data: record });
    return await axios(config);
};


/**
 * Update an existent record.
 * 
 * @param project_pk A primary key of a reference tree.
 * @param record An project object.
 */
const update = async (project_pk: uuid, record: CreatedTrees): Promise<CreatedTrees> => {
    let config: CustomRequestConfig = provideTreesUrl("PUT", project_pk, { data: record });
    return await axios(config);
};


/**
 * Delete a single record.
 * 
 * @param project_pk A primary key of a reference tree.
 * @param id The uuid of the records to be deleted.
 */
const deleteRecord = async (project_pk: uuid, id: uuid): Promise<any> => {
    let config: CustomRequestConfig = provideTreesUrl("DELETE", project_pk, { id: id });
    return await axios(config);
};


/**
 * Get genes given a search term.
 * 
 * @param term A string to filter results.
 */
const searchGene = async (term: string): Promise<{ data: GeneListObjects }> => {
    let config: CustomRequestConfig = provideGeneSearchUrl(term);
    return await axios(config);
};


/**
 * Get all leaves of a specified tree.
 * 
 * @param project_pk A primary key of a reference tree.
 * @param id The uuid of the records to be deleted.
 */
const getLeaves = async (project_pk: uuid, id: uuid): Promise<any> => {
    let config: CustomRequestConfig = provideGetLeavesUrl(project_pk, { id: id });
    return await axios(config);
};


/**
 * Map tree clades to database representations.
 * 
 * @param project_pk A primary key of a reference tree.
 * @param id The uuid of the target tree.
 * @param data An array containing outgroups as strings.
 */
const mapClades = async (project_pk: uuid, id: uuid, data: Array<string>): Promise<any> => {
    let config: CustomRequestConfig = provideMapCladesUrl(project_pk, {
        id: id,
        data: {
            outgroup_list: data
        }
    });
    return await axios(config);
};


/**
 * Test outgroup monophyletism.
 * 
 * @param project_pk A primary key of a reference tree.
 * @param id The uuid of the target tree.
 * @param data An array containing outgroups as strings.
 */
const testClade = async (project_pk: uuid, id: uuid, data: Array<string>): Promise<any> => {
    let config: CustomRequestConfig = provideTestCladesUrl(project_pk, {
        id: id,
        data: { outgroup_list: data }
    });
    return await axios(config);
};


/**
 * Send multiple sequence alignment to upload.
 * 
 * @param id The uuid of the target tree.
 * @param data A fasta file as a string.
 */
const uploadAlignment = async (id: uuid, data: string): Promise<any> => {
    let config: CustomRequestConfig = provideUploadAlignmentUrl({
        id: id,
        data: { fasta: data }
    });
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
};
