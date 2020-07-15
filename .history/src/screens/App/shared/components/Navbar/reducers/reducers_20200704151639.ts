import * as types from './types';
import { NavigationType } from './types';


const initialState = {
    sidebarIsOpen: false,
};


export default (
    state = initialState, 
    type: NavigationType
): void => {
    switch (type) {
        case NAVIGATION_OPEN_SIDEBAR:
            return { sidebarIsOpen: true };

        case types.NAVIGATION_CLOSE_SIDEBAR:
            return { sidebarIsOpen: false };

        case types.NAVIGATION_TOGGLE_SIDEBAR:
            return { sidebarIsOpen: !state.sidebarIsOpen };

        default:
            return initialState;
    }
};
