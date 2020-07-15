export const NAVIGATION_OPEN_SIDEBAR = 'classeq/navigation/open-sidebar';
export const NAVIGATION_CLOSE_SIDEBAR = 'classeq/navigation/close-sidebar';
export const NAVIGATION_TOGGLE_SIDEBAR = 'classeq/navigation/toggle-sidebar';

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
