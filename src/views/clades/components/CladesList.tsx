import React, { useState } from 'react';
import { Row } from 'reactstrap';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAsyncEffect } from 'use-async-effect';

import { CreatedClades, CreatedSequences } from '../../../_helpers/_url-providers';
import { BreadcrumbsItemBuilder } from '../../shared';
import { sequencesActions as sa } from '../_reducers/_clades.actions';
import { cladesServices as cs } from '../_services/_clades.services';
import CladesListMsa from './CladesListMsa';
import CladesListClades from './CladesListClades';
import CladesListManagement from './CladesListManagement';


export default () => {


    const dispatch = useDispatch();


    const params = useParams<any>();


    const [modal, setModal] = useState(false);


    const [childClades, setChildClades] = useState<Array<CreatedClades>>([]);


    const clades: Array<CreatedClades> = useSelector((state: RootStateOrAny) => (
        state.cladesListReducer.results
    ));


    const sequences: Array<CreatedSequences> = useSelector((state: RootStateOrAny) => (
        state.sequencesListReducer.results
    ));


    const toggle = () => setModal(!modal);


    const listClades = async (): Promise<void> => {
        (params.pid && params.tid) && await cs.list(params.tid, dispatch);
    };


    const mapSequencesToClades = async (): Promise<void> => {
        clades
            .filter(item => item.branch_type === "L")
            .map(item => item.sequence = sequences.filter(sequence => (
                sequence.source_clade === item.uuid
            ))[0]);
    };


    const listSequences = async () => {
        dispatch(sa.sequencesListPending(true));
        (clades.length > 0) && (
            cs.getSequences(params.tid)
                .then(res => dispatch(sa.sequencesListSuccess(res.data)))
                .then(() => dispatch(sa.sequencesListPending(false)))
        );
    };


    useAsyncEffect(async () => {
        (clades.length === 0) && await listClades();
    }, []);


    useAsyncEffect(async () => {
        await listSequences();
    }, [clades.length]);


    useAsyncEffect(async () => {
        await mapSequencesToClades();
    }, [sequences.length]);


    const setSubItems = (item: CreatedClades) => {
        setChildClades([
            ...clades.filter(clade => (
                clade.parent === item.uuid && clade.branch_type === "B"
            )),
            ...clades.filter(clade => (
                clade.uuid && item.child?.includes(clade.uuid)
            ))
        ]);
    };


    return !(clades && clades.length > 0) ? null : (
        <>
            <BreadcrumbsItemBuilder />
            <Row className="limited">

                <CladesListClades/>

                <CladesListManagement
                    setSubItems={setSubItems}
                    toggle={toggle}
                />

                <CladesListMsa
                    childClades={childClades}
                    modal={modal}
                    toggle={toggle}
                />
            </Row>
        </>
    )
};