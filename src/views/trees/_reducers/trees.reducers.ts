import { treesConstants } from './trees.constants';
import { TreesListObjects, BaseTrees, CreatedTrees } from '../../../_helpers/url-providers';


// *******************
// Initial state objects.
// *******************


const treesListInitialState: TreesListObjects = {
    results: [],
    pending: false,
    error: null,
};


// TODO: Create reducer for records creation.
/* const treesBaseInitialState: BaseTrees = {
    record: {},
    pending: false,
    error: null,
}; */


const treesCreatedInitialState: CreatedTrees = {
    record: {},
    pending: false,
    error: null,
};


// *******************
// Reducers.
// *******************


export const treesListReducer = (state = treesListInitialState, action: any) => {
    switch (action.type) {

        case treesConstants.LIST_PENDING:
            return {
                ...state,
                pending: action.pending
            };

        case treesConstants.LIST_SUCCESS:
            return {
                ...state,
                results: action.results
            };

        case treesConstants.LIST_FAIL:
            return {
                ...state,
                error: action.error
            };

        case treesConstants.UPDATE_PENDING:
            return {
                ...state,
                pending: action.pending
            };

        case treesConstants.UPDATE_SUCCESS:

            const results = state.results.map((item, index) => (
                item.uuid === action.record.uuid
                    ? state.results[index] = action.record
                    : item
            ));

            return {
                ...state,
                results: results
            };

        case treesConstants.UPDATE_FAIL:
            return {
                ...state,
                error: action.error
            };

        default:
            return state;

    }
};


export const treesDetailsReducer = (state = treesCreatedInitialState, action: any) => {
    switch (action.type) {

        case treesConstants.DETAILS_PENDING:
            return {
                ...state,
                pending: action.pending
            };

        case treesConstants.DETAILS_SUCCESS:
            return {
                ...state,
                record: { ...state.record, ...action.record }
            }

        case treesConstants.DETAILS_FAIL:
            return {
                ...state,
                error: action.error
            }

        default:
            return state;
    }
};
