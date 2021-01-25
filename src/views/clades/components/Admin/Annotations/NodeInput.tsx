import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Label, Input, Card, CardBody, Form, Alert, Progress, Button, Modal, ModalBody } from 'reactstrap';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAsyncEffect } from 'use-async-effect';
import { useCookies } from 'react-cookie';

import { cladesServices as cs } from '../../../_services/_clades.services';
import { cladesActions as ca } from '../../../_reducers/_clades.actions';
import { CreatedTrees, CreatedClades } from '../../../../../_helpers/_url-providers';
import NodeDetailsView from './NodeDetailsView';


const MAX_CHILD_LENGTH = 10;


export interface NodeInputHandle {
    showAnnotationModal: () => void,
};


const NodeInput: React.ForwardRefRenderFunction<NodeInputHandle> = (_, ref) => {


    /**
     * @description Create a read-only hook for cookies.
     */
    const [cookie] = useCookies();


    /**
     * @description Set a dispatcher for state management.
     */
    const dispatch = useDispatch();


    const params = useParams<any>();


    const [term, setTerm] = useState<string>('');


    const [nodes, setNodes] = useState<Array<any>>([]);


    const [annotateModal, setAnnotateModal] = useState(false);


    const [notFoundMessage, setNotFoundMessage] = useState<string | undefined>(undefined);


    const [waitingRequest, setWaitingRequest] = useState<boolean>(false);


    const [taxonRankList, setTaxonRankList] = useState<Array<string>>([]);


    const [filteredNodes, setFilteredNodes] = useState<Array<any>>([]);


    const clade: CreatedClades = useSelector((state: RootStateOrAny) => (
        state.cladesDetailsReducer.record
    ));


    const clades = useSelector((state: RootStateOrAny) => (
        state.cladesListReducer.results
    ));


    const tree: CreatedTrees = useSelector((state: RootStateOrAny) => (
        state.treesDetailsReducer.record
    ));


    const listClades = async (): Promise<void> => {
        (params.tid) && await cs.listClades(
            cookie.pas_auth.access_token, params.tid, dispatch);
    };


    const handleInput = (nodes: Array<any>) => setNodes(nodes);


    const showAnnotationModal = () => setAnnotateModal(!annotateModal);


    useImperativeHandle(ref, () => {
        return { showAnnotationModal };
    });


    const capitalize = (text: string) => {
        if (typeof text !== 'string') return '';
        return text.charAt(0).toUpperCase() + text.slice(1);
    };


    const handleChange = (element) => setTerm(capitalize(element.target.value));


    const annotateClade = (targed_id: number) => {
        (clade.uuid && tree.uuid) &&
            cs.annotateClade(
                cookie.pas_auth.access_token, targed_id, clade.uuid, tree.uuid,
                tree.project
            )
                .then(() => listClades())
                //.then(() => props.toggle())
                .catch(err => console.log(err));
    };


    const populateKey = (data: Array<any>, key: string) => {
        setTaxonRankList([...new Set(data.map(item => item.target[key]))]);
    };


    const filterResponse = (rank?: string) => (
        !rank ? nodes : nodes.filter(node => node.target.taxonRank === rank)
    );


    useAsyncEffect(() => {
        const item = clades.filter(item => item.uuid === clade.uuid)[0]
        dispatch(ca.cladesDetailsSuccess(item))
    }, [clades]);


    useAsyncEffect(() => {
        setFilteredNodes(filterResponse());
    }, [nodes]);


    return (
        <Modal
            isOpen={annotateModal}
            autoFocus={false}
            className="success"
            scrollable={true}
            size="xl"
        >
            <div>
                <Button
                    color="link"
                    className="float-right"
                    onClick={() => showAnnotationModal()}
                >
                    &times;&nbsp;&nbsp;Cancel
                </Button>
            </div>
            <ModalBody>
                <Card>
                    <CardBody>
                        <Form>
                            <Label for="gene">
                                Select a node to connect
                            </Label>
                            <Input
                                autoFocus={true}
                                type="text"
                                name="gene"
                                id="gene"
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
                                            cs.getNodeList(cookie.pas_auth.access_token, term)
                                                .then(
                                                    res => {
                                                        handleInput(res.data);
                                                        populateKey(res.data, 'taxonRank');
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

                            {taxonRankList.length > 0 && (
                                <div className="my-2 p-0 d-flex justify-content-center">
                                    <span className="text-muted mt-1">
                                        Filter:&nbsp;
                                    </span>
                                    {taxonRankList.map((item, index) => (
                                        <Button
                                            key={index}
                                            color="primary"
                                            className="px-2 py-0 m-1 rounded"
                                            onClick={() => setFilteredNodes(filterResponse(item))}
                                        >
                                            {item}
                                        </Button>
                                    ))}
                                </div>
                            )}

                            {notFoundMessage
                                ? <Alert color="warning" className="my-3">{notFoundMessage}</Alert>
                                : waitingRequest
                                    ? <Progress animated color="success" className="mt-3" value="100" />
                                    : (
                                        <NodeDetailsView
                                            maxChildLength={MAX_CHILD_LENGTH}
                                            nodes={filteredNodes}
                                            annotateClade={annotateClade}
                                        />
                                    )}
                        </Form>
                    </CardBody>
                </Card>
            </ModalBody>
        </Modal>
    )
};

export default forwardRef(NodeInput);