import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import 'shared/assets/logo.svg'


const Navbar = (props: any) => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="row justify-content-between col-12">
            <div className="col-9 pl-0 navbar-brand">
                <Link to="/">
                    <img src={logo} alt="Home" className="brand" />
                </Link>
            </div>
            <div className="col-2">
                <button
                    className="navbar-toggler"
                    onClick={props.toggleSidebar}>
                    <span className="navbar-toggler-icon" />
                </button>
            </div>

            {props.errorMessage && (
                <div
                    className="alert alert-danger col-12 col-lg-12 mt-2"
                    role="alert">
                    {props.errorMessage}
                </div>
            )}
        </div>
    </nav>
);


Navbar.PropTypes = {
    errorMessage: PropTypes.string,
    toogleSidebar: PropTypes.func,
};


export default Navbar;