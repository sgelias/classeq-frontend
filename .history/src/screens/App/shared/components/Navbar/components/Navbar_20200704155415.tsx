import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavbarView from './NavbarView';
import { navigationToggleSidebar } from '../reducers/actions';


export class Navbar extends Component {

    constructor(props: any) {
        super(props);

        this.state = {
            menuIsOpen: false,
        };
    }

    static propTypes = {
        //errorMessage: PropTypes.string,
        navigationToggleSidebar: PropTypes.func,
    };

    render() {
        return (
            <NavbarView
                toogleSidebar={ this.props.navigationToggleSidebar }
            />
        );
    }
}

const mapStateProps = (state: any) => ({
    errorMessage: state.errorMessage,
})

const mapDispatchToProps = {
    navigationToggleSidebar,
}

export default connect(
    mapStateProps,
    mapDispatchToProps,
)(Navbar);
