import React from 'react';
import { connect } from 'react-redux';

import { authActions } from '../../_reducers/auth.actions';
import LoginPageView from './LoginPageView';
import { RouteComponentProps } from 'react-router-dom';
import { AuthCredentials } from '../../../../_helpers/url-providers';


interface Props extends RouteComponentProps {
    dispatch: (method: any) => void,
    authentication?: any,
}


interface State extends AuthCredentials {
    loggingIn?: any,
}


class LoginPage extends React.Component<Props, State | {}> {


    public state: any = {
        username: undefined,
        password: undefined,
        submitted: false,
    };


    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };


    private handleSubmit(event: any) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(authActions.login(username, password));
        }
    };


    private handleChange(input: any) {
        return (event: any) => {
            this.setState({
                [input]: event.target.value,
            })
        }
    };


    render() {
        const { username, password, submitted } = this.state;

        return (
            <LoginPageView 
                username={username}
                password={password}
                submitted={submitted}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />
        );
    };
}


const mapStateToProps = (props: Props) => ({
    loggingIn: props.authentication,
    dispatch: props.dispatch,
});


const connectedLoginPage = connect(
    mapStateToProps
)(LoginPage);


export { connectedLoginPage as LoginPage };