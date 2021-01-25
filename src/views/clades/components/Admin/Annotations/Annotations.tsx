import React, { createRef } from 'react';
import { Spinner, Button, ListGroupItem } from 'reactstrap';
import { useSelector, RootStateOrAny } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CreatedClades } from '../../../../../_helpers/_url-providers';
import DeleteAnnotation, { DeleteAnnotationHandle } from './DeleteAnnotation';
import NodeInput, { NodeInputHandle } from './NodeInput';


/* 

https://github.com/alewin/useWorker
https://www.npmjs.com/package/react-use-queue
https://kentcdodds.com/blog/speed-up-your-app-with-web-workers


*/


export default () => {


    const deleteModalRef = createRef<DeleteAnnotationHandle>();


    const nodeInputRef = createRef<NodeInputHandle>();


    const clade: CreatedClades = useSelector((state: RootStateOrAny) => (
        state.cladesDetailsReducer.record
    ));


    const status: boolean = useSelector((state: RootStateOrAny) => (
        state.cladesDetailsReducer.pending
    ));

    
    const nodeDescriptionCreate = (
        <ListGroupItem>
            <details>
                <summary className="float-right">
                    <Button
                        color="primary"
                        className="py-0 px-1"
                        onClick={() => nodeInputRef.current?.showAnnotationModal()}
                    >
                        ANNOTATE
                        &nbsp;&nbsp;
                        <FontAwesomeIcon icon="pencil-alt" />
                    </Button>
                </summary>
            </details>
            <strong>
                <FontAwesomeIcon icon="exclamation-triangle" />
                &nbsp;&nbsp;
                Pending annotation
            </strong>
            <p className="mt-4 mb-1">
                Each clade would be connected to a node of the backbone tree.
                Click in Annotate to connect this node to backbone.
            </p>
            <NodeInput ref={nodeInputRef} />
        </ListGroupItem>
    );


    const formatedDate = () => {
        const date = clade.annotation?.external_links?.annotation.created;
        return date && new Date(date).toLocaleDateString("en-US");
    };


    const nodeDescriptionDetailsView = (
        <ListGroupItem>
            <details>
                <summary className="float-right p-0 m-0">
                    <Button
                        color="link"
                        className="py-0 px-1"
                        onClick={() => deleteModalRef.current?.showAdvancedOptions()}
                    >
                        <small className="p-0">
                            Advanced
                        </small>
                    </Button>
                </summary>
            </details>
            <strong>
                {clade.annotation?.external_links?.node?.scientificName}
                &nbsp;&nbsp;
                <small className="text-muted">
                    {clade.annotation?.external_links?.node?.taxonRank}
                </small>
                <div>
                    <small>
                        Created:&nbsp;&nbsp;
                        {formatedDate()}
                    </small>
                </div>
            </strong>
            <DeleteAnnotation ref={deleteModalRef} />
        </ListGroupItem>
    );


    return (
        <>
            {status
                ? <Spinner color="success" />
                : clade.annotation
                    ? nodeDescriptionDetailsView
                    : nodeDescriptionCreate}
        </>
    )
};