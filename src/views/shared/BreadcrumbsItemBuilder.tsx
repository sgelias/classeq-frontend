import React, { useEffect, useState } from 'react';
import { matchPath, useLocation, useParams } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import routes from '../index';


interface CurrentRoute {
    url: any,
    params: any,
};


export default () => {


    const location = useLocation();


    const params = useParams();


    const [parentRoutes, setParentRoutes] = useState<Array<any>>([]);


    const [currentRoute] = useState<CurrentRoute>({
        url: location,
        params: params,
    });


    useEffect(() => {
        setParentRoutes(routes
            .filter(({ path }: any) => matchPath(currentRoute.url.pathname, { path: path }))
            .map(({ path, ...rest }: any) => ({
                name: '',
                path: Object.keys(currentRoute.params).length
                    ? Object.keys(currentRoute.params).reduce(
                        (path: any, param: string) => path.replace(`:${param}`, currentRoute.params[param]), path)
                    : path,
                ...rest
            })))
    }, [currentRoute]);


    return (
        <>
            {parentRoutes.map(({ path, name }, key) => (
                <BreadcrumbsItem to={path} key={key}>
                    {name}
                </BreadcrumbsItem>
            ))}
        </>
    )
};