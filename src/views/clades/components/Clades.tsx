import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAsyncEffect } from 'use-async-effect';

import { CreatedClades } from '../../../_helpers/_url-providers';
import { BreadcrumbsItemBuilder } from '../../shared';
import { cladesServices as cs } from '../_services/_clades.services';
import CladesMsa from './CladesMsa';
import CladesList from './CladesList';
import CladesAdmin from './CladesAdmin';
import CladesSister from './CladesSister';


export default () => {


    const min_clade_length: number = 10;


    const dispatch = useDispatch();


    const params = useParams<any>();


    const [divHeight, setDivHeight] = useState<number>(0);


    const [modal, setModal] = useState(false);


    const [childClades, setChildClades] = useState<Array<CreatedClades>>([]);


    const clades: Array<CreatedClades> = useSelector((state: RootStateOrAny) => (
        state.cladesListReducer.results
    ));


    const toggle = () => setModal(!modal);


    const listClades = async (): Promise<void> => {
        (params.tid) && await cs.listClades(params.tid, dispatch);
    };


    useAsyncEffect(async () => {
        (clades.length === 0) && await listClades();
    }, []);


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
            <Row className="p-0">

                <Col
                    md={{ size: 12 }}
                    lg={{ size: 6 }}
                    className="p-0"
                >
                    <CladesList
                        min_clade_length={min_clade_length}
                    />
                </Col>

                <Col
                    md={{ size: 12 }}
                    lg={{ size: 6 }}
                    className="p-0"
                >
                    <CladesAdmin
                        min_clade_length={min_clade_length}
                        setSubItems={setSubItems}
                        toggle={toggle}
                        setDimensions={setDivHeight}
                    />
                    <CladesSister
                        height={divHeight}
                    />
                </Col>

                <CladesMsa
                    childClades={childClades}
                    modal={modal}
                    toggle={toggle}
                />
            </Row>
        </>
    )
};