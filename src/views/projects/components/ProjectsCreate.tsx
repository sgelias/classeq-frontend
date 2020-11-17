import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { RootStateOrAny, useSelector } from 'react-redux';

import { BaseProject } from '../../../_helpers/_url-providers';
import { BreadcrumbsItemBuilder } from '../../shared';
import ProjectsForm from './ProjectsForm';
import { projectServices as ps } from '../_services/_projects.services';


interface Props extends RouteComponentProps { }


interface State extends BaseProject { }


//export default () => {
//
//
//    /**
//     * @description Create a read-only hook for cookies.
//     */
//    const [cookie] = useCookies();
//
//
//    const record: BaseProject = useSelector((state: RootStateOrAny) => (
//        state.treesDetailsReducer.record
//    ));
//
//
//    const createProject = () => {
//        ps.create(record, cookie.pas_auth.access_token)
//            .then(res => console.log(res));
//    };
//
//
//    const handleSubmit = (event: Event) => {
//        event.preventDefault();
//        createProject();
//    };
//
//
//    const handleChange = (input: any) => {
//        return (event: any) => {
//            this.setState({
//                [input]: event.target.value,
//            })
//        }
//    };
//
//    return (
//        <div>
//            <BreadcrumbsItemBuilder />
//            <ProjectsForm
//                title={record.title}
//                description={record.description}
//                handleChange={this.handleChange}
//                handleSubmit={handleSubmit}
//            />
//        </div>
//    )
//}


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
                <BreadcrumbsItemBuilder />
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
