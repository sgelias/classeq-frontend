import React from 'react';

import { User } from '../../_helpers/_url-providers';


export default (props: any) => {

    const user: User = props.user;

    if (user?.first_name && user?.last_name) {
        return (
            <small>
                <span className="text-muted">Owner:&nbsp;</span>
                {`${user.first_name} ${user.last_name}`}
            </small>
        )
    } else {
        return (
            <small>
                <span className="text-muted">Owner:&nbsp;</span>
                {`${user?.username}`}
            </small>
        )
    }
}