import React from 'react';
import { Navbar, NavbarToggler, Collapse, Nav } from 'reactstrap';
import { matchPath, NavLink, RouteComponentProps } from 'react-router-dom';
import { Breadcrumbs } from 'react-breadcrumbs-dynamic';

import PageLoader from '../PageLoader/PageLoader';
import ToggleSidebarButton from './components/ToggleSidebarButton';
import routes from '../../../views';


interface State {
  isOpen: any,
  handleSubmit: Function | any,
}


interface Props extends RouteComponentProps {
  toggleSidebar: boolean,
  isSidebarCollapsed: boolean,
}


export default class Header extends React.Component<Props, State> {


  public state: any;


  constructor(props: any) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }


  toggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };


  getPageTitle = () => {
    let path;
    let name;
    routes.map(async prop => {
      if (matchPath(this.props.location.pathname, {
          path: prop.path,
          exact: true,
          strict: false
        })
      ) {
        name = prop.name;
        path = prop.path;
      }
      return null;
    });
    return {
      name: name,
      path: path,
    };
  };


  render() {
    return (
      <header className="app-header">
        <SkipToContentLink focusId="primary-content" />
        <div className="top-nav">
          <Navbar color="faded" light expand="md">
            <ToggleSidebarButton
              toggleSidebar={this.props.toggleSidebar}
              isSidebarCollapsed={this.props.isSidebarCollapsed}
            />
            <div className="page-heading">
              <small className="float-left">
                <Breadcrumbs
                  separator={<span className="text-muted"> / </span>}
                  item={NavLink}
                  finalItem={'span'}
                  finalProps={{
                    style: { color: 'black' }
                  }}
                />
              </small>
            </div>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mx-auto px-auto" navbar>
                {this.props.children}
              </Nav>
            </Collapse>
            <PageLoader />
          </Navbar>
        </div>
      </header>
    );
  }
}


const SkipToContentLink = ({ focusId }: any) => {
  return (
    // @ts-ignore
    <a href={`#${focusId}`} tabIndex="1" className="skip-to-content">
      Skip to Content
    </a>
  );
};
