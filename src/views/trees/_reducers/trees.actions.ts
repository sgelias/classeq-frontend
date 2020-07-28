import { treesConstants } from './trees.constants';
import { CreatedTrees } from '../../../_helpers/url-providers';


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


export const treesActions = {
    ...treesListActions,
    ...treesSingleActions,
    ...treesUpdateActions,
};
