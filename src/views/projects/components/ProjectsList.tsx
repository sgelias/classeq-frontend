import React from 'react';
import { Row, Button, Col, Card, CardBody, CardFooter, CardText } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { RootStateOrAny, useSelector } from 'react-redux';

import { BreadcrumbsItemBuilder } from '../../shared';
import { CreatedProject } from '../../../_helpers/_url-providers';
import { projectServices as ps } from '../_services/_projects.services';
import { Dates } from '../../shared/index';
import { useAsyncEffect } from 'use-async-effect';
import { useCookies } from 'react-cookie';


export default () => {


    /**
	 * @description Create a read-only hook for cookies.
	 */
    const [cookie] = useCookies();
    
    
    /**
     * @description Set a listener for the projectsListReducer state.
     */
    const projects: Array<CreatedProject> = useSelector((state: RootStateOrAny) => (
        state.projectsListReducer //.results
    ));


    useAsyncEffect(() => {
        ps.list(cookie.pas_auth.access_token)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }, []);


    useAsyncEffect(() => {
        console.log(projects);
    }, []);


    return !projects ? null : (
        <div>
            <BreadcrumbsItemBuilder />
            <Row>
                {projects.map((item, index) => (
                    <Col md={4} key={index}>
                        <Card>
                            <CardBody>
                                <NavLink
                                    to={`${window.location.href}/${item.uuid}`}
                                    activeClassName="active"
                                >
                                    <h3>
                                        {item.title}
                                    </h3>
                                </NavLink>
                                <CardText>
                                    {item.description}
                                </CardText>
                                <Dates
                                    created={item.created}
                                    updated={item.updated}
                                />
                            </CardBody>
                            <CardFooter>
                                <Button color="success">
                                    Edit
                                </Button>
                            </CardFooter>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};
