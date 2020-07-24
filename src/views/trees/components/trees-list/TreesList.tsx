import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardFooter, CardHeader, CardTitle, CardText } from 'reactstrap';
import { v4 as uuid } from 'uuid/interfaces';

import { TreesListObjects } from '../../../../_helpers/url-providers';
import { treesServices as ts } from '../_trees.services';


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
                                                { item.title }
                                                <small className="ml-2 text-muted float-md-right">
                                                    { item.gene?.name } | { item.gene?.name_slug }
                                                </small>
                                            </h4>
                                        </CardTitle>
                                        <CardText>
                                            <small className="text-muted">Description:</small><br/>
                                            { item.description }
                                        </CardText>
                                        <div className="no-wrap-text">
                                            <small className="text-muted">Original Tree:</small>
                                            <div className="my-2"><span>{ item.tree }</span></div>
                                        </div>
                                    </div>
                                ))}
                            </CardBody>
                            <CardFooter>
                                <NavLink to={'/'} color="success">
                                    Add tree&nbsp;&nbsp;
                                    <i className="fa fa-plus"></i>
                                </NavLink>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            )
    }
}