const projectsListConstants = {
    LIST_PENDING: 'PROJECTS_LIST_PENDING',
    LIST_SUCCESS: 'PROJECTS_LIST_SUCCESS',
    LIST_FAIL: 'PROJECTS_LIST_FAIL',
};


const projectsDetailsConstants = {
    DETAILS_PENDING: 'PROJECTS_DETAILS_PENDING',
    DETAILS_SUCCESS: 'PROJECTS_DETAILS_SUCCESS',
    DETAILS_FAIL: 'PROJECTS_DETAILS_FAIL',
};


const projectsUpdateConstants = {
    UPDATE_PENDING: 'PROJECTS_UPDATE_PENDING',
    UPDATE_SUCCESS: 'PROJECTS_UPDATE_SUCCESS',
    UPDATE_FAIL: 'PROJECTS_UPDATE_FAIL',
};


const projectsCreateConstants = {
    CREATE_PENDING: 'PROJECTS_CREATE_PENDING',
    CREATE_SUCCESS: 'PROJECTS_CREATE_SUCCESS',
    CREATE_FAIL: 'PROJECTS_CREATE_FAIL',
};


export const projectsConstants = {
    ...projectsListConstants,
    ...projectsDetailsConstants,
    ...projectsUpdateConstants,
    ...projectsCreateConstants,
};
