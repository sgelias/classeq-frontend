import React, { useState } from 'react';
import { Spinner, Modal, Button, ModalBody, ListGroupItem } from 'reactstrap';
import { useSelector, RootStateOrAny } from 'react-redux';

import { CreatedClades } from '../../../_helpers/_url-providers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CladesManagementNodeInput from './CladesManagementNodeInput';
import CladesManagementDeleteAnnotation from './CladesManagementDeleteAnnotation';


export default () => {


    const [modal, setModal] = useState(false);


    const record: CreatedClades = useSelector((state: RootStateOrAny) => (
        state.cladesDetailsReducer.record
    ));


    const status: boolean = useSelector((state: RootStateOrAny) => (
        state.cladesDetailsReducer.pending
    ));


    const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false);


    const toggle = () => setModal(!modal);


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
                <CladesManagementNodeInput
                    toggle={toggle}
                />
            </ModalBody>
        </Modal>
    );


    const nodeDescriptionCreate = (
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


    const formatedDate = () => {
        const date = record.annotation?.external_links?.annotation.created;
        return date && new Date(date).toLocaleDateString("en-US");
    };


    const nodeDescriptionDetailsView = (
        <ListGroupItem>
            <details>
                <summary className="float-right p-0 m-0">
                    <Button
                        color="link"
                        className="py-0 px-1"
                        onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                    >
                        <small className="p-0">
                            Advanced
                        </small>
                    </Button>
                </summary>
            </details>
            <strong>
                {record.annotation?.external_links?.node?.scientificName}
                &nbsp;&nbsp;
                <small className="text-muted">
                    {record.annotation?.external_links?.node?.taxonRank}
                </small>
                <div>
                    <small>
                        Created:&nbsp;&nbsp;
                        {formatedDate()}
                    </small>
                </div>
            </strong>
            {showAdvancedOptions && (
                <CladesManagementDeleteAnnotation
                    modal={modal}
                    toggle={toggle}
                />
            )}
        </ListGroupItem>
    );


    return (
        <>
            {status
                ? <Spinner color="success" />
                : record.annotation
                    ? nodeDescriptionDetailsView
                    : nodeDescriptionCreate}
        </>
    )
};