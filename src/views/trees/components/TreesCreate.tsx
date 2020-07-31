import React from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { v4 as uuid } from 'uuid/interfaces';

import { BaseTrees, Gene } from '../../../_helpers/url-providers';
import { treesActions as ta } from '../_reducers/trees.actions';
import { treesServices as ts } from '../_services/_trees.services';
import TreesForm from './TreesForm';


interface Props {
    project_id: uuid,
    toggle: Function,
};


const TreesCreate = (props: Props) => {


    const dispatch = useDispatch();


    const record: BaseTrees = useSelector((state: RootStateOrAny) => ({}));


    const createTree = async (record: BaseTrees) => {
        await ts.create(props.project_id, record)
            .then(res => console.log(res));
    };


    const handleSubmit = () => {
        Promise.resolve()
            .then(async () => await createTree(record))
            .then(async () => await ts.list(props.project_id, dispatch))
            .then(() => props.toggle());
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


    return (
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


export default TreesCreate;