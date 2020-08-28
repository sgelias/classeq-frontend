import React from 'react';
import { Col, Card, CardHeader, CardBody, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, RootStateOrAny } from 'react-redux';

import { CreatedClades } from '../../../_helpers/_url-providers';
import CladesManagementModels from './CladesManagementModels';
import CladesManagementAnnotations from './CladesManagementAnnotations';


interface Props {
    min_clade_length: number,
    setSubItems: Function,
    toggle: Function,
};


export default (props: Props) => {


    const record: CreatedClades = useSelector((state: RootStateOrAny) => (
        state.cladesDetailsReducer.record
    ));


    const invalidCladesSelected = (
        <ListGroupItem>
            <strong>
                <FontAwesomeIcon icon="exclamation-triangle" />
                &nbsp;&nbsp;
                Invalid clade selected
            </strong>
            <p className="mt-4 mb-1">
                Root clades and small clades are considered not able to be annotated.
            </p>
        </ListGroupItem>
    );


    const noCladesSelected = (
        <ListGroupItem>
            <strong className="text-muted">
                Select a clade to start.
            </strong>
        </ListGroupItem>
    );


    return (
        <Col
            sm={{ size: 12 }}
            md={{ size: 6 }}
        >
            <Card>
                <CardHeader className="border-bottom">
                    <h3>
                        <FontAwesomeIcon icon="info-circle" size="xs" />
                        &nbsp;&nbsp;&nbsp;
                        Details
                    </h3>
                </CardHeader>

                <CardBody className="pt-4 clades-card">
                    <ListGroup>
                        {!record?.uuid
                            ? noCladesSelected
                            : (record.branch_type !== "B" || (record.child && record.child.length < props.min_clade_length))
                                ? invalidCladesSelected
                                : (
                                    <>
                                        <CladesManagementAnnotations />
                                        <CladesManagementModels
                                            min_clade_length={props.min_clade_length}
                                        />
                                    </>
                                )}
                    </ListGroup>

                    <hr />

                    <div>
                        {record?.uuid && (
                            <Button
                                color="link"
                                onClick={() => {
                                    props.setSubItems(record);
                                    props.toggle();
                                }}
                            >
                                View MSA&nbsp;&nbsp;
                                ({!(record?.child?.length && record?.child?.length > 0) ? null : (
                                    record?.child?.length
                                )})
                                &nbsp;&nbsp;
                                <FontAwesomeIcon icon="align-left" />
                            </Button>
                        )}
                    </div>
                </CardBody>
            </Card>
        </Col >
    )
};