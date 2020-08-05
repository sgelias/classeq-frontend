import React from 'react';
import { ListGroupItem, Button } from 'reactstrap';

import { CreatedTrees } from '../../../_helpers/_url-providers';
import { useSelector, RootStateOrAny } from 'react-redux';


export default () => {


    const record: CreatedTrees = useSelector((state: RootStateOrAny) => (
        state.treesDetailsReducer.record
    ));


    return (
        <ListGroupItem>
            <details>
                <summary className="float-right">
                    <Button
                        color="primary"
                        className="py-0 px-1"
                        disabled={(
                            record.tree_utils?.map_clade_status === true &&
                            record.tree_utils.upload_sequences_status === true
                        ) ? false : true}
                    >
                        Map features
                    </Button>
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