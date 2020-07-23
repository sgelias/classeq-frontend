import React, { Component } from 'react';
import { Row, Button, Col, Card, CardBody, CardFooter, CardText } from 'reactstrap';
import { NavLink, RouteComponentProps } from 'react-router-dom';

import { BreadcrumbsItemBuilder } from '../../../shared/BreadcrumbsItemBuilder';
import { ProjectsListObjects } from '../../../../_helpers/url-providers';
import { projectServices as ps } from '../_projects.services';


interface Props extends RouteComponentProps {}


export default class ProjectsList extends Component<Props, ProjectsListObjects> {


    public state: Readonly<ProjectsListObjects> = {
        results: []
    }


    componentDidMount() {
        ps.list().then(res => {
            this.setState({ results: res.data.results })
        });
    }


    render() {
        const { match } = this.props;
        
        return (
            <div>
                <BreadcrumbsItemBuilder url={match.url} params={match.params} />
                    <Row>
                    {
                        this.state.results.map((item, index) => (
                            <Col md={4} key={index}>
                                <Card>
                                    <CardBody>
                                        <NavLink to={`${match.url}/${item.uuid}`} activeClassName="active">
                                            <h3>
                                                { item.title }
                                            </h3>
                                        </NavLink>
                                        <CardText>
                                            { item.description }
                                        </CardText>
                                        <div>
                                            <Creation created={item.created} />
                                        </div>
                                    </CardBody>
                                    <CardFooter>
                                        <Button color="success">
                                            Edit
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        )
    }
}


function Creation(props: any) {
    const created: Date | null = props.created;
    if (created) {
        return (
            <small className="text-muted">
                <span>Created in: </span>
                {new Date(created).toLocaleDateString("en-US")}
            </small>
        )
    } else {
        return <small></small>
    }
}
