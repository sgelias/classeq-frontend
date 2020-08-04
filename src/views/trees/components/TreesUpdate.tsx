import React from 'react';
import { v4 as uuid } from 'uuid/interfaces';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useAsyncEffect } from 'use-async-effect';

import { CreatedTrees } from '../../../_helpers/_url-providers';
import { treesActions as ta } from '../_reducers/_trees.actions';
import { treesServices as ts } from '../_services/_trees.services';
import TreesForm from './TreesForm';


interface Props extends CreatedTrees {
    project_id: uuid,
    tree_id?: uuid,
    toggle: Function,
};


export default (props: Props) => {


    const dispatch = useDispatch();


    const record: CreatedTrees = useSelector((state: RootStateOrAny) => (
        state.treesDetailsReducer.record
    ));


    useAsyncEffect(() => {
        dispatch(ta.treesDetailsPending(true));
        if (props.tree_id) {
            ts.get(props.project_id, props.tree_id)
                .then(res => {
                    dispatch(ta.treesDetailsSuccess(res.data));
                    dispatch(ta.treesDetailsPending(false));
                })
                .catch(err => dispatch(ta.treesDetailsFail(err)));
        }
    }, []);


    const handleSubmit = async () => {
        dispatch(ta.treesDetailsPending(true));
        await ts.update(props.project_id, record)
            .then(res => dispatch(ta.treesDetailsSuccess(res.data)))
            .then(() => dispatch(ta.treesUpdateSuccess(record)))
            .then(() => dispatch(ta.treesDetailsPending(false)))
            .then(() => props.toggle())
            .catch(err => dispatch(ta.treesDetailsFail(err)));
    };


    return !record.uuid ? null : (
        <TreesForm
            title={record.title}
            description={record.description}
            gene={record.gene}
            tree={record.tree}
            related_tree={record.related_tree}
            handleSubmit={handleSubmit}
        />
    )
};