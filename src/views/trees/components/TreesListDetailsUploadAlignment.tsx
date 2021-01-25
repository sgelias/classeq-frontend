import { Badge, Button, Form, FormGroup, Input, ListGroupItem, Modal, Spinner } from 'reactstrap';
import React, { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

import { CreatedTrees } from '../../../_helpers/_url-providers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { treesServices as ts } from '../_services/_trees.services';
import { v4 as uuid } from 'uuid/interfaces';


interface Props {
    project_id: uuid,
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


    const [uploadingAlignment, setUploadingAlignment] = useState<boolean>(false);


    const [msa, setMsa] = useState<string>();


    const record: CreatedTrees = useSelector((state: RootStateOrAny) => (
        state.treesDetailsReducer.record
    ));


    const toggle = () => setModal(!modal);


    const handleSubmit = () => {
        setUploadingAlignment(true);
        (record.uuid && msa) && ts.uploadAlignment(
            cookie.pas_auth.access_token, record.uuid, msa
        )
            .then(() => setMsa(''))
            .then(() => setUploadingAlignment(true))
            .then(() => updateTreesListAndDetailsStatus())
            .then(() => toggle())
            .catch(err => console.log(err));
    };


    const updateTreesListAndDetailsStatus = async () => {
        await ts.list(cookie.pas_auth.access_token, props.project_id, dispatch);
    };


    const uploadModal = (
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
            <Form>
                {/* Fasta input field */}
                <FormGroup>
                    <Input
                        type="textarea"
                        name="filter"
                        id="filter"
                        placeholder="Paste your multiple sequence alignment."
                        onChange={el => setMsa(el.target.value)}
                        rows="6"
                    />
                </FormGroup>

                {/* Submit button */}
                <Button
                    color="primary"
                    onClick={() => handleSubmit()}>
                    {!uploadingAlignment
                        ? "Upload alignment"
                        : <Spinner type="grow" color="light" />}
                </Button>
            </Form>
        </Modal>
    );


    return (
        <ListGroupItem>
            <details>
                <summary className="float-right">
                    {record.tree_utils?.upload_sequences_status
                        ? (
                            <Badge color="light">
                                <FontAwesomeIcon icon="check" color="green" />
                            </Badge>
                        ) : (
                            <Button
                                color="primary"
                                className="py-0 px-1"
                                onClick={() => toggle()}
                                disabled={record.tree_utils?.map_clade_status === true ? false : true}
                            >
                                Upload alignment
                            </Button>
                        )}
                    {uploadModal}
                </summary>
            </details>
            <strong>
                Supply tree alignment<small className="text-muted ml-2">(Step two)</small>
            </strong>
            <p>
                Tree alignment are used to validate sequences and generate sequence features (step three).
            </p>
        </ListGroupItem>
    )
};