import React from 'react';
import { CardTitle, Spinner } from 'reactstrap';
import { useSelector, RootStateOrAny } from 'react-redux';

import { CreatedClades } from '../../../_helpers/_url-providers';


export default () => {


    const record: CreatedClades = useSelector((state: RootStateOrAny) => (
        state.cladesDetailsReducer.record
    ));


    const status: boolean = useSelector((state: RootStateOrAny) => (
        state.cladesDetailsReducer.pending
    ));


    const nodeDescriptionDetailsView = (
        <>
            <h4 className="text-center my-3">
                {record.annotation?.description}&nbsp;&nbsp;
                <small className="text-muted">{record.annotation?.node_type}</small>
            </h4>
        </>
    );


    const nodeDescriptionCreateOrEdit = (
        <CardTitle>
            Not annotated
        </CardTitle>
    );


    return (
        <>
            {status
                ? <Spinner color="success" />
                : (
                    record.annotation
                        ? nodeDescriptionDetailsView
                        : nodeDescriptionCreateOrEdit
                )}
        </>
    )
};