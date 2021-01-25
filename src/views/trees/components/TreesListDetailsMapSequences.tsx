import { Badge, Button, ListGroupItem, Modal, Spinner } from 'reactstrap';
import React, { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

import { CreatedTrees } from '../../../_helpers/_url-providers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { treesServices as ts } from '../_services/_trees.services';
import { v4 as uuid } from 'uuid/interfaces';


interface Props {
    project_id: uuid
};


export default (props: Props) => {


    /**
	 * @description Create a read-only hook for cookies.
	 */
    const [cookie] = useCookies();
    
    
    /**
     * @description Set a dispatcher for state management.
     */
    const dispatch = useDispatch();


    const [modal, setModal] = useState(false);


    const [generatingSequenceFeatures, setGeneratingSequenceFeatures] = useState<boolean>(false);


    const record: CreatedTrees = useSelector((state: RootStateOrAny) => (
        state.treesDetailsReducer.record
    ));


    const toggle = () => setModal(!modal);


    const handleSubmit = () => {
        setGeneratingSequenceFeatures(true);
        (record.uuid && ts.mapSequenceFeatures(cookie.pas_auth.access_token, record.uuid)
            .then(() => setGeneratingSequenceFeatures(true))
            .then(() => updateTreesListAndDetailsStatus())
            .then(() => toggle())
            .catch(err => console.log(err)));
    };


    const updateTreesListAndDetailsStatus = async () => {
        await ts.list(cookie.pas_auth.access_token, props.project_id, dispatch);
    };


    const mapSequenceFeaturesModal = (
        <Modal
            isOpen={modal}
            className="success"
            scrollable={true}
            size="xl"
        >
            <div className="mb-3">
                <Button
                    color="link"
                    onClick={() => toggle()}
                >
                    &times;&nbsp;&nbsp;Cancel
                </Button>
            </div>
            <Button
                color="primary"
                onClick={() => handleSubmit()}>
                {!generatingSequenceFeatures
                    ? "Map sequence features"
                    : <Spinner type="grow" color="light" />}
            </Button>
        </Modal>
    );


    return (
        <ListGroupItem>
            <details>
                <summary className="float-right">
                    {record.tree_utils?.map_features_status
                        ? (
                            <Badge color="light">
                                <FontAwesomeIcon icon="check" color="green" />
                            </Badge>
                        ) : (
                            <Button
                                color="primary"
                                className="py-0 px-1"
                                onClick={() => toggle()}
                                disabled={(
                                    record.tree_utils?.map_clade_status === true &&
                                    record.tree_utils.upload_sequences_status === true
                                ) ? false : true}
                            >
                                Map features
                            </Button>
                        )}
                    {mapSequenceFeaturesModal}
                </summary>
            </details>
            <strong>
                Map sequence features<small className="text-muted ml-2">(Step three)</small>
            </strong>
            <p>
                Sequence features are used to train machine learning models of Clades.
            </p>
        </ListGroupItem>
    )
};