import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { RootStateOrAny, useSelector } from 'react-redux';

import { BaseProject } from '../../../_helpers/_url-providers';
import { BreadcrumbsItemBuilder } from '../../shared';
import ProjectsForm from './ProjectsForm';
import { projectServices as ps } from '../_services/_projects.services';


export default () => {


	/**
	 * @description Create a read-only hook for cookies.
	 */
	const [cookie] = useCookies();


	/**
	 * @description A hook the 
	 */
	const record: BaseProject = useSelector((state: RootStateOrAny) => (
		state.projectsDetailsReducer.record
	));


	const createProject = () => {
		ps.create(record, cookie.pas_auth.access_token)
			.then(res => console.log(res));
	};


	const handleSubmit = (event: Event) => {
		event.preventDefault();
		createProject();
	};


	return (
		<>
			<BreadcrumbsItemBuilder />
			<ProjectsForm handleSubmit={handleSubmit} />
		</>
	)
};
