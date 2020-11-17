import React, { ReactChild, useState } from 'react';
import { useAsyncEffect } from 'use-async-effect';
import { useCookies } from 'react-cookie';

import { authService } from '../_services/_auth.services';
import { getOAuthAuthorizationUrl } from '../../../_helpers/_url-providers';
import { LocationInterface } from '../../../layouts/AuthLayout';


interface Props {
	width: number,
	height: number,
	title: string,
	children?: ReactChild,
	match: LocationInterface,
};


export default (props: Props) => {


	/**
	 * @description Create a read-only hook for cookies.
	 */
	const [cookie] = useCookies();


	/**
	 * @description A user state manager. User values recovered from resource
	 * server API are stored here.
	 */
	const [user, setUser] = useState<any>();


	/**
	 * @description A variable to store the popup window on start `createPopup`
	 * method.
	 * 
	 * @see `createPopup`
	 */
	const [externalWindow, setExternalWindow] = useState<any>();


	/**
	 * @description Create a method to create the authorization popup.
	 */
	const createPopup = () => {
		const { title, width, height } = props;
		const left = window.screenX + (window.outerWidth - width) / 2;
		const top = window.screenY + (window.outerHeight - height) / 2.5;
		const windowFeatures = `
			toolbar=0,
			scrollbars=1,
			status=1,
			resizable=0,
			location=1,
			menuBar=0,
			width=${width},
			height=${height},
			top=${top},
			left=${left}
		`;


		/**
		 * @description Open a popup window on Oauth2 backend address and store
		 * it at the `externalWindow` variable. It will newly redirect the user
		 * to the SSO system to get the authorization token.
		 * 
		 * @see `externalWindow`
		 */
		setExternalWindow(window.open(
			getOAuthAuthorizationUrl(), title, windowFeatures
		));
	};


	/**
	 * @description Perform all providences to finish the authorization process.
	 * Currently, close the window is the unique obligate task, but additional
	 * obligate tasks should be included, like clear some variable of session of
	 * local storages and cookies for example.
	 */
	const finishAuthorizationProcess = async () => {
		await authService.getUser(cookie.pas_auth.access_token)
			.then(res => setUser(res.data))
			.catch(err => console.log(err));
		
		window.close();
	};


	/**
	 * @description Force the window close if the authorization flow finished
	 * with success and the getUser method was resolved.
	 */
	useAsyncEffect(async () => {
		cookie.pas_auth && await finishAuthorizationProcess();
	}, [cookie.pas_auth]);


	/**
	 * @description A hook to work when component will unmount. It close the
	 * popup window stored in `externalWindow` constant if the authorization
	 * process finishes.
	 * 
	 * @see `externalWindow`
	 */
	useAsyncEffect(() => {
		return () => externalWindow &&
			setExternalWindow(externalWindow.close());
	}, []);


	return (
		<>
			{cookie.pas_auth
				? (
					<button className="btn btn-primary btn-block p-2">
						{user?.email}
					</button>
				) : (
					<button
						onClick={createPopup}
						type="button"
						className="btn btn-primary btn-block p-2"
					>
						{props.children}
					</button>
				)}
		</>
	);
};
