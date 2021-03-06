import React from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import {
    Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row
} from 'reactstrap';

import { CreatedProject } from '../../../_helpers/_url-providers';
import { projectsActions as pa } from '../_reducers/_projects.actions';


interface Props {
    handleSubmit: Function | any,
}


export default (props: Props) => {


    /**
     * @description Create a read-only hook for cookies.
     */
    const dispatch = useDispatch();


    /**
     * @description Set a listener for the projectsDetailsReducer state.
     */
    const record: CreatedProject = useSelector((state: RootStateOrAny) => (
        state.projectsDetailsReducer.record
    ));


    /**
     * @description Update state of `projectsDetailsReducer` on change values of
     * the referred input field.
     * 
     * @param input The value of a target input  field.
     */
    const handleChange = (input: any) => {
        return (event: any) => {
            try {
                dispatch(pa.projectsDetailsSuccess(
                    { [input]: event.target.value }
                ));
            } catch (err) {
                dispatch(pa.projectsDetailsFail(err));
            };
        }
    };


    /**
     * @description Create a validation constant to monitoring if values of
     * input fields (title and description) are valid.
     */
    const isDisabled = (
        record.title === '' ||
        record.description === ''
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
                                    placeholder="A brief and concise phrase to described your project."
                                    value={record.title || ''}
                                    onChange={handleChange('title')}
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
                                    placeholder="A detailed description of the project."
                                    value={record.description || ''}
                                    onChange={handleChange('description')}
                                    required={true}
                                />
                            </FormGroup>

                            {/* Submit button */}
                            <Button
                                color="primary"
                                disabled={isDisabled}
                                onClick={props.handleSubmit}>
                                <i className="fa fa-paper-plane"></i>
                                &nbsp;&nbsp;
                                Submit
                            </Button>

                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
};
