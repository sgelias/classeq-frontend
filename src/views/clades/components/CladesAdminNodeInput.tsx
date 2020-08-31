import React, { useState } from 'react';
import { Label, Input, Card, CardBody, Form, Alert, Progress } from 'reactstrap';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { cladesServices as cs } from '../_services/_clades.services';
import { cladesActions as ca } from '../_reducers/_clades.actions';
import { CreatedTrees, CreatedClades } from '../../../_helpers/_url-providers';
import { useAsyncEffect } from 'use-async-effect';
import CladesAdminNodeDetailsView from './CladesAdminNodeDetailsView';


const MAX_CHILD_LENGTH = 10;


interface Props {
    toggle: Function,
};


export default (props: Props) => {


    const dispatch = useDispatch();


    const params = useParams<any>();


    const [term, setTerm] = useState<string>('');


    const [nodes, setNodes] = useState<Array<any>>([]);


    const [notFoundMessage, setNotFoundMessage] = useState<string | undefined>(undefined);


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
                            : (
                                <CladesAdminNodeDetailsView
                                    maxChildLength={MAX_CHILD_LENGTH}
                                    nodes={nodes}
                                    annotateClade={annotateClade}
                                />
                            )}
                </Form>
            </CardBody>
        </Card>
    )
};