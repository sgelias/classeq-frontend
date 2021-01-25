import React from 'react';
import { CreatedProject } from '../../_helpers/_url-providers';


interface Props extends CreatedProject {}


export default (props: Props) => {

    const { created, updated } = props;

    if (created && updated) {
        return (
            <small className="text-muted">
                {created && (
                    <>
                        Created in&nbsp;
                        {new Date(created).toLocaleDateString("en-US")},&nbsp;
                    </>
                )}
                {updated && (
                    <>
                        updated in&nbsp;
                        {updated && new Date(updated).toLocaleDateString("en-US")}.
                    </>
                )}
            </small>
        )
    } else {
        return <small></small>
    }
}