import React from 'react';
import { Col, Card, CardHeader, CardBody, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';

import { CreatedClades } from '../../../_helpers/_url-providers';
import { cladesActions as ca } from '../_reducers/_clades.actions';


interface Props {
    min_clade_length: number,
};


export default (props: Props) => {


    const dispatch = useDispatch();


    const clade: CreatedClades = useSelector((state: RootStateOrAny) => (
        state.cladesDetailsReducer.record
    ));


    const clades: Array<CreatedClades> = useSelector((state: RootStateOrAny) => (
        state.cladesListReducer.results
    ));


    const setSingleClade = async (item: CreatedClades) => {
        await Promise.resolve()
            .then(() => dispatch(ca.cladesDetailsSuccess(item)))
            .catch(err => dispatch(ca.cladesDetailsFail(err)));
    };


    const internalClade = (item: CreatedClades, index: number) => {

        const filteredClades = clades.filter(clade => (
            clade.parent === item.uuid && clade.branch_type === "B"
        ));

        return (
            <ListGroupItem 
                key={index}
                tag="a"
                onClick={() => {
                    setSingleClade(item);
                }}
                className={
                    `clade-items \
                    ${clade.uuid === item.uuid && "selected"} \
                    ${item.child 
                        && (item.child.length < props.min_clade_length || item.branch_type === "R") 
                            ? "invalid" : "valid"}`
                }
            >
                <span className="float-right text-muted">
                    <small>
                        <Badge color="light" className="bg-transparent border">
                            {item.uuid && item.uuid.toString().split('-')[0]}
                        </Badge>
                    </small>
                    &nbsp;&nbsp;
                    {item.branch_type === "R" ? "Root" : "Internal"}
                </span>
                <div className={`${item.annotation && "annotated"} text-muted`}>
                    <FontAwesomeIcon icon="leaf" />
                    &nbsp;&nbsp;
                    {(item?.child?.length && item?.child?.length > 0) && (
                        `${item?.child?.length} leaves`)}
                    &nbsp;&nbsp;
                    {filteredClades?.length > 0 && (
                        <>
                            <FontAwesomeIcon icon="code-branch" />
                            &nbsp;&nbsp;
                            {filteredClades?.length} child
                        </>
                    )}
                    &nbsp;&nbsp;
                    {!item.model ? null : (
                        <>
                            &nbsp;&nbsp;
                            <FontAwesomeIcon icon="brain" />
                        </>
                    )}
                    {!item.annotation ? null : (
                        <>
                            &nbsp;&nbsp;
                            <FontAwesomeIcon icon="pencil-alt" />
                        </>
                    )}
                </div>
            </ListGroupItem >
        )
    };


    return (
        <Col>
            <Card className="shadow">
                <CardHeader className="border-bottom">
                    <h3>
                        <FontAwesomeIcon icon="code-branch" size="xs" />
                        &nbsp;&nbsp;&nbsp;
                        Clades
                    </h3>
                </CardHeader>

                <CardBody className="pt-1 clades-card">

                    {/* Larger and medium clades */}
                    <div className="my-5">
                        <h4 className="text-muted">
                            Mediun/Larger clades (&gt;= {props.min_clade_length} leaves)
                        </h4>

                        <br className="mb-3" />

                        <ListGroup>
                            {!(clades.length > 0) ? null : clades
                                .filter(item => (
                                    (item.child && item?.child?.length >= props.min_clade_length) &&
                                    (item.branch_type === "B" || item.branch_type === "R"))
                                )
                                .sort((a: CreatedClades, b: CreatedClades) => {
                                    return (
                                        (a && b) &&
                                        (a.child && b.child) &&
                                        (a.child?.length > b.child?.length)
                                    ) ? -1 : 1
                                })
                                .map((item, index) => internalClade(item, index))}
                        </ListGroup>
                    </div>

                    {/* Small clades */}
                    <div className="my-5">
                        <h4 className="text-muted">
                            Small clades (&lt; {props.min_clade_length} leaves)
                        </h4>

                        <br />

                        <ListGroup className="shadow">
                            {!(clades.length > 0) ? null : clades
                                .filter(item => (
                                    (item.child && item?.child?.length < props.min_clade_length) &&
                                    (item.branch_type === "B" || item.branch_type === "R"))
                                )
                                .sort((a: CreatedClades, b: CreatedClades) => {
                                    return (
                                        (a && b) &&
                                        (a.child && b.child) &&
                                        (a.child?.length > b.child?.length)
                                    ) ? -1 : 0
                                })
                                .map((item, index) => internalClade(item, index))}
                        </ListGroup>
                    </div>

                </CardBody>
            </Card>
        </Col>
    )
};