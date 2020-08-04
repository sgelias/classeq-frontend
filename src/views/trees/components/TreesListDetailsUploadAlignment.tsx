import React from 'react';
import { ListGroupItem, Button } from 'reactstrap';


export default () => {

    return (
        <ListGroupItem>
            <details>
                <summary className="float-right">
                    <Button color="primary" className="py-0 px-1">
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