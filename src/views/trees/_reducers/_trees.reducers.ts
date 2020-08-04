import { treesConstants } from './_trees.constants';
import { TreesListObjects, CreatedTrees } from '../../../_helpers/_url-providers';


// *******************
// Initial state objects.
// *******************


interface CreatedTreesReducer {
    record: CreatedTrees,
    pending: boolean,
    error: any,
};


const treesListInitialState: TreesListObjects = {
    results: [],
    pending: false,
    error: null,
};


const treesCreatedInitialState: CreatedTreesReducer = {
    record: {},
    pending: false,
    error: null,
};


// *******************
// Reducers.
// *******************


export const treesListReducer = (state = treesListInitialState, action: any) => {
    switch (action.type) {

        /* List cases */
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
        
        
        /* Update cases */
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
        
        
        /* Create cases */
        case treesConstants.CREATE_PENDING:
            return {
                ...state,
                pending: action.pending
            };

        case treesConstants.CREATE_SUCCESS:
            return {
                ...state,
                records: [ ...state.results, ...action.results ],
            };

        case treesConstants.CREATE_FAIL:
            return {
                ...state,
                error: action.error
            }


        /* Default */
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
