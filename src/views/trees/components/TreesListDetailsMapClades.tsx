import React, { useState } from 'react';
import { ListGroup, ListGroupItem, Button, Modal, ModalBody, Input, FormGroup, Form, Badge, Carousel, CarouselItem, Jumbotron, Spinner } from 'reactstrap';
import { v4 as uuid } from 'uuid/interfaces';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { treesActions as ta } from '../_reducers/_trees.actions';
import { treesServices as ts } from '../_services/_trees.services';
import { CreatedTrees } from '../../../_helpers/_url-providers';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { useAsyncEffect } from 'use-async-effect';


interface Props {
    project_id: uuid,
    tree_id: uuid,
};


enum ViewTypeEnum {
    List = 0,
    Details = 1,
};


export default (props: Props) => {


    const dispatch = useDispatch();


    const [modal, setModal] = useState(false);


    const [leaves, setLeaves] = useState<Array<string>>([]);


    const [outgroupList, setOutgroupList] = useState<Array<string>>([]);


    const [activeView, setActiveView] = useState<ViewTypeEnum>(0);


    const [animating, setAnimating] = useState<boolean>(false);


    const [canProceed, setCanProceed] = useState<boolean>(false);


    const [validatingClade, setValidatingClade] = useState<boolean>(false);


    const [mappingClades, setMappingClades] = useState<boolean>(false);


    const [term, setTerm] = useState<string>('');


    const record: CreatedTrees = useSelector((state: RootStateOrAny) => (
        state.treesDetailsReducer.record
    ));


    const trees: Array<CreatedTrees> = useSelector((state: RootStateOrAny) => (
        state.treesListReducer.results
    ));


    useAsyncEffect(() => {
        const updatedRecord = trees.filter(item => item.uuid === record.uuid);
        dispatch(ta.treesDetailsSuccess(updatedRecord[0]));
    }, [trees]);


    const toggle = () => setModal(!modal);


    const goToMap = (): void => {
        if (animating) return;
        setActiveView(1);
    };


    const goToOutgroupSelection = (): void => {
        setActiveView(0);
    };


    const getLeaves = () => {
        ts.getLeaves(props.project_id, props.tree_id)
            .then(res => setLeaves(res.data));
    };


    const testClade = () => {
        ts.testClade(props.project_id, props.tree_id, outgroupList)
            .then(() => setCanProceed(true))
            .then(() => setValidatingClade(false))
            .catch(err => alert(err.data));
    };


    const mapClades = () => {
        setMappingClades(true);
        ts.mapClades(props.project_id, props.tree_id, outgroupList)
            .then(() => setMappingClades(false))
            .then(() => updateTreesListAndDetailsStatus())
            .then(() => toggle())
            .catch(err => console.log(err));
    };


    const updateTreesListAndDetailsStatus = async () => {
        await ts.list(props.project_id, dispatch);
    };


    const modalValidationScreen = (
        <CarouselItem
            key={0}
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
        >
            <div className="mb-2 p-3">
                <div className="mb-3">
                    <Button
                        color="danger"
                        onClick={() => toggle()}
                    >
                        &times;&nbsp;&nbsp;Cancel
                    </Button>

                    {canProceed
                        ? (
                            <Button
                                color="success"
                                className="float-right"
                                onClick={() => goToMap()}
                            >
                                Next&nbsp;&nbsp;<FontAwesomeIcon icon="angle-double-right" />
                            </Button>
                        ) : (
                            <Button
                                color="warning"
                                className="float-right"
                                onClick={() => {
                                    setValidatingClade(true)
                                    testClade()
                                }}
                            >
                                {!validatingClade
                                    ? "Test clade"
                                    : <Spinner type="grow" color="light" />}
                            </Button>
                        )
                    }
                </div>

                <Form >
                    <FormGroup>
                        <Input
                            type="text"
                            name="filter"
                            id="filter"
                            placeholder="Filter leaves"
                            onChange={el => setTerm(el.target.value)}
                        />
                    </FormGroup>
                </Form>

                <div>
                    <span className="text-muted">
                        Selected outgroups&nbsp;
                        <Badge color="light">
                            ({outgroupList.length})
                        </Badge>:<br />
                    </span>
                    <div className="selection-box border bg-light-grey p-2">
                        {outgroupList.length === 0
                            ? (
                                <span className="text-muted">
                                    No outgroups selected
                                </span>
                            ) : (
                                outgroupList.map((item, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => {
                                            setOutgroupList([
                                                ...outgroupList.filter(element => element !== item)
                                            ]);
                                        }}
                                        color="secondary"
                                        className="m-1 py-0 px-1 border">
                                        {item}&nbsp;&nbsp;&times;
                                    </Button>
                                )))}
                    </div>
                </div>
            </div>

            <ModalBody className="border">
                <ListGroup flush>
                    {leaves
                        .filter(item => item.toLowerCase().includes(term.toLowerCase()))
                        .map((item, index) => (
                            <ListGroupItem key={index}>
                                <Button
                                    color="link"
                                    onClick={() => {
                                        !(outgroupList.includes(item)) && setOutgroupList([...outgroupList, item])
                                    }}
                                >
                                    {item}
                                </Button>
                            </ListGroupItem>
                        ))}
                </ListGroup>
            </ModalBody>
        </CarouselItem>
    );


    const modalConfirmationScreen = (
        <CarouselItem
            key={1}
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
        >
            <div className="mb-2 p-3">
                <Button
                    color="success"
                    className="mb-3"
                    onClick={() => goToOutgroupSelection()}
                >
                    <FontAwesomeIcon icon="angle-double-left" />
                    &nbsp;&nbsp;Previous
                </Button>
                <Jumbotron>
                    <p className="lead text-center">
                        To start clades mapping click in "Map clades" button. This process can take a time.
                        Do not reload the page before the process is finished.
                    </p>
                    <hr className="my-2" />
                    <p className="text-center">After start the process can't be stoped!</p>
                    <p className="lead">
                        <Button
                            color="primary"
                            className="float-right btn-block"
                            onClick={mapClades}
                            disabled={mappingClades}
                        >
                            {!mappingClades
                                ? "Map clades"
                                : <Spinner type="grow" color="light" />}
                        </Button>
                    </p>
                </Jumbotron>
            </div>
        </CarouselItem>
    );


    const selectModal = (
        <Modal
            isOpen={modal}
            className="success"
            scrollable={true}
            size="xl"
        >
            <Carousel
                activeIndex={activeView}
                next={() => { }}
                previous={() => { }}
                interval={false}
            >
                {[modalValidationScreen, modalConfirmationScreen]}
            </Carousel>
        </Modal>
    );


    return (
        <ListGroupItem>
            <details>
                <summary className="float-right">
                    {record.tree_utils?.map_clade_status
                        ? (
                            <Badge color="light">
                                <FontAwesomeIcon icon="check" color="green" />
                            </Badge>
                        ) : (
                            <Button
                                onClick={() => {
                                    toggle();
                                    getLeaves();
                                }}
                                color="primary"
                                className="py-0 px-1">
                                Map clades
                            </Button>
                        )}
                    {selectModal}
                </summary>
            </details>
            <strong>
                Map Clades<small className="text-muted ml-2">(Step one)</small>
            </strong>
            <div>
                Here clade representations are created to allows easy tree management.
                Clade representations see three clade types: root, internal nodes, and leaves.
                <br />
                <ul>
                    <li>
                        Root clades are the start node of the tree. Root's have not parent clades.
                    </li>
                    <li>
                        Internal nodes contain only branches. Only node hypothesis with high
                        phylogenetic support are mapped. Samuel, describe the high phylogenetic support...
                    </li>
                    <li>
                        Leaves are terminal nodes.
                    </li>
                </ul>
            </div>
        </ListGroupItem>
    )
};