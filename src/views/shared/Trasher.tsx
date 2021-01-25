import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroupItem, Input } from 'reactstrap';


interface Props {
    trashMethod: Function,
    deleteMethod: Function,
    label?: string,
    record_status?: boolean,
};


export default (props: Props) => {


    const [trashModalStatus, setTrashModalStatus] = useState(false);


    const [deleteModalStatus, setDeleteModalStatus] = useState(false);


    const toggleTrashModal = () => setTrashModalStatus(!trashModalStatus);


    const toggleDeleteModal = () => setDeleteModalStatus(!deleteModalStatus);


    const [label, setLabel] = useState<string>('');


    const onChangeLabel = (event: any) => {
        return setLabel(event.target.value);
    };


    const trashModal = (
        <Modal
            isOpen={trashModalStatus}
            scrollable={true}
            id="trash"
        >
            <ModalHeader toggle={toggleTrashModal} className="text-muted">
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
                {props.label}
            </ModalBody>

            <ModalFooter className="border-top">
                <Button
                    onClick={() => {
                        props.trashMethod();
                        toggleTrashModal();
                    }}
                    color={props.record_status ? "danger" : "success"}
                    className="sm py-0 px-1"
                >
                    Confirm
                </Button>
            </ModalFooter>
        </Modal>
    );


    const permanentlyDeleteModal = (
        <Modal
            isOpen={deleteModalStatus}
            scrollable={true}
            id="permanently-delete"
        >
            <ModalHeader toggle={toggleDeleteModal} className="text-muted">
                Permanently delete record
            </ModalHeader>

            <ModalBody>
                <span className="text-muted mr-2">
                    Item to delete
                </span>
                {props.label}
            </ModalBody>

            <ModalFooter className="border-top">

                <Input
                    type="text"
                    id="item"
                    onChange={onChangeLabel}
                />

                {label !== props.label ? null : (
                    <Button
                        onClick={() => {
                            props.deleteMethod();
                            toggleDeleteModal();
                        }}
                        color="danger"
                        className="sm py-0 px-1"
                    >
                        Confirm
                    </Button>
                )}
            </ModalFooter>
        </Modal>
    );


    return (
        <>
            <ListGroupItem>
                <details>
                    <summary className="float-right">
                        <Button
                            onClick={toggleTrashModal}
                            color={props.record_status ? "danger" : "success"}
                            className="sm py-0 px-1"
                            data-tip={props.record_status ? "Trash record." : "Activate record."}
                        >
                            {props.record_status ? "Trash" : "Activate"}
                        </Button>

                        {trashModal}
                    </summary>
                </details>
                <strong>
                    {props.record_status
                        ? "Move tree to trash"
                        : "Turn record active"}
                </strong>
                <hr />
                <p>
                    {props.record_status
                        ? "Don't worry, trash is only a status and trashed records can be easily recovered further."
                        : `Click in 'Turn record active' button to activate record.`}
                </p>
            </ListGroupItem>

            {props.record_status ? null : (
                <ListGroupItem>
                    <details>
                        <summary className="float-right">
                        <Button
                            onClick={toggleDeleteModal}
                            color="danger"
                            className="sm py-0 px-1"
                            data-tip="Permanently delete record."
                        >
                            Delete
                        </Button>

                            {permanentlyDeleteModal}
                        </summary>
                    </details>
                    <strong>
                        Permanently delete record
                    </strong>
                    <hr />
                    <p>
                        This action are permanently remove the tree record and all associated clades and node annotations. 
                        Be sure of your action.
                    </p>
                </ListGroupItem>
            )}
        </>
    )
};