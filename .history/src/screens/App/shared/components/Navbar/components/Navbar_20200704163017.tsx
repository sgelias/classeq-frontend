import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavbarView from './NavbarView';
import { navigationToggleSidebar } from '../reducers/actions';


export class Navbar extends React.Component {

    public render() {
        return (
            <NavbarView
                toogleSidebar={ this.props.navigationToggleSidebar }
            />
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
