import React from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row, Card, CardBody } from 'reactstrap';

import { AuthCredentials } from '../../../_helpers/url-providers';


interface Auth extends AuthCredentials {
    handleChange: Function,
    handleSubmit: Function | any,
}


export default (props: Auth) => {


    const isDisabled = (
        (props.submitted && !props.username) ||
        (props.submitted || !props.password)
    );


    return (
        <Row>
            <Col md={{ size: 8, offset: 2 }}>
                <Card>
                    <CardBody>
                        <Form>

                            {/* Username */}
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Username"
                                    onChange={props.handleChange('username')}
                                    required={true}
                                />
                            </FormGroup>

                            {/* Password */}
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="*****"
                                    onChange={props.handleChange('password')}
                                    required={true}
                                />
                            </FormGroup>

                            {/* Login button */}
                            <Button 
                                color="primary"
                                disabled={isDisabled}
                                onClick={props.handleSubmit}>
                                <i className="fa fa-paper-plane"></i>&nbsp;&nbsp;Login
                            </Button>

                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}
