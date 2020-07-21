import React from 'react';
import { AuthCredentials } from '../../../_helpers/url-providers';


interface Auth extends AuthCredentials {
    handleChange: Function,
    handleSubmit: Function | any,
}


export default (props: Auth) => {

    return (
        <div className="col-md-6 col-md-offset-3">
            <div className="alert alert-info">
                Username: test<br />
                Password: test
            </div>
            <h2>Login</h2>
            <form name="form" onSubmit={props.handleSubmit}>

                {/* Username */}
                <div className={'form-group' + (props.submitted && !props.username ? ' has-error' : '')}>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="username" 
                        onChange={props.handleChange('username')}
                    />
                    {props.submitted && !props.username &&
                        <div className="help-block">Username is required</div>
                    }
                </div>

                {/* Password */}
                <div className={'form-group' + (props.submitted && !props.password ? ' has-error' : '')}>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={props.handleChange('password')}
                    />
                    {props.submitted && !props.password &&
                        <div className="help-block">Password is required</div>
                    }
                </div>

                {/* Login button */}
                <div className="form-group">
                    <button className="btn btn-primary">Login</button>
                </div>

            </form>
        </div>
    );
}
