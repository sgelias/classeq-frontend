import React, { useState } from 'react';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { CardTitle, CardText, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { v4 as uuid } from 'uuid/interfaces';

import { treesActions as ta } from '../_reducers/trees.actions';
import { treesServices as ts } from '../_services/_trees.services';
import { CreatedTrees } from '../../../_helpers/url-providers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Trasher } from '../../shared';


interface Props {
    setList: Function,
    project_id: uuid,
};


export default (props: Props) => {


    const dispatch = useDispatch();


    const [advancedOptions, setAdvancedOptions] = useState<boolean>(false);


    const record: CreatedTrees = useSelector((state: RootStateOrAny) => (
        state.treesDetailsReducer.record
    ));


    const toogleAdvancedOptions = (value?: boolean): void => {
        if (value !== undefined) {
            setAdvancedOptions(value);
        } else {
            setAdvancedOptions(!advancedOptions);
        }
    };


    const trashRecord = async (): Promise<void> => {
        dispatch(ta.treesDetailsPending(true));
        let tmp_record = record;
        tmp_record.is_active = !tmp_record.is_active;
        await ts.update(props.project_id, record)
            .then(res => dispatch(ta.treesDetailsSuccess(res.data)))
            .then(() => dispatch(ta.treesUpdateSuccess(record)))
            .then(() => dispatch(ta.treesDetailsPending(false)))
            .catch(err => dispatch(ta.treesDetailsFail(err)));
    };


    return (
        <>
            <div>
                <hr />
                <CardTitle>
                    <span className="text-muted mr-2">Title:</span>{record.title}
                </CardTitle>
                <CardText>
                    <span className="text-muted mr-2">Description:</span>{record.description}
                </CardText>
            </div>

            <hr/>

            <div>
                <Button onClick={() => toogleAdvancedOptions()} color="link" className="py-0 px-1">
                    Advanced options
                </Button>

                <Button 
                    onClick={() => {
                        props.setList(); 
                        toogleAdvancedOptions(false);
                    }}
                    color="link float-right" 
                >
                    <FontAwesomeIcon icon="arrow-left" size="xs" />
                    &nbsp;&nbsp;&nbsp;
                    Go back
                </Button>

                {advancedOptions && (
                    <ListGroup className="mt-3">
                        <ListGroupItem>
                            <details>
                                <summary className="float-right">
                                    <Button color="success" className="py-0 px-1">
                                        Start mapping
                                    </Button>
                                </summary>
                            </details>
                            <strong>Map clades</strong>
                            <hr />
                            <p>
                                Create clade representations ...<br />
                                Internal nodes ...<br />
                                Terminal Nodes ...
                            </p>
                        </ListGroupItem>
                        <Trasher
                            trashMethod={trashRecord}
                            label={record.title}
                            record_status={record.is_active}
                        />
                    </ListGroup>
                )}
            </div>
        </>
    );
};