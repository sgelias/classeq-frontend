import React from 'react';
import { CreatedProject } from '../../_helpers/url-providers';


interface Props extends CreatedProject {}


export default (props: Props) => {

    const { created, updated } = props;

    if (created && updated) {
        return (
            <small className="text-muted">
                Created in&nbsp;
                {new Date(created).toLocaleDateString("en-US")},&nbsp;
                updated in&nbsp;
                {new Date(updated).toLocaleDateString("en-US")}.
            </small>
        )
    } else {
        return <small></small>
    }
}