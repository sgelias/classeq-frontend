import { cladesConstants } from './_clades.constants';
import { CladesListObjects, CreatedClades } from '../../../_helpers/_url-providers';


// *******************
// Initial state objects.
// *******************


interface CreatedCladesReducer {
    record: CreatedClades,
    pending: boolean,
    error: any,
}


const cladesListInitialState: CladesListObjects = {
    results: [],
    pending: false,
    error: null,
};


const cladesCreatedInitialState: CreatedCladesReducer = {
    record: {},
    pending: false,
    error: null,
};


// *******************
// Reducers.
// *******************


export const cladesListReducer = (state = cladesListInitialState, action: any) => {
    switch (action.type) {

        case cladesConstants.LIST_PENDING:
            return {
                ...state,
                pending: action.pending
            };

        case cladesConstants.LIST_SUCCESS:
            return {
                ...state,
                results: action.results
            };

        case cladesConstants.LIST_FAIL:
            return {
                ...state,
                error: action.error
            };

        default:
            return state;

    }
};


export const cladesDetailsReducer = (state = cladesCreatedInitialState, action: any) => {
    switch (action.type) {

        case cladesConstants.DETAILS_PENDING:
            return {
                ...state,
                pending: action.pending
            };

        case cladesConstants.DETAILS_SUCCESS:
            return {
                ...state,
                record: { ...state.record, ...action.record }
            }

        case cladesConstants.DETAILS_FAIL:
            return {
                ...state,
                error: action.error
            }

        default:
            return state;
    }
};
