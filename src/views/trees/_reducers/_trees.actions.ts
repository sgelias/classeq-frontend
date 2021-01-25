import { treesConstants } from './_trees.constants';
import { CreatedTrees } from '../../../_helpers/_url-providers';


const treesListActions = {

    treesListPending(pending: boolean) {
        return { type: treesConstants.LIST_PENDING, pending: pending }
    },

    treesListSuccess(results: Array<CreatedTrees>) {
        return { type: treesConstants.LIST_SUCCESS, results: results }
    },

    treesListFail(error: any) {
        return { type: treesConstants.LIST_FAIL, error: error }
    },
};


const treesSingleActions = {

    treesDetailsPending(pending: boolean) {
        return { type: treesConstants.DETAILS_PENDING, pending: pending }
    },

    treesDetailsSuccess(record: CreatedTrees) {
        return { type: treesConstants.DETAILS_SUCCESS, record: record }
    },

    treesDetailsFail(error: any) {
        return { type: treesConstants.DETAILS_FAIL, error: error }
    },
};


const treesUpdateActions = {

    treesUpdatePending(pending: boolean) {
        return { type: treesConstants.UPDATE_PENDING, pending: pending }
    },

    treesUpdateSuccess(record: CreatedTrees) {
        return { type: treesConstants.UPDATE_SUCCESS, record: record }
    },

    treesUpdateFail(error: any) {
        return { type: treesConstants.UPDATE_FAIL, error: error }
    },
};


const treesCreateActions = {

    treesCreatePending(pending: boolean) {
        return { type: treesConstants.CREATE_PENDING, pending: pending }
    },

    treesCreateSuccess(records: Array<CreatedTrees>) {
        return { type: treesConstants.CREATE_SUCCESS, records: records }
    },

    treesCreateFail(error: any) {
        return { type: treesConstants.CREATE_FAIL, error: error }
    },
}


export const treesActions = {
    ...treesListActions,
    ...treesSingleActions,
    ...treesUpdateActions,
    ...treesCreateActions,
};
