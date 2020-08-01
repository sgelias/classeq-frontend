import React, { useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroupItem } from 'reactstrap';


interface Props {
    trashMethod: Function,
    label?: string,
    record_status?: boolean,
};


export default (props: Props) => {


    const [modal, setModal] = useState(false);


    const toggle = () => setModal(!modal);


    return (
        <>
            <ListGroupItem>
                <details>
                    <summary className="float-right">
                        <Button
                            onClick={toggle}
                            color={props.record_status ? "danger" : "success"}
                            className="sm py-0 px-1"
                            data-tip="Edit record"
                        >
                            {props.record_status ? "Trash record" : "Turn record active"}
                        </Button>

                        <Modal
                            isOpen={modal}
                            scrollable={true}
                        >
                            <ModalHeader toggle={toggle} className="text-muted">
                                {props.record_status 
                                    ? "Trash record" 
                                    : "Activate record"}
                            </ModalHeader>

                            <ModalBody>
                                <span className="text-muted mr-2">
                                    {props.record_status 
                                        ? "Item to trash:" 
                                        : "Item to activate:"}
                                </span>
                                { props.label }
                            </ModalBody>

                            <ModalFooter className="border-top">
                                <Button
                                    onClick={() => { 
                                        props.trashMethod(); 
                                        toggle(); 
                                    }}
                                    color={props.record_status ? "danger" : "success"}
                                    className="sm py-0 px-1"
                                >
                                    Confirm
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </summary>
                </details>
                <strong>
                    {props.record_status 
                        ? "Move tree to trash" 
                        : "Activate record"}
                </strong>
                <hr />
                <p>
                    {props.record_status 
                        ? "Don't worry, trash is only a status and trashed records can be easily recovered further." 
                        : `Click in 'Turn record active' button to activate record.`}
                </p>
            </ListGroupItem>
        </>
    )
};