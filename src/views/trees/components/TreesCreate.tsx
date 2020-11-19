import React, { useState } from 'react';
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


    /**
	 * @description Create a read-only hook for cookies.
	 */
	const dispatch = useDispatch();


    /**
     * @description Set a listener for the projectsDetailsReducer state.
     */
    const record: BaseTrees = useSelector((state: RootStateOrAny) => (
        state.treesDetailsReducer.record
    ));


    //const [record, setRecord] = useState<BaseTrees>()


    const createTree = async () => {
        await ts.create(props.project_id, record);
    };


    const handleSubmit = () => {
        Promise.resolve()
            .then(async () => await createTree())
            .then(async () => await ts.list(props.project_id, dispatch))
            .then(() => props.toggle());
    };


    return (
        <TreesForm
            handleSubmit={handleSubmit}
        />
    )
};
