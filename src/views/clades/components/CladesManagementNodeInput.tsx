import React, { useState } from 'react';
import { Label, Input, Badge, Card, CardBody, CardTitle, Button, Form, Alert, Progress } from 'reactstrap';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';

import { cladesServices as cs } from '../_services/_clades.services';
import { cladesActions as ca } from '../_reducers/_clades.actions';
import { CreatedTrees, CreatedClades } from '../../../_helpers/_url-providers';
import { useAsyncEffect } from 'use-async-effect';


const MAX_CHILD_LENCGH = 10;


interface Props {
    toggle: Function,
};


export default (props: Props) => {


    const dispatch = useDispatch();


    const params = useParams<any>();


    const [term, setTerm] = useState<string>('');


    const [nodes, setNodes] = useState<Array<any>>([]);


    const [notFoundMessage, setNotFoundMessage] = useState<string | undefined>(undefined);


    const [showAll, setShowAll] = useState<boolean>(false);


    const [waitingRequest, setWaitingRequest] = useState<boolean>(false);


    const clade: CreatedClades = useSelector((state: RootStateOrAny) => (
        state.cladesDetailsReducer.record
    ));


    const clades = useSelector((state: RootStateOrAny) => (
        state.cladesListReducer.results
    ));


    const tree: CreatedTrees = useSelector((state: RootStateOrAny) => (
        state.treesDetailsReducer.record
    ));


    useAsyncEffect(() => {
        const item = clades.filter(item => item.uuid === clade.uuid)[0]
        dispatch(ca.cladesDetailsSuccess(item))
    }, [clades]);


    const listClades = async (): Promise<void> => {
        (params.tid) && await cs.listClades(params.tid, dispatch);
    };


    const handleInput = (nodes: Array<any>) => setNodes(nodes);


    const capitalize = (text: string) => {
        if (typeof text !== 'string') return '';
        return text.charAt(0).toUpperCase() + text.slice(1);
    };


    const handleChange = (element) => setTerm(capitalize(element.target.value));


    const annotateClade = (targed_id: number) => {
        (clade.uuid && tree.uuid) &&
            cs.annotateClade(targed_id, clade.uuid, tree.uuid, tree.project)
                .then(() => listClades())
                .then(() => props.toggle())
                .catch(err => console.log(err));
    };


    const showAllButton = (node: Array<any>, show: boolean) => {
        const isShow = show ? showAll : !showAll;
        return !(node.length > MAX_CHILD_LENCGH) ? null : isShow && (
            <Button
                color="link"
                className="px-1 py-0 float-right"
                onClick={() => setShowAll(!showAll)}
            >
                {!showAll
                    ? <>Show all &nbsp;&nbsp;<FontAwesomeIcon icon="arrow-down" /></>
                    : <>Show less &nbsp;&nbsp;<FontAwesomeIcon icon="times" /></>}
            </Button>
        )
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
                        value={term}
                        onChange={el => handleChange(el)}
                        onKeyDown={event => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                if (term && (term !== undefined || term !== "")) {
                                    setWaitingRequest(true);
                                    setNotFoundMessage(undefined);
                                    cs.getNodeList(term).then(
                                        res => {
                                            handleInput(res.data);
                                            setWaitingRequest(false);
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
                        : waitingRequest
                            ? <Progress animated color="success" className="mt-3" value="100" />
                            : (nodes.map((node, index) => (
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
                                                {showAllButton(node.child, true)}
                                                <br />
                                                {populateNodes(node.child)}
                                                {showAllButton(node.child, false)}
                                            </CardTitle>
                                        </CardBody>
                                    )}
                                </Card>
                            )))}
                </Form>
            </CardBody>
        </Card>
    )
};