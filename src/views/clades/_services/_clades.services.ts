import axios from 'axios';
import { v4 as uuid } from 'uuid/interfaces';

import { cladesActions as ca } from '../_reducers/_clades.actions';
import {
    CreatedClades,
    CustomRequestConfig,
    ListResponseInterface,
    provideCladesUrl,
} from "../../../_helpers/_url-providers";


/**
 * List all records.
 * 
 * @see `ListResponseInterface`
 * @param tree_pk A primary key of a reference tree.
 * @param dispacher A dispach object of redux.
 * @param params An object of type ListResponseInterface.
 */
const list = async (tree_pk: uuid, dispacher: any, params?: ListResponseInterface): Promise<any> => {
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
 * @see `ListResponseInterface`
 * @param tree_pk A primary key of a reference tree.
 * @param id The clade primary key.
 */
const get = async (tree_pk: uuid, id: uuid): Promise<{ data: CreatedClades }> => {
    let config: CustomRequestConfig = provideCladesUrl("GET", tree_pk, { id: id });
    return await axios(config);
};


export const cladesServices = {
    list,
    get,
};