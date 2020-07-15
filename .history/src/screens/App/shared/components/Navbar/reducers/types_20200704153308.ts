export const NAVIGATION_OPEN_SIDEBAR = 'NAVIGATION_OPEN_SIDEBAR';
export const NAVIGATION_CLOSE_SIDEBAR = 'NAVIGATION_CLOSE_SIDEBAR';
export const NAVIGATION_TOGGLE_SIDEBAR = 'NAVIGATION_TOGGLE_SIDEBAR';

interface OpenSidebar {
    type: typeof NAVIGATION_OPEN_SIDEBAR
}

interface CloseSidebar {
    type: typeof NAVIGATION_CLOSE_SIDEBAR
}

interface ToggleSidebar {
    type: typeof NAVIGATION_TOGGLE_SIDEBAR
}

export type NavigationType = OpenSidebar | CloseSidebar | ToggleSidebar;
