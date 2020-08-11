import React from 'react';
import { Col, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default () => {


    return (
        <Col
            sm={{ size: 12 }}
            md={{ size: 6 }}
        >
            <Card>
                <CardHeader className="border-bottom">
                    <h3>
                        <FontAwesomeIcon icon="leaf" size="xs" />
                        &nbsp;&nbsp;&nbsp;
                        Leaves
                    </h3>
                </CardHeader>

                <CardBody className="pt-1 clades-card">
                    Manage
                </CardBody>

                <CardFooter />
            </Card>
        </Col >
    )
};