import React from 'react';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { Col, Row, Card, CardBody, CardSubtitle, CardText, CardHeader } from 'reactstrap';

import { projectServices as ps } from '../_projects.services';
import { CreatedProject, User } from '../../../../_helpers/url-providers';
import { BreadcrumbsItemBuilder } from '../../../shared/BreadcrumbsItemBuilder';


interface State extends CreatedProject { }


export default class ProjectsDetails extends React.Component<RouteComponentProps, State> {


    public state: any;


    constructor(props: any) {
        super(props)

        this.state = {
            uuid: (this.props.match.params as any).rid
        };
    }


    componentDidMount() {
        ps.get(this.state.uuid)
            .then(res => this.setState(() => { return res.data }))
            .catch(() => console.log(this.state));
    };


    render() {
        const { match } = this.props;

        return (
            <div>
                <BreadcrumbsItemBuilder url={match.url} params={match.params} />
                <Row>
                    <Col md={{ size: 8, offset: 2 }}>
                        <Card>
                            <CardHeader>
                                <h3>
                                    {this.state.title}&nbsp;&nbsp;&nbsp;
                                    <NavLink to={`${match.url}/edit`} activeClassName="active">
                                        <i className="fa fa-pencil"></i>
                                    </NavLink>
                                </h3>
                            </CardHeader>
                            <CardBody>
                                <CardSubtitle>{this.state.description}</CardSubtitle>
                                <CardText>
                                    <UserCredentials user={this.state.user} /><br />
                                    <small className="text-muted">
                                        Created in&nbsp;
                                        {new Date(this.state.created).toLocaleDateString("en-US")},&nbsp;
                                        updated in&nbsp;
                                        {new Date(this.state.updated).toLocaleDateString("en-US")}.
                                    </small>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}


function UserCredentials(props: any) {
    const user: User = props.user;
    if (user?.first_name && user?.last_name) {
        return (
            <small>
                <span className="text-muted">Owner:&nbsp;</span>
                {`${user.first_name} ${user.last_name}`}
            </small>
        )
    } else {
        return (
            <small>
                <span className="text-muted">Owner:&nbsp;</span>
                {`${user?.username}`}
            </small>
        )
    }
}
