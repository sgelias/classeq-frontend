import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from 'react-router-dom';

import { Card, CardBody, CardHeader, CardSubtitle, CardText, Col, Row } from 'reactstrap';
import { CreatedProject } from '../../../_helpers/_url-providers';
import { Dates, UserCredentials } from '../../shared/index';


export default (props: CreatedProject) => {

    return (
        <Row>
            <Col>
                <Card>
                    <CardHeader>
                        <h3>
                            <FontAwesomeIcon icon="project-diagram" size="xs" />
                            &nbsp;&nbsp;&nbsp;
                            {props.title}
                            &nbsp;&nbsp;&nbsp;
                            <NavLink to={`${props.url}/edit`} >
                                <FontAwesomeIcon icon="pencil-alt" size="xs" />
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
};