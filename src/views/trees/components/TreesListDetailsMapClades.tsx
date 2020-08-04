import React, { useState } from 'react';
import { ListGroup, ListGroupItem, Button, Modal, ModalBody, Input, FormGroup, Form } from 'reactstrap';
import { v4 as uuid } from 'uuid/interfaces';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { treesServices as ts } from '../_services/_trees.services';


interface Props {
    project_id: uuid,
    tree_id: uuid,
};


export default (props: Props) => {


    const [modal, setModal] = useState(false);


    const [leaves, setLeaves] = useState<Array<string>>([]);


    const [outgroupList, setOutgroupList] = useState<Array<string>>([])


    let [term, setTerm] = useState<string>('');


    const toggle = () => setModal(!modal);


    const getLeaves = () => {
        ts.getLeaves(props.project_id, props.tree_id)
            .then(res => setLeaves(res.data));
    };


    const selectModal = (
        <Modal
            isOpen={modal}
            className="success"
            scrollable={true}
            size="xl"
        >
            <div className="mb-2 p-3">
                <div className="mb-3">
                    <Button
                        color="link"
                        onClick={() => toggle()}
                    >
                        &times;&nbsp;&nbsp;Cancel
                    </Button>
                    <Button
                        color="link"
                        className="float-right"
                        onClick={() => console.log("next")}
                    >
                        Next&nbsp;&nbsp;<FontAwesomeIcon icon="angle-double-right" />
                    </Button>
                </div>

                <Form >
                    <FormGroup>
                        <Input
                            type="text"
                            name="filter"
                            id="filter"
                            placeholder="Filter leaves"
                            onChange={el => setTerm(el.target.value)}
                        />
                    </FormGroup>
                </Form>

                <div>
                    {outgroupList.map((item, index) => (
                        <Button
                            key={index}
                            onClick={() => {
                                setOutgroupList([
                                    ...outgroupList.filter(element => element !== item)
                                ]);
                            }}
                            color="primary"
                            className="m-1 py-0 px-1">
                            {item}&nbsp;&nbsp;&times;
                        </Button>
                    ))}
                </div>
            </div>

            <ModalBody className="border">
                <ListGroup>
                    {leaves
                        .filter(item => item.toLowerCase().includes(term.toLowerCase()))
                        .map((item, index) => (
                            <ListGroupItem key={index}>
                                <Button
                                    color="link"
                                    onClick={() => {
                                        !(outgroupList.includes(item)) && setOutgroupList([...outgroupList, item])
                                    }}
                                >
                                    {item}
                                </Button>
                            </ListGroupItem>
                        ))}
                </ListGroup>
            </ModalBody>
        </Modal>
    );


    return (
        <ListGroupItem>
            <details>
                <summary className="float-right">
                    <Button
                        onClick={() => {
                            toggle();
                            getLeaves();
                        }}
                        color="primary"
                        className="py-0 px-1">
                        Map clades
                    </Button>
                    {selectModal}
                </summary>
            </details>
            <strong>
                Map Clades<small className="text-muted ml-2">(Step one)</small>
            </strong>
            <div>
                Here clade representations are created to allows easy tree management.
                Clade representations see three clade types: root, internal nodes, and leaves.
                <br />
                <ul>
                    <li>
                        Root clades are the start node of the tree. Root's have not parent clades.
                    </li>
                    <li>
                        Internal nodes contain only branches. Only node hypothesis with high
                        phylogenetic support are mapped. Samuel, describe the high phylogenetic support...
                    </li>
                    <li>
                        Leaves are terminal nodes.
                    </li>
                </ul>
            </div>
        </ListGroupItem>
    )
};