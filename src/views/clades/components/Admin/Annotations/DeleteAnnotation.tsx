import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, Button, ModalBody, Label, Input, Form, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAsyncEffect } from 'use-async-effect';

import { cladesServices as cs } from '../../../_services/_clades.services';
import { cladesActions as ca } from '../../../_reducers/_clades.actions';
import { CreatedClades } from '../../../../../_helpers/_url-providers';


export interface DeleteAnnotationHandle {
    showAdvancedOptions: () => void,
};


const DeleteAnnotation: React.RefForwardingComponent<DeleteAnnotationHandle> = (_, ref) => {


    const dispatch = useDispatch();


    const params = useParams<any>();


    const [term, setTerm] = useState<string>('');


    const [deleting, setDeleting] = useState<boolean>(false);


    const [deleteModal, setDeleteModal] = useState(false);


    const [advancedOptions, setAdvancedOptions] = useState<boolean>(false);


    const showAdvancedOptions = () => {
        setAdvancedOptions(!advancedOptions);
    };


    const toggle = () => setDeleteModal(!deleteModal);


    useImperativeHandle(ref, () => {
        return { showAdvancedOptions };
    });


    const handleChange = (element) => setTerm(element.target.value);


    const clade: CreatedClades = useSelector((state: RootStateOrAny) => (
        state.cladesDetailsReducer.record
    ));


    const clades = useSelector((state: RootStateOrAny) => (
        state.cladesListReducer.results
    ));


    useAsyncEffect(() => {
        const item = clades.filter(item => item.uuid === clade.uuid)[0]
        dispatch(ca.cladesDetailsSuccess(item))
    }, [clades]);


    const listClades = async (): Promise<void> => {
        (params.tid) && await cs.listClades(params.tid, dispatch);
    };


    const deleteAnnotatedClade = () => {
        setDeleting(true);
        const clade_id = clade.annotation?.external_links?.annotation.id;
        (clade_id && clade.uuid) && cs.deleteAnnotatedClade(clade_id, clade.uuid)
            .then(() => listClades())
            .then(() => setAdvancedOptions(false))
            .then(() => setDeleting(false))
            .then(() => toggle())
            .catch(() => {
                alert("Some error occurred. Please try again.")
                setDeleting(false);
            });
    };


    return !advancedOptions ? null : (
        <div className="my-4 p-4 bg-light-grey border border-danger">
            Delete annotation.
            <Button
                color="danger"
                className="py-0 px-1 float-right"
                onClick={() => toggle()}
            >
                Delete&nbsp;&nbsp;
                <FontAwesomeIcon icon="trash" />
            </Button>
            <Modal
                isOpen={deleteModal}
                className="success"
                scrollable={true}
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
                    <Form>
                        <Label for="gene">
                            Type <strong>delete me</strong> if you're sure you want to continue.
                        </Label>
                        <Input
                            type="text"
                            name="gene"
                            id="gene"
                            autoFocus={true}
                            required={true}
                            placeholder="Search a node of backbone tree."
                            value={term}
                            onChange={el => handleChange(el)}
                            onKeyDown={ev => ev.key === 'Enter' && ev.preventDefault()}
                        />
                        {term === "delete me" && (
                            <Button
                                color="danger"
                                className="mt-5 btn-block"
                                onClick={() => deleteAnnotatedClade()}
                                disabled={deleting}
                            >
                                {deleting
                                    ? <Spinner/>
                                    : <strong>Permanently delete</strong>}
                            </Button>
                        )}
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
};


export default forwardRef(DeleteAnnotation);