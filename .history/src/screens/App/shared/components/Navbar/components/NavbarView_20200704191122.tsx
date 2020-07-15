import React from 'react';


const Navbar: React.SFC = (props: any) => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="row justify-content-between col-12">
            <div className="col-9 pl-0 navbar-brand">
                Logo
            </div>
            <div className="col-2">
                <button
                    className="navbar-toggler"
                    onClick={ props.toggleSidebar }>
                    <span className="navbar-toggler-icon" />
                </button>
            </div>

            {props.errorMessage && (
                <div
                    className="alert alert-danger col-12 col-lg-12 mt-2"
                    role="alert">
                    { props.errorMessage }
                </div>
            )}
        </div>
    </nav>
);


Navbar.defaultProps = {
    //errorMessage: '',
    toogleSidebar: false,
};


export default Navbar;
