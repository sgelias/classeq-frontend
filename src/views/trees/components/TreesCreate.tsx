import React from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid/interfaces';

import { BaseTrees } from '../../../_helpers/_url-providers';
import TreesForm from './TreesForm';
import { treesServices as ts } from '../_services/_trees.services';


interface Props {
    project_id: uuid,
    toggle: Function,
};


export default (props: Props) => {


    const dispatch = useDispatch();


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
