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
const listClades = async (tree_pk: uuid, dispacher: any, params?: ListResponseInterface): Promise<any> => {
    let config: CustomRequestConfig = provideCladesUrl("GET", tree_pk, { query_params: params });

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
const getClade = async (tree_pk: uuid, id: uuid): Promise<{ data: CreatedClades }> => {
    let config: CustomRequestConfig = provideCladesUrl("GET", tree_pk, { id: id });
    return await axios(config);
};


const getNodeDescription = async (clade: uuid): Promise<any> => {
    let config: CustomRequestConfig = provideNodesDescriptionUrl("GET", clade);
    return await axios(config);
};


const listNodeClassifierDescriptions = async (tree: uuid): Promise<any> => {
    let config: CustomRequestConfig = provideNodeClassifierDescriptionUrl("GET", tree);
    return await axios(config);
};


const startSingleCladeTrain = async (source_clade: uuid, feature_set: uuid): Promise<any> => {
    let config: CustomRequestConfig = provideSingleCladeTrainUrl(source_clade, feature_set);
    return await axios(config);
};


export const getNodeList = async (term: string) => {
    let config: CustomRequestConfig = provideGetNodeListUrl(term);
    return await axios(config);
};


const getNodeById = async (node: number) => {
    let config: CustomRequestConfig = provideGetNodeByIdUrl(node);
    return await axios(config);
};


const annotateClade = async (graph_node: number, clade_pk: uuid, tree_pk: uuid, project_pk: uuid) => {
    let config: CustomRequestConfig = provideNodeAnnotationCreateUrl(graph_node, clade_pk, tree_pk, project_pk);
    return await axios(config);
};


const deleteAnnotatedClade = async (graph_node: number, clade_pk: uuid) => {
    let config: CustomRequestConfig = provideNodeAnnotationDeleteUrl(graph_node, clade_pk);
    return await axios(config);
};


export const cladesServices = {
    listClades,
    getClade,
    getNodeDescription,
    listNodeClassifierDescriptions,
    startSingleCladeTrain,
    getNodeList,
    getNodeById,
    annotateClade,
    deleteAnnotatedClade,
};
