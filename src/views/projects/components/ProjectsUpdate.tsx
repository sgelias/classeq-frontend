import React from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useAsyncEffect } from 'use-async-effect';

import { BreadcrumbsItemBuilder } from '../../shared';
import { CreatedProject } from '../../../_helpers/_url-providers';
import ProjectsForm from './ProjectsForm';
import { projectServices as ps } from '../_services/_projects.services';
import { projectsActions as pa } from '../_reducers/_projects.actions';
import { useCookies } from 'react-cookie';


export default () => {


    /**
	 * @description Create a read-only hook for cookies.
	 */
	const [cookie] = useCookies();


    /**
     * @description Set a dispatcher for state management.
     */
    const dispatch = useDispatch();


    /**
     * @description Set a listener for the projectsDetails state.
     */
    const record: CreatedProject = useSelector((state: RootStateOrAny) => (
        state.projectsDetailsReducer.record
    ));


    /**
     * @description Start a record update flow on submit the form.
     * 
     * @see `projectsDetailsPending` projects action.
     * @see `projectsUpdateSuccess` projects action.
     * @see `projectsDetailsFail` projects action.
     */
    const handleSubmit = async () => {
        dispatch(pa.projectsDetailsPending(true));
        await ps.update(record, cookie.pas_auth.access_token)
            .then(res => dispatch(pa.projectsDetailsSuccess(res.data)))
            .then(() => dispatch(pa.projectsUpdateSuccess(record)))
            .then(() => dispatch(pa.projectsDetailsPending(false)))
            .catch(err => dispatch(pa.projectsDetailsFail(err)));
    };


    /**
     * @description Get a single project at the component start.
     * 
     * @see `projectsDetailsPending` projects action.
     * @see `projectsUpdateSuccess` projects action.
     * @see `projectsDetailsFail` projects action.
     */
    useAsyncEffect(() => {
        dispatch(pa.projectsDetailsPending(true));
        record.uuid && ps.get(record.uuid, cookie.pas_auth.access_token)
            .then(res => {
                dispatch(pa.projectsDetailsSuccess(res.data));
                dispatch(pa.projectsDetailsPending(false));
            })
            .catch(err => dispatch(pa.projectsDetailsFail(err)));
    }, []);


    return !record.uuid ? null : (
        <>
            <BreadcrumbsItemBuilder />
            <ProjectsForm handleSubmit={handleSubmit} />
        </>
    )
};
