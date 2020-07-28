import React from 'react';
import { v4 as uuid } from 'uuid/interfaces';

import { CreatedTrees, Gene } from '../../../../_helpers/url-providers';
import { treesServices as ts } from '../_trees.services';
import TreesForm from '../trees-form-single/TreesForm';


interface State extends CreatedTrees { }


interface Props extends CreatedTrees {
    project_id: uuid,
    tree_id?: uuid,
}



// const TreesUpdateFunction = (props: Props) => { };


export default class TreesUpdate extends React.Component<Props, State> {


    public state: any | CreatedTrees;


    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGeneInput = this.handleGeneInput.bind(this);
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
            .then((res) => this.setState(() => { return res.data }));
    };


    private handleSubmit() {
        this.updateProject(this.state);
    };


    private handleGeneInput(value: Gene) {
        this.setState({ gene: value }, () => {
            console.log(this.state);
        });
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
                    handleGeneInput={this.handleGeneInput}
                />
            )
    }
}
