import { NAVIGATION_OPEN_SIDEBAR, NAVIGATION_CLOSE_SIDEBAR, NAVIGATION_TOGGLE_SIDEBAR } from './types';


export const navigationOpenSidebar = async () => {
    return ({
        type: NAVIGATION_OPEN_SIDEBAR
    });
};


export const navigationCloseSidebar = async () => {
    return ({
        type: NAVIGATION_CLOSE_SIDEBAR,
    });
};


export const navigationToggleSidebar = async () => {
    return dispatch({
        type: NAVIGATION_TOGGLE_SIDEBAR,
    });
};
