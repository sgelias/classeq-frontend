import React from 'react';
import { connect } from 'react-redux';

import NavbarView from './NavbarView';
import { navigationToggleSidebar } from '../reducers/actions';


export type NavbarProps = {
    toogleSidebar: boolean,
    errorMessage: string,
}

NavbarState


export class Navbar extends React.Component<NavbarProps> {

    state

    public render() {
        return (
            <NavbarView />
        );
    }
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
