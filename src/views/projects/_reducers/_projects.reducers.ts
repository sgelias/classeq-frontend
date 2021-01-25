import { projectsConstants } from './_projects.constants';
import { 
    CreatedProject,
    ProjectsListObjects 
} from '../../../_helpers/_url-providers';


// *******************
// Initial state objects.
// *******************


interface CreatedProjectsReducer {
    record: CreatedProject,
    pending: boolean,
    error: any,
};


const projectsListInitialState: ProjectsListObjects = {
    results: [],
    pending: false,
    error: null,
};


const projectsCreatedInitialState: CreatedProjectsReducer = {
    record: {},
    pending: false,
    error: null,
};


// *******************
// Reducers.
// *******************


export const projectsListReducer = (
    state = projectsListInitialState, action: any
) => {
    switch (action.type) {

        /* List cases */
        case projectsConstants.LIST_PENDING:
            return {
                ...state,
                pending: action.pending
            };

        case projectsConstants.LIST_SUCCESS:
            return {
                ...state,
                results: action.results
            };

        case projectsConstants.LIST_FAIL:
            return {
                ...state,
                error: action.error
            };
        
        
        /* Update cases */
        case projectsConstants.UPDATE_PENDING:
            return {
                ...state,
                pending: action.pending
            };

        case projectsConstants.UPDATE_SUCCESS:

            const results = state.results.map((item, index) => (
                item.uuid === action.record.uuid
                    ? state.results[index] = action.record
                    : item
            ));

            return {
                ...state,
                results: results
            };

        case projectsConstants.UPDATE_FAIL:
            return {
                ...state,
                error: action.error
            };
        
        
        /* Create cases */
        case projectsConstants.CREATE_PENDING:
            return {
                ...state,
                pending: action.pending
            };

        case projectsConstants.CREATE_SUCCESS:
            return {
                ...state,
                records: [ ...state.results, ...action.results ],
            };

        case projectsConstants.CREATE_FAIL:
            return {
                ...state,
                error: action.error
            }


        /* Default */
        default:
            return state;

    }
};


export const projectsDetailsReducer = (
    state = projectsCreatedInitialState, action: any
) => {
    switch (action.type) {

        case projectsConstants.DETAILS_PENDING:
            return {
                ...state,
                pending: action.pending
            };

        case projectsConstants.DETAILS_SUCCESS:
            return {
                ...state,
                record: { ...state.record, ...action.record }
            }

        case projectsConstants.DETAILS_FAIL:
            return {
                ...state,
                error: action.error
            }

        default:
            return state;
    }
};
