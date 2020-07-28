const treesListConstants = {
    LIST_PENDING: 'TREES_LIST_PENDING',
    LIST_SUCCESS: 'TREES_LIST_SUCCESS',
    LIST_FAIL: 'TREES_LIST_FAIL',
};


const treesDetailsConstants = {
    DETAILS_PENDING: 'TREES_DETAILS_PENDING',
    DETAILS_SUCCESS: 'TREES_DETAILS_SUCCESS',
    DETAILS_FAIL: 'TREES_DETAILS_FAIL',
};


const treesUpdateConstants = {
    UPDATE_PENDING: 'TREES_UPDATE_PENDING',
    UPDATE_SUCCESS: 'TREES_UPDATE_SUCCESS',
    UPDATE_FAIL: 'TREES_UPDATE_FAIL',
};


export const treesConstants = {
    ...treesListConstants,
    ...treesDetailsConstants,
    ...treesUpdateConstants,
};
