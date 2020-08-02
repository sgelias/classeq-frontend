import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid/interfaces';

import { BaseTrees } from '../../../_helpers/url-providers';
import { treesServices as ts } from '../_services/_trees.services';
import TreesForm from './TreesForm';


interface Props {
    project_id: uuid,
    toggle: Function,
};


export default (props: Props) => {


    const dispatch = useDispatch();


    const record: BaseTrees = useSelector(() => ({}));


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
            title={record.title}
            description={record.description}
            gene={record.gene}
            tree={record.tree}
            related_tree={record.related_tree}
            handleSubmit={handleSubmit}
        />
    )
};