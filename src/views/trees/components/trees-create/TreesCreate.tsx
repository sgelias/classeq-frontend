import React from 'react';
import { v4 as uuid } from 'uuid/interfaces';

import { BaseTrees, Gene } from '../../../../_helpers/url-providers';
import { treesServices as ts } from '../_trees.services';
import TreesForm from '../trees-form-single/TreesForm';


interface Props {
    project_id: uuid,
    toggle: Function,
}


interface State extends BaseTrees {}


export default class TreesCreate extends React.Component<Props, State> {


    public state: State = {
        title: '',
        description: '',
        gene: undefined,
        tree: '',
    };


    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGeneInput = this.handleGeneInput.bind(this);
    };


    private async createTree(record: BaseTrees) {
        await ts.create(this.props.project_id, record)
            .then(res => console.log(res));
    };


    private handleSubmit(event: Event) {
        this.createTree(this.state);
        this.props.toggle();
    };


    private handleGeneInput(value: Gene) {
        this.setState({ gene: value });
    };


    private handleChange(input: any) {
        return (event: any) => {
            if (event?.target?.value && input !== "gene") {
                this.setState({
                    [input]: event.target.value,
                })
            }
        }
    };


    render() {
        const { title, description, gene, tree, related_tree } = this.state;

        return (
            <TreesForm
                title={title}
                description={description}
                gene={gene}
                tree={tree}
                related_tree={related_tree}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleGeneInput={this.handleGeneInput}
            />
        )
    }
}
