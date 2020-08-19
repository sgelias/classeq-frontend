import React, { useState } from 'react';
import { Col, Card, CardHeader, CardBody, Button, CardTitle, CardSubtitle, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, RootStateOrAny } from 'react-redux';
import { useAsyncEffect } from 'use-async-effect';

import { CreatedClades, CreatedNodeDescrription } from '../../../_helpers/_url-providers';
import CladesListManagementForm from './CladesListManagementForm';
import { cladesServices as cs } from '../_services/_clades.services';


interface Props {
    setSubItems: Function,
    toggle: Function,
};


export default (props: Props) => {


    const [nodeDescription, setNodeDescription] = useState<CreatedNodeDescrription>();


    const record: CreatedClades = useSelector((state: RootStateOrAny) => (
        state.cladesDetailsReducer.record
    ));


    const status: boolean = useSelector((state: RootStateOrAny) => (
        state.cladesDetailsReducer.pending
    ));


    const getNodeDescription = () => {
        record.nodedescriptionsmodel && cs.getNodeDescription(record.nodedescriptionsmodel)
            .then(res => setNodeDescription(res.data))
            .catch(err => console.log(err));
    };


    useAsyncEffect(() => {
        getNodeDescription();
    }, [record])


    const nodeDescriptionDetailsView = (
        <>
            <h4 className="text-center my-3">
                {nodeDescription?.description}&nbsp;&nbsp;
                <small className="text-muted">{nodeDescription?.node_type}</small>
            </h4>
        </>
    );



    // CRIAR UM FORMULARIO PARA CRIAR AS ANOTAÇÕES E UM PARA TREINAR OS MODELOS A
    // PARTIR DO RAMO SELECIONADO



    const nodeDescriptionCreateOrEdit = (
        <>
            <CardTitle>
                Not associated annotations
            </CardTitle>
            <CardSubtitle className="text-muted">
                <CladesListManagementForm />
            </CardSubtitle>
        </>
    );

    
    const loading = <Spinner color="success" />;


    return !record?.uuid ? null : (
        <Col
            sm={{ size: 12 }}
            md={{ size: 6 }}
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
                    {status ? loading : (
                        record.nodedescriptionsmodel
                            ? nodeDescriptionDetailsView
                            : nodeDescriptionCreateOrEdit
                    )}

                    <hr />
                    <div>
                        <Button
                            color="link"
                            onClick={() => {
                                props.setSubItems(record);
                                props.toggle();
                            }}
                        >
                            View MSA&nbsp;&nbsp;
                            ({!(record?.child?.length && record?.child?.length > 0) ? null : (
                                record?.child?.length
                            )})
                            &nbsp;&nbsp;
                            <FontAwesomeIcon icon="align-left" />
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </Col >
    )
};