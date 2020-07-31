import React from 'react';
import { useAsyncEffect } from 'use-async-effect';
import { Button, Col, Card, CardBody, CardFooter, CardHeader, Row, Table } from 'reactstrap';
import { v4 as uuid } from 'uuid/interfaces';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CopyToClipboard from 'react-copy-to-clipboard';
import ReactTooltip from "react-tooltip";

import { Dates } from '../../shared/index';
import { CreatedTrees } from '../../../_helpers/url-providers';
import { treesServices as ts } from '../_services/_trees.services';
import TreesModal from './TreesModal';


interface Props {
    project_id: uuid
}


const TreesList = (props: Props) => {


    const dispatch = useDispatch();


    const max_text_size: number = 25;


    const trees: Array<CreatedTrees> = useSelector((state: RootStateOrAny) => (
        state.treesListReducer.results
    ));


    useAsyncEffect(async () => {
        await ts.list(props.project_id, dispatch);
    }, []);


    return !trees
        ? null
        : (
            <Row>
                <Col 
                    md={{ size: 12, offset: 0 }} 
                    lg={{ size: 10, offset: 1 }} 
                    xl={{ size: 8, offset: 2 }}
                >
                    <Card>
                        <CardHeader>
                            <h3>
                                <FontAwesomeIcon icon="tree" size="xs" />
                                &nbsp;&nbsp;&nbsp;
                                Associated trees
                            </h3>
                        </CardHeader>

                        <CardBody className="pt-1">
                            <Table hover>

                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Gene</th>
                                        <th>Description</th>
                                        <th>Do</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {trees.map((item, index) => (
                                        <tr key={index}>

                                            <td>
                                                {/* Title */}
                                                {item.title}

                                                <br/>

                                                {/* Dates */}
                                                <Dates
                                                    created={item.created}
                                                    updated={item.updated}
                                                />
                                            </td>

                                            {/* Genes */}
                                            <td>
                                                <small className="ml-2 text-muted">
                                                    {item.gene?.name} | {item.gene?.name_slug}
                                                </small>
                                            </td>

                                            {/* Description */}
                                            <td>
                                                <span data-tip={item.description}>
                                                    {
                                                        item.description && item.description?.length > max_text_size
                                                            ? `${item.description?.substring(0, max_text_size)} ...`
                                                            : item.description
                                                    }
                                                </span>
                                                <ReactTooltip />
                                            </td>

                                            {/* Actions */}
                                            <td>
                                                {/* Phylogenetic tree */}
                                                {!item.tree ? null : (
                                                    <CopyToClipboard text={item.tree}
                                                        onCopy={() => alert("Phylogenetic tree copied to clipboard.")}>
                                                        <Button color="link" className="sm pr-0 py-0">
                                                            <FontAwesomeIcon icon="copy" size="xs" data-tip="Copy phylogeny to clipboard" />
                                                            <ReactTooltip />
                                                        </Button>
                                                    </CopyToClipboard>
                                                )}
                                                {/* Edit modal */}
                                                <TreesModal
                                                    is_update={true}
                                                    tree_id={item.uuid}
                                                    project_id={props.project_id}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </Table>
                        </CardBody>

                        <CardFooter>
                            <TreesModal project_id={props.project_id} label={"Register a new tree"} />
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        )
}


export default TreesList;