import { projectsConstants } from './_projects.constants';
import { CreatedProject } from '../../../_helpers/_url-providers';


const projectsListActions = {

    projectsListPending(pending: boolean) {
        return { type: projectsConstants.LIST_PENDING, pending: pending }
    },

    projectsListSuccess(results: Array<CreatedProject>) {
        return { type: projectsConstants.LIST_SUCCESS, results: results }
    },

    projectsListFail(error: any) {
        return { type: projectsConstants.LIST_FAIL, error: error }
    },
};


const projectsSingleActions = {

    projectsDetailsPending(pending: boolean) {
        return { type: projectsConstants.DETAILS_PENDING, pending: pending }
    },

    projectsDetailsSuccess(record: CreatedProject) {
        return { type: projectsConstants.DETAILS_SUCCESS, record: record }
    },

    projectsDetailsFail(error: any) {
        return { type: projectsConstants.DETAILS_FAIL, error: error }
    },
};


const projectsUpdateActions = {

    projectsUpdatePending(pending: boolean) {
        return { type: projectsConstants.UPDATE_PENDING, pending: pending }
    },

    projectsUpdateSuccess(record: CreatedProject) {
        return { type: projectsConstants.UPDATE_SUCCESS, record: record }
    },

    projectsUpdateFail(error: any) {
        return { type: projectsConstants.UPDATE_FAIL, error: error }
    },
};


const projectsCreateActions = {

    projectsCreatePending(pending: boolean) {
        return { type: projectsConstants.CREATE_PENDING, pending: pending }
    },

    projectsCreateSuccess(records: Array<CreatedProject>) {
        return { type: projectsConstants.CREATE_SUCCESS, records: records }
    },

    projectsCreateFail(error: any) {
        return { type: projectsConstants.CREATE_FAIL, error: error }
    },
}


export const projectsActions = {
    ...projectsListActions,
    ...projectsSingleActions,
    ...projectsUpdateActions,
    ...projectsCreateActions,
};
