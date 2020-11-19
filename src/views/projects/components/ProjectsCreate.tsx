import React from 'react';
import { useCookies } from 'react-cookie';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { BaseProject } from '../../../_helpers/_url-providers';
import { BreadcrumbsItemBuilder } from '../../shared';
import ProjectsForm from './ProjectsForm';
import { projectServices as ps } from '../_services/_projects.services';


export default () => {


	/**
	 * @description Create a read-only hook for cookies.
	 */
	const dispatch = useDispatch();


    /**
	 * @description Create a read-only hook for cookies.
	 */
	const [cookie] = useCookies();


	/**
     * @description Set a listener for the projectsDetailsReducer state.
     */
    const record: BaseProject = useSelector((state: RootStateOrAny) => (
		state.projectsDetailsReducer?.record
	));


	/**
	 * @description Submit a new project to 
	 */
	const createProject = async () => {
		await ps.create(record, cookie.pas_auth.access_token)
			.then(res => console.log(res));
	};


	/**
	 * @description Submit a form using values from `ProjectsForm` component and
	 * update the `projectsListReducer` on finish the transaction.
	 * 
	 * @see `ProjectsForm` component.
	 * @see `projectsListReducer` reducer.
	 */
	const handleSubmit = () => {
		Promise.resolve()
            .then(async () => await createProject())
            .then(async () => await ps.list(
				cookie.pas_auth.access_token, dispatch
			));
	};


	return (
		<>
			<BreadcrumbsItemBuilder />
			<ProjectsForm handleSubmit={handleSubmit} />
		</>
	)
};
