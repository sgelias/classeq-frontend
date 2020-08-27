import React, { useState } from 'react';
import { Spinner, Modal, Button, ModalBody, ListGroupItem } from 'reactstrap';
import { useSelector, RootStateOrAny } from 'react-redux';

import { CreatedClades } from '../../../_helpers/_url-providers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CladesManagementNodeInput from './CladesManagementNodeInput';


export default () => {


    const [modal, setModal] = useState(false);


    const record: CreatedClades = useSelector((state: RootStateOrAny) => (
        state.cladesDetailsReducer.record
    ));


    const status: boolean = useSelector((state: RootStateOrAny) => (
        state.cladesDetailsReducer.pending
    ));


    const toggle = () => setModal(!modal);


    const nodeDescriptionDetailsView = (
        <h4 className="text-center my-3">
            {record.annotation?.description}
            &nbsp;&nbsp;
            <small className="text-muted">
                {record.annotation?.node_type}
            </small>
        </h4>
    );


    const annotationModal = (
        <Modal
            isOpen={modal}
            className="success"
            scrollable={true}
            size="xl"
        >
            <div>
                <Button
                    color="link"
                    className="float-right"
                    onClick={() => toggle()}
                >
                    &times;&nbsp;&nbsp;Cancel
                </Button>
            </div>
            <ModalBody>
                <CladesManagementNodeInput/>
            </ModalBody>
        </Modal>
    );


    const nodeDescriptionCreateOrEdit = (
        <ListGroupItem>
            <details>
                <summary className="float-right">
                    <Button
                        color="primary"
                        className="py-0 px-1"
                        onClick={() => toggle()}
                    >
                        Annotate
                        &nbsp;&nbsp;
                        <FontAwesomeIcon icon="pencil-alt" />
                    </Button>
                    {annotationModal}
                </summary>
            </details>
            <strong>
                <FontAwesomeIcon icon="exclamation-triangle" />
                &nbsp;&nbsp;
                Pending annotation
            </strong>
            <p className="mt-4 mb-1">
                Each clade would be connected to a node of the backbone tree. 
                Click in Annotate to connect this node to backbone.
            </p>
        </ListGroupItem>
    );


    return (
        <>
            {status
                ? <Spinner color="success" />
                : (
                    record.annotation
                        ? nodeDescriptionDetailsView
                        : nodeDescriptionCreateOrEdit
                )}
        </>
    )
};