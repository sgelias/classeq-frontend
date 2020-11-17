import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAsyncEffect } from 'use-async-effect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCookies } from 'react-cookie';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { 
    Card, CardBody, CardHeader, CardSubtitle, CardText, Col, Row 
} from 'reactstrap';

import { BreadcrumbsItemBuilder, Dates, UserCredentials } from '../../shared';
import { CreatedProject } from '../../../_helpers/_url-providers';
import { TreesList } from '../../trees/index';
import { projectServices as ps } from '../_services/_projects.services';
import { projectsActions as pa } from '../_reducers/_projects.actions';


export default () => {


    /**
     * @description Set a dispatcher for state management.
     */
    const dispatch = useDispatch();


    /**
	 * @description Create a read-only hook for cookies.
	 */
    const [cookie] = useCookies();
    
    
    /**
     * @description Set a listener for the projectsDetailsReducer state.
     */
    const record: CreatedProject = useSelector((state: RootStateOrAny) => (
        state.projectsDetailsReducer.record
    ));


    useAsyncEffect(() => {
        dispatch(pa.projectsDetailsPending(true));
        record.uuid && ps.get(record.uuid, cookie.pas_auth.access_token)
            .then(res => dispatch(pa.projectsDetailsSuccess(res.data)))
            .then(() => dispatch(pa.projectsDetailsPending(false)))
            .catch(err => dispatch(pa.projectsDetailsFail(err)));
    }, []);


    return (
        <>
            <BreadcrumbsItemBuilder/>

            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <h3>
                                <FontAwesomeIcon icon="project-diagram" size="xs" />
                                &nbsp;&nbsp;&nbsp;
                                {record.title}
                                &nbsp;&nbsp;&nbsp;
                                <NavLink to={`${window.location.href}/edit`} >
                                    <FontAwesomeIcon icon="pencil-alt" size="xs" />
                                </NavLink>
                            </h3>
                        </CardHeader>
                        <CardBody>
                            <CardSubtitle>{record.description}</CardSubtitle>
                            <hr/>
                            <CardText>
                                <UserCredentials user={record.user} />
                                <br />
                                <Dates 
                                    created={record.created} 
                                    updated={record.updated} 
                                />
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            {record.uuid && <TreesList project_id={record.uuid} />}
        </>
    )
};
