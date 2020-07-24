import React from 'react';
import { Col, Card, CardBody, CardFooter, CardHeader, CardTitle, CardText, Row } from 'reactstrap';
import { v4 as uuid } from 'uuid/interfaces';

import { Dates } from '../../../shared/index';
import { TreesListObjects } from '../../../../_helpers/url-providers';
import { treesServices as ts } from '../_trees.services';
import TreesModal from '../trees-modal/TreesModal';


interface Props {
    project_id: uuid
}


interface State extends TreesListObjects {}


export default class TreesList extends React.Component<Props, State> {


    public status: Readonly<TreesListObjects> = {
        results: [],
    }


    componentDidMount() {
        ts.list(this.props.project_id).then(res => this.setState({
            results: res.data.results
        }));
    }


    render() {
        return !this.state?.results
            ? null
            : (
                <Row>
                    <Col md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 2 }}>
                        <Card>
                            <CardHeader>
                                <h3>Associated trees</h3>
                            </CardHeader>
                            
                            <CardBody className="pt-1">
                                {this.state.results.map((item, index) => (
                                    <div key={index}>
                                        <hr className="mb-2"/>
                                        <CardTitle>
                                            <h4>
                                                {/* Tree name */}
                                                { item.title }
                                                <TreesModal
                                                    is_update={true}
                                                    tree_id={item.uuid}
                                                    project_id={this.props.project_id}
                                                />

                                                {/* Genes */}
                                                <small className="ml-2 text-muted float-md-right">
                                                    { item.gene?.name } | { item.gene?.name_slug }
                                                </small>
                                            </h4>
                                        </CardTitle>

                                        {/* Description */}
                                        <CardText>
                                            <small className="text-muted">Description:</small><br/>
                                            { item.description }
                                        </CardText>

                                        {/* Phylogenetic tree */}
                                        <div className="no-wrap-text">
                                            <small className="text-muted">Original Tree:</small>
                                            <div className="my-2"><span>{ item.tree }</span></div>
                                        </div>

                                        {/* Dates */}
                                        <Dates 
                                            created={item.created}
                                            updated={item.updated}
                                        />
                                    </div>
                                ))}
                            </CardBody>
                            
                            <CardFooter>
                                <TreesModal project_id={this.props.project_id}/>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            )
    }
}