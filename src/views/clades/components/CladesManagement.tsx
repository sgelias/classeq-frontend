import React from 'react';
import { Col, Card, CardHeader, CardBody, Button, ListGroup } from 'reactstrap';
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


    return !record?.uuid ? null : (
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

                <CardBody className="pt-4 clades-card">
                    
                    <ListGroup>
                        <CladesManagementAnnotations />
                        <CladesManagementModels 
                            min_clade_length={props.min_clade_length}
                        />
                    </ListGroup>
                    
                    <hr />

                    <div>
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
                    </div>
                </CardBody>
            </Card>
        </Col >
    )
};