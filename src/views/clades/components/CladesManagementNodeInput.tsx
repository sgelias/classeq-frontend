import React, { useState } from 'react';
import { Label, Input, Badge, Card, CardBody, CardTitle, Button, Form, Alert } from 'reactstrap';
import { useSelector, RootStateOrAny } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { cladesServices as cs } from '../_services/_clades.services';
import { CreatedTrees, CreatedClades } from '../../../_helpers/_url-providers';


const MAX_CHILD_LENCGH = 10;


export default () => {


    const [term, setTerm] = useState<string>('');


    const [nodes, setNodes] = useState<Array<any>>([]);


    const [notFoundMessage, setNotFoundMessage] = useState<string | undefined>(undefined);


    const [showAll, setShowAll] = useState<boolean>(false);


    const clade: CreatedClades = useSelector((state: RootStateOrAny) => (
        state.cladesDetailsReducer.record
    ));


    const tree: CreatedTrees = useSelector((state: RootStateOrAny) => (
        state.treesDetailsReducer.record
    ));


    const handleInput = (nodes: Array<any>) => setNodes(nodes);


    const handleChange = (element) => setTerm(element.target.value);


    const annotateClade = (targed_id: number) => {
        (clade.uuid && tree.uuid) &&
            cs.annotateClade(targed_id, clade.uuid, tree.uuid, tree.project);
    };


    const populateNodes = (childs: Array<any>) => {

        const elements = showAll
            ? childs : childs.slice(0, MAX_CHILD_LENCGH)

        return (
            <>
                {elements.map((child, index) => (
                    <Badge key={index} color="light border" className="m-1 px-2">
                        {child.scientificName}
                    </Badge>
                ))}
            </>
        );
    };


    return (
        <Card>
            <CardBody>
                <Form>
                    <Label for="gene">
                        Select a node to connect
                    </Label>
                    <Input
                        type="text"
                        name="gene"
                        id="gene"
                        autoFocus={true}
                        required={true}
                        placeholder="Search a node of backbone tree."
                        onChange={el => handleChange(el)}
                        onKeyDown={event => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                if (term && (term !== undefined || term !== "")) {
                                    setNotFoundMessage(undefined);
                                    cs.getNodeList(term).then(
                                        res => {
                                            handleInput(res.data);
                                        },
                                        () => {
                                            setNotFoundMessage("Taxon not found.");
                                        }
                                    )
                                }
                            }
                        }}
                    />

                    {notFoundMessage
                        ? <Alert color="warning" className="my-3">{notFoundMessage}</Alert>
                        : nodes.map((node, index) => (
                            <Card key={index} className="border mt-3 p-3 shadow">
                                <h4>
                                    {node.target.scientificName}
                                    <small className="text-muted ml-2">
                                        {node.target.taxonRank}
                                    </small>

                                    <Button
                                        color="success"
                                        className="float-right py-0 px-1"
                                        onClick={() => annotateClade(node.target.id)}>
                                        Use this node
                                    </Button>
                                </h4>
                                <hr />
                                <CardBody className="p-1">
                                    <CardTitle className="m-0">
                                        Parent:&nbsp;&nbsp;
                                        <Badge color="light border" className="m-1 px-2">
                                            {node.parent.scientificName}
                                        </Badge>
                                    </CardTitle>
                                </CardBody>
                                <hr />
                                {node.child.length > 0 && (
                                    <CardBody className="p-1">
                                        <CardTitle className="m-0">
                                            Childs:&nbsp;&nbsp;
                                            {!(node.child.length > MAX_CHILD_LENCGH) ? null : showAll &&
                                                <Button
                                                    color="link"
                                                    className="px-1 py-0 float-right"
                                                    onClick={() => setShowAll(!showAll)}
                                                >
                                                    {!showAll ? "Show all" : "Show less"}&nbsp;&nbsp;
                                                    <FontAwesomeIcon icon="times" />
                                                </Button>}
                                            <br />
                                            {populateNodes(node.child)}
                                            {!(node.child.length > MAX_CHILD_LENCGH) ? null : !showAll && (<div>
                                                <Button
                                                    color="link"
                                                    className="px-1 py-0 float-right"
                                                    onClick={() => setShowAll(!showAll)}
                                                >
                                                    Show all records&nbsp;&nbsp;
                                                    <FontAwesomeIcon icon="arrow-down" />
                                                </Button>
                                            </div>)}
                                        </CardTitle>
                                    </CardBody>
                                )}
                            </Card>
                        ))}
                </Form>
            </CardBody>
        </Card>
    )
};