import React from 'react';
import { CardSubtitle, CardBody, CardHeader, CardText, Col, Row, Card } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Dates, UserCredentials } from '../../../shared/index';
import { CreatedProject } from '../../../../_helpers/url-providers';


const ProjectsDetailsView = (props: CreatedProject) => {

    return (
        <Row>
            <Col 
                md={{ size: 12, offset: 0 }} 
                lg={{ size: 10, offset: 1 }} 
                xl={{ size: 8, offset: 2 }}
            >
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
}


export default ProjectsDetailsView;