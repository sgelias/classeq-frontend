import React from 'react';
import { Button, Card, CardBody, Col, Form, FormGroup, Label, Input, Row } from 'reactstrap';

import { treesActions as ta } from '../_reducers/_trees.actions';
import { CreatedTrees, Gene } from '../../../_helpers/_url-providers';
import TreesFormGeneInput from './TreesFormGeneInput';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';


interface Props {
    handleSubmit: Function | any,
};


export default (props: Props) => {


    const dispatch = useDispatch();

    
    const record: CreatedTrees = useSelector((state: RootStateOrAny) => (
        state.treesDetailsReducer.record
    ));


    const handleGeneInput = (value: Gene) => {
        dispatch(ta.treesDetailsPending(true));
        try {
            dispatch(ta.treesDetailsSuccess({ gene: value }));
            dispatch(ta.treesDetailsPending(false));
        } catch (err) {
            dispatch(ta.treesDetailsFail(err));
        };
    };


    const handleChange = (input: any) => {
        return (event: any) => {
            try {
                dispatch(ta.treesDetailsSuccess({ [input]: event.target.value }));
            } catch (err) {
                dispatch(ta.treesDetailsFail(err));
            };
        }
    };


    const isDisabled = (
        record.title === '' ||
        record.description === '' ||
        record.gene === undefined
    );


    return (
        <Row>
            <Col sm={{ size: 12 }}>
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
                                    placeholder="A detailed description of the project"
                                    value={record.description || ''}
                                    onChange={handleChange('description')}
                                    required={true} 
                                />
                            </FormGroup>

                            {/* Gene */}
                            <FormGroup>
                                <TreesFormGeneInput
                                    gene={record.gene}
                                    handleGeneInput={handleGeneInput}
                                />
                            </FormGroup>

                            {/* Tree */}
                            <FormGroup>
                                <Label for="description">Newick tree</Label>
                                <Input
                                    type="textarea"
                                    name="tree"
                                    id="tree"
                                    placeholder="Newick format tree (.tree, .tree, and .nwk)"
                                    value={record.tree || ''}
                                    onChange={handleChange('tree')}
                                    required={true} 
                                />
                            </FormGroup>

                            {/* Related tree */}
                            <FormGroup>
                                <Label for="related-tree">Related tree</Label>
                                <Input
                                    type="text"
                                    name="related_tree"
                                    id="related_tree"
                                    required={true}
                                />
                            </FormGroup>

                            {/* Submit button */}
                            <Button 
                                color="primary"
                                disabled={isDisabled}
                                onClick={props.handleSubmit}>
                                <i className="fa fa-paper-plane"></i>&nbsp;&nbsp;Submit
                            </Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
};