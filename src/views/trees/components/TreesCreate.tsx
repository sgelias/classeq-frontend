import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { BaseTrees } from '../../../_helpers/_url-providers';
import React from 'react';
import TreesForm from './TreesForm';
import { treesServices as ts } from '../_services/_trees.services';
import { v4 as uuid } from 'uuid/interfaces';

interface Props {
    project_id: uuid,
    toggle: Function,
};


export default (props: Props) => {


    const dispatch = useDispatch();


    //const record: BaseTrees = useSelector(() => ({}));


    const record: BaseTrees = useSelector((state: RootStateOrAny) => (
        state.treesDetailsReducer.record
    ));


    const createTree = async (record: BaseTrees) => {
        await ts.create(props.project_id, record);
    };


    const handleSubmit = () => {
        Promise.resolve()
            .then(async () => await createTree(record))
            .then(async () => await ts.list(props.project_id, dispatch))
            .then(() => props.toggle());
    };


    return (
        <TreesForm
            handleSubmit={handleSubmit}
        />
    )
};