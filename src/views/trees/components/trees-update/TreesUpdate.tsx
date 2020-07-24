import React from 'react';
import { v4 as uuid } from 'uuid/interfaces';

import { CreatedTrees } from '../../../../_helpers/url-providers';
import { treesServices as ts } from '../_trees.services';
import TreesForm from '../trees-form-single/TreesForm';


interface State extends CreatedTrees {}


interface Props extends CreatedTrees {
    project_id: uuid,
    tree_id?: uuid,
}


export default class TreesUpdate extends React.Component<Props, State> {


    public state: any | CreatedTrees;


    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        if (this.props.tree_id) {
            ts.get(this.props.project_id, this.props.tree_id)
                .then(res => this.setState(() => { return res.data }))
                .catch(() => console.log(this.state));
        }
    };


    private async updateProject(record: CreatedTrees) {
        await ts.update(this.props.project_id, record)
            .then((res) => console.log(res));
    };


    private handleSubmit(event: Event) {
        event.preventDefault();
        this.updateProject(this.state)
            .then(res => console.log(res));
    };


    private handleChange(input: any) {
        return (event: any) => {
            this.setState({
                [input]: event.target.value,
            })
        }
    };


    render() {
        return !this.state?.uuid
            ? null
            : (
                <TreesForm
                    title={this.state.title}
                    description={this.state.description}
                    gene={this.state.gene}
                    tree={this.state.tree}
                    related_tree={this.state.related_tree}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
        )
    }
}
