import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { BreadcrumbsItemBuilder } from '../../shared';
import { CreatedProject } from '../../../_helpers/_url-providers';
import ProjectsDetailsView from './ProjectsDetailsView';
import { TreesList } from '../../trees/index';
import { projectServices as ps } from '../_services/_projects.services';


interface State extends CreatedProject { };


interface Props extends RouteComponentProps { };


export default class ProjectsDetails extends React.Component<Props, State> {


    public state: any;


    constructor(props: any) {
        super(props)

        this.state = {
            uuid: (this.props.match.params as any).pid
        };
    };


    componentDidMount() {
        ps.get(this.state.uuid)
            .then(res => this.setState(() => { return res.data }))
            .catch(() => console.log(this.state));
    };


    render() {
        const { match } = this.props;
        const { title, description, created, updated, user, uuid } = this.state;

        return (
            <>
                <BreadcrumbsItemBuilder/>

                <ProjectsDetailsView
                    title={title}
                    description={description}
                    created={created}
                    updated={updated}
                    user={user}
                    url={match.url}
                />

                <TreesList
                    project_id={uuid}
                />
            </>
        )
    }
};