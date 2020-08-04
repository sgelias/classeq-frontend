import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { v4 as uuid } from 'uuid/interfaces';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";

import TreesCreate from './TreesCreate';
import TreesUpdate from './TreesUpdate';
import { BaseTrees, CreatedTrees } from '../../../_helpers/_url-providers';


interface Props extends BaseTrees, CreatedTrees {
    project_id: uuid,
    tree_id?: uuid,
    is_update?: boolean,
    label?: string,
    color?: string,
};


export default (props: Props) => {


    const [modal, setModal] = useState(false);


    const toggle = () => setModal(!modal);


    const getComponent = () => {
        return props.is_update
            ? <TreesUpdate project_id={props.project_id} tree_id={props.tree_id} toggle={toggle} />
            : <TreesCreate project_id={props.project_id} toggle={toggle} />;
    };


    const setActionType = () => {
        return props.is_update
            ? <FontAwesomeIcon icon="pencil-alt" />
            : <span><FontAwesomeIcon icon="plus" />&nbsp;&nbsp;</span>;
    };


    return (
        <>
            <Button
                color={props.color ? props.color : 'link'}
                onClick={toggle}
                className="sm py-0"
                data-tip="Edit record"
            >
                {setActionType()}{props?.label ? `${props?.label}` : null}
                <ReactTooltip />
            </Button>

            <Modal
                isOpen={modal}
                className={props.className}
                scrollable={true}
                size="xl"
            >
                <ModalHeader toggle={toggle}>
                    <span className="text-muted">
                        Upload a new phylogenetic tree
                    </span>
                </ModalHeader>

                <ModalBody>
                    {getComponent()}
                </ModalBody>
            </Modal>
        </>
    );
};