const treesListConstants = {
    LIST_PENDING: 'TREES_LIST_PENDING',
    LIST_SUCCESS: 'TREES_LIST_SUCCESS',
    LIST_FAIL: 'TREES_LIST_FAIL',
};


const treesCreateConstants = {
    CREATE_PENDING: 'TREES_CREATE_PENDING',
    CREATE_SUCCESS: 'TREES_CREATE_SUCCESS',
    CREATE_FAIL: 'TREES_CREATE_FAIL'
};


const treesUpdateConstants = {
    UPDATE_PENDING: 'TREES_UPDATE_PENDING',
    UPDATE_SUCCESS: 'TREES_UPDATE_SUCCESS',
    UPDATE_FAIL: 'TREES_UPDATE_FAIL'
};


export const treesConstants = {
    ...treesListConstants,
    ...treesCreateConstants,
    ...treesUpdateConstants,
};
