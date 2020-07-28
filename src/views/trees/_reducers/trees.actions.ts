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


const treesCreateActions = {

    treesCreatePending(pending: boolean) {
        return { type: treesConstants.CREATE_PENDING, pending: pending }
    },

    treesCreateSuccess(tree: CreatedTrees) {
        return { type: treesConstants.CREATE_SUCCESS, tree: tree }
    },

    treesCreateFail(error: any) {
        return { type: treesConstants.CREATE_SUCCESS, error: error }
    },
};


export const treesActions = {
    ...treesListActions,
    ...treesCreateActions,
};
