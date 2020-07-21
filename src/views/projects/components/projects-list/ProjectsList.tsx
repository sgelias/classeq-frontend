import React, { Component } from 'react';
import { Row, Button, Col, Card, CardBody, CardFooter, CardHeader } from 'reactstrap';

import { ProjectsListObjects } from '../../../../_helpers/url-providers';
import { projectServices as ps } from '../_projects.services';


export default class ProjectsList extends Component<ProjectsListObjects, {}> {


    state: Readonly<ProjectsListObjects> = {
        results: []
    }


    componentDidMount() {
        ps.getAll().then(res => {
            this.setState({ results: res.data.results })
        });
    }


    render() {
        return (
            <Row>
                {
                    this.state.results.map((item, index) => (
                        <Col md={4} key={index}>
                            <Card>
                                <CardHeader>
                                    {item.title}
                                </CardHeader>
                                <CardBody>
                                    {item.description}
                                    <div>
                                        <small>
                                            <span>Created in: </span>
                                            {
                                                new Date(item?.created)
                                                    .toLocaleDateString("en-US")
                                            }
                                        </small>
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    <Button color="success">Add</Button>
                                </CardFooter>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        )
    }
}
