import React from 'react';
import { connect } from 'react-redux';

import NavbarView from './NavbarView';
import { navigationToggleSidebar } from '../reducers/actions';


export interface NavbarProps {
    toogleSidebar: boolean,
    errorMessage: string,
}


export class Navbar extends React.Component<NavbarProps> {

    public render() {
        return (
            <NavbarView />
        );
    }
}


interface SidebarProps {
    toogleSidebar: boolean
}


const mapStateProps = (state: any) => ({
    //errorMessage: state.errorMessage,
})


const mapDispatchToProps = {
    navigationToggleSidebar,
}

export default connect(
    mapStateProps,
    mapDispatchToProps,
)(Navbar);
