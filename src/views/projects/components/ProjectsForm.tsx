import React from 'react';

import { BaseProject, CreatedProject } from '../../../_helpers/_url-providers';
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';


interface Project extends BaseProject, CreatedProject {
    handleChange: Function,
    handleSubmit: Function | any,
}


export default (project: Project) => {


    const isDisabled = (
        project.title === '' ||
        project.description === ''
    );


    return (
        <Row>
            <Col md={{ size: 8, offset: 2 }}>
                <Card>
                    <CardBody>
                        <Form>

                            {/* title */}
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="A brief and concise phrase that described yout project"
                                    value={project.title || ''}
                                    onChange={project.handleChange('title')}
                                    required={true} 
                                />
                            </FormGroup>

                            {/* Description */}
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input
                                    type="textarea"
                                    name="description"
                                    id="description"
                                    placeholder="A detailed description of the project"
                                    value={project.description || ''}
                                    onChange={project.handleChange('description')}
                                    required={true} 
                                />
                            </FormGroup>

                            {/* Submit button */}
                            <Button 
                                color="primary"
                                disabled={isDisabled}
                                onClick={project.handleSubmit}>
                                <i className="fa fa-paper-plane"></i>&nbsp;&nbsp;Submit
                            </Button>

                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}
