import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { v4 as uuid } from 'uuid/interfaces';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";

import TreesCreate from './TreesCreate';
import TreesUpdate from './TreesUpdate';
import { BaseTrees, CreatedTrees } from '../../../_helpers/url-providers';


interface Props extends BaseTrees, CreatedTrees {
    project_id: uuid,
    tree_id?: uuid,
    is_update?: boolean,
    label?: string,
    color?: string,
}


const TreesModal = (props: Props) => {


    const { className, is_update, tree_id } = props;


    const [ modal, setModal ] = useState(false);


    const toggle = () => setModal(!modal);


    const getComponent = () => {
        if (is_update) {
            return <TreesUpdate project_id={props.project_id} tree_id={tree_id} toggle={toggle} />;
        };

        return <TreesCreate project_id={props.project_id} toggle={toggle} />;
    };


    const setActionType = () => {
        if (is_update) {
            return <FontAwesomeIcon icon="pencil-alt" />
        }

        return <span><FontAwesomeIcon icon="plus" />&nbsp;&nbsp;</span>
    };


    return (
        <span>
            <Button 
                color={ props.color  ? props.color : 'link'  } 
                onClick={ toggle } 
                className="sm py-0" 
                data-tip="Edit record" 
            >
                { setActionType() }{ props?.label ? `${props?.label}` : null }
                <ReactTooltip />
            </Button>

            <Modal 
                isOpen={ modal }
                className={ className }
                scrollable={ true }
                size="xl"
            >
                <ModalHeader toggle={ toggle }>
                    <span className="text-muted">
                        Upload a new phylogenetic tree
                    </span>
                </ModalHeader>
                
                <ModalBody>
                    { getComponent() }
                </ModalBody>
            </Modal>
        </span>
    );
}

export default TreesModal;