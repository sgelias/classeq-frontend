import React, { useState } from 'react';
import { Row } from 'reactstrap';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAsyncEffect } from 'use-async-effect';
import { v4 as uuid } from 'uuid/interfaces';

import { CreatedClades, CreatedSequences } from '../../../_helpers/_url-providers';
import { BreadcrumbsItemBuilder } from '../../shared';
import { sequencesActions as sa } from '../_reducers/_clades.actions';
import { cladesServices as cs } from '../_services/_clades.services';
import CladesListLeaves from './CladesListLeaves';
import CladesListClades from './CladesListClades';
import CladesListManagement from './CladesListManagement';


export default () => {


    const dispatch = useDispatch();


    const params = useParams<any>();


    const [childClades, setChildClades] = useState<Array<CreatedClades>>([]);


    const [itemRefs] = useState<{ [key: string]: any }>({});


    const clades: Array<CreatedClades> = useSelector((state: RootStateOrAny) => (
        state.cladesListReducer.results
    ));


    const sequences: Array<CreatedSequences> = useSelector((state: RootStateOrAny) => (
        state.sequencesListReducer.results
    ));


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
            cs.getSequences(clades.map(item => item.uuid && item?.uuid))
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


    const scrollTo = (id: string) => {
        itemRefs[id].scrollIntoView({ block: 'start', behavior: 'smooth' });
    };


    const setIndexToRef = (index: uuid, element: any) => {
        itemRefs[index.toString()] = element;
    };


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
                
                <CladesListClades 
                    setIndexToRef={setIndexToRef}
                    setSubItems={setSubItems}
                />

                <CladesListManagement />

                <CladesListLeaves 
                    childClades={childClades} 
                    scrollTo={scrollTo}
                />
            </Row>
        </>
    )
};