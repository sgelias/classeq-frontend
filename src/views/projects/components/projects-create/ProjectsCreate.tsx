import React from 'react';

import { BaseProject } from '../../../../_helpers/url-providers';
import ProjectsForm from '../projects-form-single/ProjectsForm';
import { projectServices as ps } from '../_projects.services';


export default class ProjectsCreate extends React.Component {


    state: BaseProject = {
        title: '',
        description: '',
    };


    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };


    private createProject(record: BaseProject) {
        ps.createProject(record)
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
            <ProjectsForm 
                title={title}
                description={description}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />
        )
    };
}
