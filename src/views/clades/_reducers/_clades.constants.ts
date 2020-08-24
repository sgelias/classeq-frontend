const cladesListConstants = {
    LIST_PENDING: 'CLADES_LIST_PENDING',
    LIST_SUCCESS: 'CLADES_LIST_SUCCESS',
    LIST_FAIL: 'CLADES_LIST_FAIL',
};


const cladesDetailsConstants = {
    DETAILS_PENDING: 'CLADES_DETAILS_PENDING',
    DETAILS_SUCCESS: 'CLADES_DETAILS_SUCCESS',
    DETAILS_FAIL: 'CLADES_DETAILS_FAIL',
};


export const cladesConstants = {
    ...cladesListConstants,
    ...cladesDetailsConstants,
};