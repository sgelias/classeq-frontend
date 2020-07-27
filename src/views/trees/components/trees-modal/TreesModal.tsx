import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { v4 as uuid } from 'uuid/interfaces';

import TreesCreate from '../trees-create/TreesCreate';
import TreesUpdate from '../trees-update/TreesUpdate';
import { BaseTrees, CreatedTrees } from '../../../../_helpers/url-providers';


interface Props extends BaseTrees, CreatedTrees {
    project_id: uuid,
    tree_id?: uuid,
    is_update?: boolean,
}


const TreesModal = (props: Props) => {


    const { className, is_update, tree_id } = props;


    const [ modal, setModal ] = useState(false);


    const toggle = () => setModal(!modal);


    const getComponent = () => {
        if (is_update) {
            return <TreesUpdate project_id={props.project_id} tree_id={tree_id} />;
        };

        return <TreesCreate project_id={props.project_id}/>;
    };


    const setActionType = () => {
        if (is_update) {
            return <i className="fa fa-pencil"></i>
        }

        return <i className="fa fa-plus"></i>
    };


    return (
        <span>
            <Button color="link" onClick={ toggle }>
                { setActionType() }
            </Button>

            <Modal 
                isOpen={ modal }
                className={ className }
                scrollable={ true }
                size="xl"
            >
                <ModalHeader toggle={ toggle }>
                    Upload a new phylogenetic tree
                </ModalHeader>
                
                <ModalBody>
                    { getComponent() }
                </ModalBody>
                
                <ModalFooter>
                    <Button color="secondary" onClick={ toggle }>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </span>
    );
}

export default TreesModal;