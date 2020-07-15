import * as types from './types';


const initialState = {
    sidebarIsOpen: false,
};


export default (
    state = initialState, 
    type: NavigationType
): typeof initialState => {
    switch (type) {
        case types.NAVIGATION_OPEN_SIDEBAR:
            return { sidebarIsOpen: true };

        case 'NAVIGATION_CLOSE_SIDEBAR':
            return { sidebarIsOpen: false };

        case 'NAVIGATION_TOGGLE_SIDEBAR':
            return { sidebarIsOpen: !state.sidebarIsOpen };

        default:
            return initialState;
    }
};
