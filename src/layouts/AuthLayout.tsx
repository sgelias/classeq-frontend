import React from 'react';
import LoginPage from '../views/auth/components/LoginPage';


export interface LocationInterface {
    isExact: boolean
    params: object
    path: string
    url: string
}


interface Props extends LocationInterface { }


export default (props: Props) => <LoginPage match={{ ...props }} />;
