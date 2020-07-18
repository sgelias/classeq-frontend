import React from 'react';
import axios from 'axios';

import { provideProjectsCreateUrl, BaseProject } from '../../../helpers/urlProviders';
import ProjectsForm from '../projects-form-single/ProjectsForm';


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
        const url = provideProjectsCreateUrl();
        axios.post(url.url, record)
            .then(res => console.log(res));
    }


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
