import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { BaseProject } from '../../../_helpers/_url-providers';
import { BreadcrumbsItemBuilder } from '../../shared';
import ProjectsForm from './ProjectsForm';
import { projectServices as ps } from '../_services/_projects.services';


interface Props extends RouteComponentProps {}


interface State extends BaseProject {}


export default class ProjectsCreate extends React.Component<Props, State> {


    public state: BaseProject = {
        title: '',
        description: '',
    };


    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };


    private createProject(record: BaseProject) {
        ps.create(record)
            .then(res => console.log(res));
    };


    private handleSubmit(event: Event) {
        console.log(this.state);
        event.preventDefault();
        this.createProject(this.state);
    };


    private handleChange(input: any) {
        return (event: any) => {
            this.setState({
                [input]: event.target.value,
            })
        }
    };


    render() {
        const { title, description } = this.state;
        
        return (
            <div>
                <BreadcrumbsItemBuilder/>
                <ProjectsForm 
                    title={title}
                    description={description}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        )
    };
}
