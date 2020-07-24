import React from 'react';
import { Button, Card, CardBody, Col, Form, FormGroup, Label, Input, Row } from 'reactstrap';

import { BaseTrees, CreatedTrees } from '../../../../_helpers/url-providers';


export interface Props extends BaseTrees, CreatedTrees {
    handleChange: Function,
    handleSubmit: Function | any,
}


export default (props: Props) => {


    const isDisabled = (
        props.title === '' ||
        props.description === '' ||
        props.gene === undefined
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
                                    value={props.title || ''}
                                    onChange={props.handleChange('title')}
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
                                    value={props.description || ''}
                                    onChange={props.handleChange('description')}
                                    required={true} 
                                />
                            </FormGroup>

                            {/* Gene */}
                            {/* FOR AUTOCOMPLETE WITH DEBUNCE EXAMPLE */}
                            {/* https://itnext.io/build-your-own-autocomplete-input-with-react-and-reenhance-components-97386da48678 */}
                            <FormGroup>
                                <Label for="gene">Gene</Label>
                                <Input
                                    type="text"
                                    name="gene"
                                    id="gene"
                                    /* value={trees.gene || ''} */
                                    /* onChange={trees.handleChange('gene')} */
                                    required={true}
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
                                    value={props.tree || ''}
                                    onChange={props.handleChange('tree')}
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
}
