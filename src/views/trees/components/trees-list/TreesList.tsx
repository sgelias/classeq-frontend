import React from 'react';
import { useAsyncEffect } from 'use-async-effect';
import { Col, Card, CardBody, CardFooter, CardHeader, CardTitle, CardText, Row } from 'reactstrap';
import { v4 as uuid } from 'uuid/interfaces';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';

import { Dates } from '../../../shared/index';
import { CreatedTrees } from '../../../../_helpers/url-providers';
import { treesServices as ts } from '../_trees.services';
import { treesActions as ta } from '../../_reducers/trees.actions';
import TreesModal from '../trees-modal/TreesModal';


interface Props {
    project_id: uuid
}


const TreesList = (props: Props) => {


    const dispatch = useDispatch();


    const trees: Array<CreatedTrees> = useSelector((state: RootStateOrAny) => (
        state.treesReducers.results
    ));


    useAsyncEffect(() => {
        dispatch(ta.treesListPending(true));
        ts.list(props.project_id)
            .then(res => {
                dispatch(ta.treesListSuccess(res.data.results));
                dispatch(ta.treesListPending(false));
            })
            .catch(err => dispatch(ta.treesListFail(err)));
    }, []);


    return !trees
        ? null
        : (
            <Row>
                <Col md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 2 }}>
                    <Card>
                        <CardHeader>
                            <h3>Associated trees</h3>
                        </CardHeader>

                        <CardBody className="pt-1">
                            {trees.map((item, index) => (
                                <div key={index}>
                                    <hr className="mb-2" />
                                    <CardTitle>
                                        <h4>
                                            {/* Tree name */}
                                            {item.title}
                                            <TreesModal
                                                is_update={true}
                                                tree_id={item.uuid}
                                                project_id={props.project_id}
                                            />

                                            {/* Genes */}
                                            <small className="ml-2 text-muted float-md-right">
                                                {item.gene?.name} | {item.gene?.name_slug}
                                            </small>
                                        </h4>
                                    </CardTitle>

                                    {/* Description */}
                                    <CardText>
                                        <small className="text-muted">Description:</small><br />
                                        {item.description}
                                    </CardText>

                                    {/* Phylogenetic tree */}
                                    <div className="no-wrap-text">
                                        <small className="text-muted">Original Tree:</small>
                                        <div className="my-2"><span>{item.tree}</span></div>
                                    </div>

                                    {/* Dates */}
                                    <Dates
                                        created={item.created}
                                        updated={item.updated}
                                    />
                                </div>
                            ))}
                        </CardBody>

                        <CardFooter>
                            <TreesModal project_id={props.project_id} />
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        )
}


export default TreesList;