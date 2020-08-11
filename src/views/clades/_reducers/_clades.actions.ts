import { cladesConstants, sequencesConstants } from './_clades.constants';
import { CreatedClades, CreatedSequences } from '../../../_helpers/_url-providers';


const cladesListActions = {

    cladesListPending(pending: boolean) {
        return { type: cladesConstants.LIST_PENDING, pending: pending }
    },

    cladesListSuccess(results: Array<CreatedClades>) {
        return { type: cladesConstants.LIST_SUCCESS, results: results }
    },

    cladesListFail(error: any) {
        return { type: cladesConstants.LIST_FAIL, error: error }
    },
};


const cladesSingleActions = {

    cladesDetailsPending(pending: boolean) {
        return { type: cladesConstants.DETAILS_PENDING, pending: pending }
    },

    cladesDetailsSuccess(record: CreatedClades) {
        return { type: cladesConstants.DETAILS_SUCCESS, record: record }
    },

    cladesDetailsFail(error: any) {
        return { type: cladesConstants.DETAILS_FAIL, error: error }
    },
};


export const cladesActions = {
    ...cladesListActions,
    ...cladesSingleActions,
};


const sequencesListActions = {

    sequencesListPending(pending: boolean) {
        return { type: sequencesConstants.LIST_PENDING, pending: pending }
    },

    sequencesListSuccess(results: Array<CreatedSequences>) {
        return { type: sequencesConstants.LIST_SUCCESS, results: results }
    },

    sequencesListFail(error: any) {
        return { type: sequencesConstants.LIST_FAIL, error: error }
    },
};


export const sequencesActions = {
    ...sequencesListActions,
};
