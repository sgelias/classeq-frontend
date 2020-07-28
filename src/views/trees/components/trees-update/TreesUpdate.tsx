import React from 'react';
import { v4 as uuid } from 'uuid/interfaces';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useAsyncEffect } from 'use-async-effect';

import { CreatedTrees, Gene } from '../../../../_helpers/url-providers';
import { treesActions as ta } from '../../_reducers/trees.actions';
import { treesServices as ts } from '../_trees.services';
import TreesForm from '../trees-form-single/TreesForm';


interface Props extends CreatedTrees {
    project_id: uuid,
    tree_id?: uuid,
    toggle: Function,
}


const TreesUpdate = (props: Props) => {


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
        await ts.update(props.project_id, record)
            .then(res => dispatch(ta.treesDetailsSuccess(res.data)))
            .then(() => dispatch(ta.treesUpdateSuccess(record)))
            .then(() => props.toggle())
            .catch(err => dispatch(ta.treesDetailsFail(err)));
    };


    const handleGeneInput = (value: Gene) => {
        try {
            dispatch(ta.treesDetailsSuccess({ gene: value }));
        } catch (err) {
            dispatch(ta.treesDetailsFail(err));
        };
    };


    const handleChange = (input: any) => {
        return (event: any) => {
            try {
                dispatch(ta.treesDetailsSuccess({ [input]: event.target.value }));
            } catch (err) {
                dispatch(ta.treesDetailsFail(err));
            };
        }
    };


    return !record.uuid
        ? null
        : (
            <TreesForm
                title={record.title}
                description={record.description}
                gene={record.gene}
                tree={record.tree}
                related_tree={record.related_tree}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleGeneInput={handleGeneInput}
            />
        )
};


export default TreesUpdate;