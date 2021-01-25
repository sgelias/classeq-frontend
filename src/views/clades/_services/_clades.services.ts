import axios from 'axios';
import { v4 as uuid } from 'uuid/interfaces';

import { cladesActions as ca } from '../_reducers/_clades.actions';
import {
    CreatedClades,
    CustomRequestConfig,
    ListResponseInterface,
    provideCladesUrl,
    provideNodesDescriptionUrl,
    provideNodeClassifierDescriptionUrl,
    provideSingleCladeTrainUrl,
    provideSingleCladeTrainStatusUrl,
    provideNodeAnnotationCreateUrl,
    provideGetNodeListUrl,
    provideNodeAnnotationDeleteUrl,
    provideGetNodeByIdUrl,
} from "../../../_helpers/_url-providers";


/**
 * List all records.
 * 
 * @see `ListResponseInterface`
 * @param tree_pk A primary key of a reference tree.
 * @param dispacher A dispach object of redux.
 * @param params An object of type ListResponseInterface.
 */
const listClades = async (
    access_token: string, tree_pk: uuid, dispacher: any, 
    params?: ListResponseInterface
): Promise<any> => {
    
    let config: CustomRequestConfig = provideCladesUrl(
        "GET", access_token, tree_pk, { query_params: params }
    );

    await dispacher(ca.cladesListPending(true));
    await axios(config)
        .then(async res => {
            await dispacher(ca.cladesListSuccess(res.data));
            await dispacher(ca.cladesListPending(false));
        })
        .catch(err => dispacher(ca.cladesListFail(err)));

    return await axios(config);
};


/**
 * Get a single record.
 * 
 * @see `CustomRequestConfig`
 * @see `CreatedClades`
 * @param tree_pk A primary key of a reference tree.
 * @param id The clade primary key.
 */
const getClade = async (
    access_token: string, tree_pk: uuid, id: uuid
): Promise<{ data: CreatedClades }> => {
    
    let config: CustomRequestConfig = provideCladesUrl(
        "GET", access_token, tree_pk, { id: id }
    );
    
    return await axios(config);
};


const getNodeDescription = async (
    access_token: string, clade: uuid
): Promise<any> => {
    
    let config: CustomRequestConfig = provideNodesDescriptionUrl(
        "GET", access_token, clade
    );
    
    return await axios(config);
};


const listNodeClassifierDescriptions = async (
    access_token: string, tree: uuid
): Promise<any> => {
    
    let config: CustomRequestConfig = provideNodeClassifierDescriptionUrl(
        "GET", access_token, tree
    );
    
    return await axios(config);
};


const startSingleCladeTrain = async (
    access_token: string, source_clade: uuid, feature_set: uuid
): Promise<any> => {
    
    let config: CustomRequestConfig = provideSingleCladeTrainUrl(
        access_token, source_clade, feature_set
    );
    
    return await axios(config);
};


const getSingleCladeTrainStatus = async (
    access_token: string, task_id: uuid
): Promise<any> => {
    
    let config: CustomRequestConfig = provideSingleCladeTrainStatusUrl(
        access_token, task_id
    );
    
    return await axios(config);
};


const getNodeList = async (
    access_token: string, term: string
): Promise<any> => {
    
    let config: CustomRequestConfig = provideGetNodeListUrl(
        access_token, term
    );
    
    return await axios(config);
};


const getNodeById = async (
    access_token: string, node: number
): Promise<any> => {
    
    let config: CustomRequestConfig = provideGetNodeByIdUrl(
        access_token, node
    );
    
    return await axios(config);
};


const annotateClade = async (
    access_token: string, graph_node: number, clade_pk: uuid, tree_pk: uuid, 
    project_pk: uuid
): Promise<any> => {
    
    let config: CustomRequestConfig = provideNodeAnnotationCreateUrl(
        access_token, graph_node, clade_pk, tree_pk, project_pk
    );
    
    return await axios(config);
};


const deleteAnnotatedClade = async (
    access_token: string, graph_node: number, clade_pk: uuid
): Promise<any> => {
    
    let config: CustomRequestConfig = provideNodeAnnotationDeleteUrl(
        access_token, graph_node, clade_pk
    );
    
    return await axios(config);
};


export const cladesServices = {
    listClades,
    getClade,
    getNodeDescription,
    listNodeClassifierDescriptions,
    startSingleCladeTrain,
    getSingleCladeTrainStatus,
    getNodeList,
    getNodeById,
    annotateClade,
    deleteAnnotatedClade,
};
