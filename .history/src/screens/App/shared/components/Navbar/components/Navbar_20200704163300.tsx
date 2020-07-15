import React from 'react';
import PropTypes from 'prop-types';
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
            <NavbarView toogleSidebar={ false }/>
        );
    }
}


interface SidebarProps {
    toogleSidebar: any
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
