import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAsyncEffect } from 'use-async-effect';
import { useCookies } from 'react-cookie';

import { CreatedClades } from '../../../_helpers/_url-providers';
import { BreadcrumbsItemBuilder } from '../../shared';
import { cladesServices as cs } from '../_services/_clades.services';
import CladesMsa from './MSA/CladesMsa';
import CladesList from './List/CladesList';
import Admin from './Admin/Admin';
import CladesSister from './Sister/CladesSister';


export default () => {


    /**
	 * @description Create a read-only hook for cookies.
	 */
    const [cookie] = useCookies();
    
    
    /**
     * @description Set a dispatcher for state management.
     */
    const dispatch = useDispatch();


    const min_clade_length: number = 10;


    const params = useParams<any>();


    const [divHeight, setDivHeight] = useState<number>(0);


    const [modal, setModal] = useState(false);


    const [childClades, setChildClades] = useState<Array<CreatedClades>>([]);


    const clades: Array<CreatedClades> = useSelector((state: RootStateOrAny) => (
        state.cladesListReducer.results
    ));


    const toggle = () => setModal(!modal);


    const listClades = async (): Promise<void> => {
        (params.tid) && await cs.listClades(
            cookie.pas_auth.access_token, params.tid, dispatch);
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
                    <Admin
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