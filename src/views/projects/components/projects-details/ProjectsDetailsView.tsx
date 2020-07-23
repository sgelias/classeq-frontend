import React from 'react';
import { Button, Col, Row, Card, CardBody, CardTitle, NavLink, Table } from 'reactstrap';

import { CreatedProject } from '../../../../_helpers/url-providers';


export default (props: CreatedProject) => {

    return (
        <Row>
            <Col md={{ size: 8, offset: 2 }}>
                <Card>
                    <CardBody>
                        <Table striped>
                            <tbody>
                                <tr>
                                    <th>Title</th>
                                    <td>{ props.title }</td>

                                    <th>Description</th>
                                    <td>{ props.description }</td>

                                    <th>Dates</th>
                                    <td>
                                        Created in&nbsp;
                                        { props.title },&nbsp;
                                        updated in&nbsp;
                                        { props.title }.
                                    </td>

                                    <th>Manager</th>
                                    <td>{ props.user }</td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <NavLink to={`/pages/projects/${props.uuid}/edit`} activeClassName="active">
                            <Button color="primary">Edit</Button>
                        </NavLink>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}
