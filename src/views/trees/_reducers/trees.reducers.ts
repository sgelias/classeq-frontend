import { treesConstants } from './trees.constants';
import { TreesListObjects } from '../../../_helpers/url-providers';
import { compose } from 'redux';


const initialState: TreesListObjects = {
    results: [],
    pending: false,
    error: null,
};


const treesListReducers = (state = initialState, action: any) => {
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

        default:
            return state;

    }
};


export const treesReducers = compose(
    treesListReducers
);
