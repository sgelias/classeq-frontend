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
                        disabled={record.tree_utils?.map_clade_status === true ? false : true}
                    >
                        Upload alignment
                    </Button>
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