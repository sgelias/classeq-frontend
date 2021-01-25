import React, { useRef } from 'react';
import { v4 as uuid } from 'uuid/interfaces';
import { Col, Card, CardHeader, CardBody, Button, ListGroup, ListGroupItem, ButtonGroup } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { useAsyncEffect } from 'use-async-effect';
//import { useWorker } from "@koale/useworker";

import { CreatedClades } from '../../../../_helpers/_url-providers';
import { cladesActions as ca } from '../../_reducers/_clades.actions';
//import { cladesServices as cs } from '../../_services/_clades.services';
import Models from './Models/Models';
import Annotations from './Annotations/Annotations';


interface Props {
    min_clade_length: number,
    setSubItems: Function,
    toggle: Function,
    setDimensions: Function,
};


//const getTasksStatus = cs.getSingleCladeTrainStatus();


export default (props: Props) => {


    const dispatch = useDispatch();


    const targetRef = useRef<any>(null);


    const clade: CreatedClades = useSelector((state: RootStateOrAny) => (
        state.cladesDetailsReducer.record
    ));


    const clades: Array<CreatedClades> = useSelector((state: RootStateOrAny) => (
        state.cladesListReducer.results
    ));


    const getParentClade = (parent: uuid) => clades.filter(item => item.uuid === parent)[0];


    const setSingleClade = async (item: uuid) => {
        await Promise.resolve()
            .then(() => dispatch(ca.cladesDetailsSuccess(getParentClade(item))))
            .catch(err => dispatch(ca.cladesDetailsFail(err)));
    };


    useAsyncEffect(() => {
        targetRef?.current && props.setDimensions(targetRef.current.offsetHeight);
    }, [clade]);


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
        <div ref={targetRef}>
            <Col>
                <Card className="shadow">
                    <CardHeader className="border-bottom">
                        <h3>
                            <FontAwesomeIcon icon="info-circle" size="xs" />
                            &nbsp;&nbsp;&nbsp;
                            Details
                        </h3>
                    </CardHeader>

                    <CardBody className="pt-4 clades-card">
                        <ListGroup>
                            {!clade?.uuid
                                ? noCladesSelected
                                : (clade.branch_type !== "B" || (clade.child && clade.child.length < props.min_clade_length))
                                    ? invalidCladesSelected
                                    : (
                                        <>
                                            <Annotations />
                                            <Models
                                                min_clade_length={props.min_clade_length}
                                            />
                                        </>
                                    )}
                        </ListGroup>

                        <hr />

                        <div>
                            {clade?.uuid && (
                                <ButtonGroup>
                                    <Button
                                        className="py-0 px-2"
                                        onClick={() => {
                                            clade.parent && setSingleClade(clade.parent);
                                        }}
                                    >
                                        <FontAwesomeIcon icon="arrow-left" />
                                        &nbsp;&nbsp;Show parent
                                    </Button>
                                    <Button
                                        className="py-0 px-2"
                                        onClick={() => {
                                            props.setSubItems(clade);
                                            props.toggle();
                                        }}
                                    >
                                        View MSA&nbsp;&nbsp;
                                        ({!(clade?.child?.length && clade?.child?.length > 0) ? null : (
                                            clade?.child?.length
                                        )})
                                        &nbsp;
                                        <FontAwesomeIcon icon="align-left" />
                                    </Button>
                                </ButtonGroup>
                            )}
                        </div>
                    </CardBody>
                </Card>
            </Col >
        </div>
    )
};