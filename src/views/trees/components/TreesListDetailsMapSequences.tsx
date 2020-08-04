import React from 'react';
import { ListGroupItem, Button } from 'reactstrap';


export default () => {

    return (
        <ListGroupItem>
            <details>
                <summary className="float-right">
                    <Button color="primary" className="py-0 px-1">
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