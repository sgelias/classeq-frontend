import React from 'react';
import { CardSubtitle, CardBody, CardHeader, CardText, Col, Row, Card } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { Dates, UserCredentials } from '../../../shared/index';
import { CreatedProject } from '../../../../_helpers/url-providers';


const ProjectsDetailsView = (props: CreatedProject) => {

    return (
        <Row>
            <Col md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 2 }}>
                <Card>
                    <CardHeader>
                        <h3>
                            {props.title}&nbsp;&nbsp;&nbsp;
                            <NavLink to={`${props.url}/edit`} >
                                <i className="fa fa-pencil"></i>
                            </NavLink>
                        </h3>
                    </CardHeader>
                    <CardBody>
                        <CardSubtitle>{props.description}</CardSubtitle>
                        <hr/>
                        <CardText>
                            <UserCredentials user={props.user} /><br />
                            <Dates created={props.created} updated={props.updated} />
                        </CardText>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}


export default ProjectsDetailsView;