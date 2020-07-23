import React from 'react';
import { matchPath } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import routes from '../index';


interface BreadcrumbsItemProps {
    url: string,
    params: Object | any;
}


export const BreadcrumbsItemBuilder = (props: BreadcrumbsItemProps) => {


    const { url, params } = props;


    let parent_routes = routes
        .filter(({ path }: any) => matchPath(url, { path: path }))
        .map(({ path, ...rest }: any) => ({
            path: Object.keys(params).length
                ? Object.keys(params).reduce(
                    (path, param) => path.replace(
                        `:${param}`, params[param]
                    ), path
                ) : path,
            name: '',
            ...rest
        }));


    return (
        <div>
            {parent_routes.map(({ path, name }, key) => (
                <BreadcrumbsItem to={path} key={key}>
                    {name}
                </BreadcrumbsItem>
            ))}
        </div>
    )
}
