import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { BreadcrumbsItemBuilder } from '../../../shared/BreadcrumbsItemBuilder';
import { CreatedProject } from '../../../../_helpers/url-providers';
import { history } from '../../../../_helpers/history';
import ProjectsForm from '../projects-form-single/ProjectsForm';
import { projectServices as ps } from '../_projects.services';


interface State extends CreatedProject {}


export default class ProjectsCreate extends React.Component<RouteComponentProps, State> {


    public state: any | CreatedProject;


    constructor(props: any) {
        super(props);
    
        this.state = {
            uuid: (this.props.match.params as any).rid
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };


    componentDidMount() {
        ps.get(this.state.uuid)
            .then(res => this.setState(() => { return res.data }))
            .catch(() => console.log(this.state));
    };


    private async updateProject(record: CreatedProject) {
        await ps.update(record)
            .then((res) => console.log(res));
    };


    private handleSubmit(event: Event) {
        event.preventDefault();
        this.updateProject(this.state)
            .then(() => history.push(`/projects/${this.state.uuid}`));
    };


    private handleChange(input: any) {
        return (event: any) => {
            this.setState({
                [input]: event.target.value,
            })
        }
    };


    render() {
        const { title, description, uuid } = this.state;
        const { match } = this.props;

        return (
            <div>
                <BreadcrumbsItemBuilder url={match.url} params={match.params} />
                <ProjectsForm 
                    uuid={uuid}
                    title={title}
                    description={description}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        )
    };
}
