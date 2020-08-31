import React, { useState } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import { Col, Card, CardHeader, CardBody, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAsyncEffect } from 'use-async-effect';

import { CreatedClades } from '../../../_helpers/_url-providers';


declare type BranchType = "B" | "R" | "L";


interface Props {
    height: number,
};


export default (props: Props) => {


    const [filteredClades, setFilteredClades] = useState<Array<CreatedClades>>([]);


    const clade: CreatedClades = useSelector((state: RootStateOrAny) => (
        state.cladesDetailsReducer.record
    ));


    const clades: Array<CreatedClades> = useSelector((state: RootStateOrAny) => (
        state.cladesListReducer.results
    ));


    useAsyncEffect(() => {
        clade.parent && setFilteredClades([...clades.filter(item =>
            item.parent === clade.parent
        )]);
    }, [clade]);


    const formatedName = (name: string) => {
        const new_name = name.split('_');
        return (
            <>
                <small className="text-muted">
                    {new_name[0]}
                </small>
                &nbsp;&nbsp;
                <span className="sister-leaves">
                    {new_name.slice(1).join(' ')}
                </span>
            </>
        )
    };


    const populateChild = (type: BranchType) => (
        !(filteredClades.length > 0) ? null : filteredClades
            .filter(item => item.branch_type === type && item.uuid !== clade.uuid)
            .map((item, index) => (
                <ListGroupItem key={index}>
                    <span className="text-muted">
                        {item.branch_type === "B"
                            ? (
                                <>
                                    <FontAwesomeIcon icon="leaf" />
                                    &nbsp;&nbsp;
                                    {(item?.child?.length && item?.child?.length > 0) && (
                                        `${item?.child?.length} leaves`
                                    )}
                                    <small className="text-muted float-right">
                                        <Badge color="light" className="bg-transparent border">
                                            {item.uuid && item.uuid.toString().split('-')[0]}
                                        </Badge>
                                    </small>
                                </>
                            )
                            : (
                                <>
                                    {item.name && (
                                        formatedName(item.name)
                                    )}
                                    <small className="text-muted float-right">
                                        <Badge color="light" className="bg-transparent border">
                                            {item.uuid && item.uuid.toString().split('-')[0]}
                                        </Badge>
                                    </small>
                                </>
                            )}
                    </span>
                </ListGroupItem >
            ))
    );


    return !(clade && clade?.parent) ? null : (
        <div className="sister-clades">
            <Col>
                <Card className="shadow">
                    <CardHeader className="border-bottom">
                        <h3>
                            <FontAwesomeIcon icon="code-branch" size="xs" />
                            &nbsp;&nbsp;&nbsp;
                            Sister branches/leaves
                        </h3>
                    </CardHeader>
                    <CardBody className="pt-1 clades-card" style={{ maxHeight: `${800 - props.height}px` }}>
                        <ListGroup className="my-3">
                            <h4 className="text-muted">
                                Branches
                            </h4>
                            {populateChild("B")}
                        </ListGroup>
                        <ListGroup className="my-3">
                            <h4 className="text-muted">
                                Leaves
                            </h4>
                            {populateChild("L")}
                        </ListGroup>
                    </CardBody>
                </Card>
            </Col>
        </div>
    )
};