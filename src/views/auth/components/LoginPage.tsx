import React from 'react';
import { connect } from 'react-redux';

import { AuthCredentials } from '../../../_helpers/url-providers';
import { authActions } from '../../auth/_reducers/auth.actions';
import LoginPageView from './LoginPageView';


interface DispatchProps {
    dispatch: (method: any) => void,
    authentication?: any,
    loggingIn?: any,
}


interface StateProps extends AuthCredentials {}


class LoginPage extends React.Component<DispatchProps> {


    state: StateProps = {
        username: undefined,
        password: undefined,
        submitted: false,
    };


    constructor(props: any) {
        super(props);
        this.props.dispatch(authActions.logout());
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };


    private handleChange(input: any) {
        return (event: any) => {
            this.setState({
                [input]: event.target.value,
            })
        }
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


const mapStateToProps = (state: DispatchProps): DispatchProps => ({
    loggingIn: state.authentication,
    dispatch: state.dispatch,
});


export default connect(
    mapStateToProps
)(LoginPage);