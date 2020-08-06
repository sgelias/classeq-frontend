import { Button, CardText, ListGroup } from 'reactstrap';
import React, { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { CreatedTrees } from '../../../_helpers/_url-providers';
import { Trasher } from '../../shared';
import TreesListDetailsMapClades from './TreesListDetailsMapClades';
import TreesListDetailsMapSequences from './TreesListDetailsMapSequences';
import TreesListDetailsUploadAlignment from './TreesListDetailsUploadAlignment';
import { treesActions as ta } from '../_reducers/_trees.actions';
import { treesServices as ts } from '../_services/_trees.services';
import { v4 as uuid } from 'uuid/interfaces';

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
        value !== undefined
            ? setAdvancedOptions(value)
            : setAdvancedOptions(!advancedOptions);
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


    const deleteRecord = async (): Promise<void> => {
        if (record.uuid) {
            await ts.deleteRecord(props.project_id, record.uuid)
                .then(async () => await ts.list(props.project_id, dispatch))
                .then(() => props.setList());
        }
    };


    return (
        <>
            <div>
                <hr />
                <CardText>
                    <span className="text-muted mr-2">Title:</span>{record.title}
                </CardText>
                <CardText>
                    <span className="text-muted mr-2">Description:</span>{record.description}
                </CardText>
            </div>

            <hr />

            <div>
                <CardText>
                    Validations
                </CardText>
                <ListGroup className="mt-3">
                    {record.uuid && (
                        <TreesListDetailsMapClades
                            project_id={props.project_id}
                            tree_id={record.uuid}
                        />
                    )}
                    <TreesListDetailsUploadAlignment
                        project_id={props.project_id}
                    />
                    <TreesListDetailsMapSequences
                        project_id={props.project_id}
                    />
                </ListGroup>
            </div>

            <br />

            <div>
                <Button
                    onClick={() => toogleAdvancedOptions()}
                    color="link"
                    className="py-0 px-1"
                >
                    Advanced options
                </Button>

                {advancedOptions && (
                    <ListGroup className="mt-3">
                        <Trasher
                            trashMethod={trashRecord}
                            deleteMethod={deleteRecord}
                            label={record.title}
                            record_status={record.is_active}
                        />
                    </ListGroup>
                )}
            </div>
        </>
    );
};