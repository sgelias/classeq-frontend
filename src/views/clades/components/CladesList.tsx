import React, { useState } from 'react';
import { v4 as uuid } from 'uuid/interfaces';
import { Row, Card, Col, CardHeader, CardFooter, CardBody, Button, Alert, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAsyncEffect } from 'use-async-effect';
import { MapInteractionCSS } from 'react-map-interaction';

import { CreatedClades } from '../../../_helpers/_url-providers';
import { BreadcrumbsItemBuilder } from '../../shared';
import { sequencesActions as sa } from '../_reducers/_clades.actions';
import { cladesServices as cs } from '../_services/_clades.services';
import { CreatedSequences } from '../../../../.history/src/_helpers/_url-providers_20200810205136';


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


    //const getLargestSequence = Math.max(...(sequences.map(el => el.length)));


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


    const internalClade = (item: CreatedClades, index: number) => {

        const childClades = clades.filter(clade => (
            clade.parent === item.uuid && clade.branch_type === "B"
        ));

        return (
            <tr key={index}>
                <td ref={el => item.uuid && setIndexToRef(item.uuid, el)}>
                    <Button
                        color="link"
                        className="p-0 text-left"
                        onClick={() => setSubItems(item)}
                    >
                        Uuid: {item.uuid}<br />
                        Parent: {item.parent}
                    </Button>
                </td>

                <td className={item?.child?.length ? "not-null-cell" : ""}>
                    {(item?.child?.length && item?.child?.length > 0)
                        ? item?.child?.length
                        : null}
                </td>

                <td className={childClades.length ? 'not-null-cell' : ""}>
                    {childClades?.length
                        ? childClades?.length
                        : null}
                </td>
            </tr>
        )
    };


    const gotTdNucleotides = (sequence: Array<string>) => (
        sequence.map((item, index) => (
            <td key={index} className={`${item} nucleotide`}>
                {item}
            </td>
        ))
    );


    const childElements = childClades.map((item, index) => (
        <tr key={index}>
            <td>
                {item.branch_type}
            </td>

            <td>
                {item.name ? item.name : (
                    <Button
                        color="link"
                        className="p-0 text-left"
                        onClick={() => (
                            item.uuid && scrollTo(item.uuid?.toString())
                        )}
                    >
                        Uuid: {item.uuid}<br />
                        Parent: {item.parent}
                    </Button>
                )}
            </td>
            {!item.sequence ? null : (
                gotTdNucleotides(item.sequence.fasta_sequence.toLowerCase().split(''))
            )}
        </tr>
    ));


    const cladesCol = (
        <Col
            sm={{ size: 12 }}
            md={{ size: 6 }}
        >
            <Card>
                <CardHeader className="border-bottom">
                    <h3>
                        <FontAwesomeIcon icon="code-branch" size="xs" />
                        &nbsp;&nbsp;&nbsp;
                        Clades
                    </h3>
                </CardHeader>

                <CardBody className="pt-1 clades-card">
                    <Table hover className="tableBodyScroll">
                        <thead>
                            <tr>
                                <th>Identification</th>
                                <th>Leaves</th>
                                <th>Clades</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clades
                                .filter(item => item.branch_type === "B" || item.branch_type === "R")
                                .map((item, index) => internalClade(item, index))}
                        </tbody>
                    </Table>
                </CardBody>

                <CardFooter />
            </Card>
        </Col>
    );


    const childCol = (
        <Col
            sm={{ size: 12 }}
            md={{ size: 12 }}
        >
            <Card>
                <CardHeader className="border-bottom">
                    <h3>
                        <FontAwesomeIcon icon="leaf" size="xs" />
                        &nbsp;&nbsp;&nbsp;
                        Leaves
                    </h3>
                </CardHeader>

                <CardBody className="pt-1 clades-card">
                    {!(childElements.length > 0)
                        ? <Alert color="mt-2 light">Select a clade to start.</Alert>
                        : (
                            <Table hover className="tableBodyScroll">
                                <tbody className="not-overflow">
                                <MapInteractionCSS
                                    showControls="true"
                                    maxScale="90"
                                    //disableZoom="false"
                                >
                                    {childElements}
                                </MapInteractionCSS>
                                </tbody>
                            </Table>
                        )}
                </CardBody>

                <CardFooter />
            </Card>
        </Col >
    );


    return !(clades && clades.length > 0) ? null : (
        <>
            <BreadcrumbsItemBuilder />
            <Row className="limited">
                {cladesCol}
                {childCol}
            </Row>
        </>
    )
};