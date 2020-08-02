import React, { useState } from 'react';
import { useAsyncEffect } from 'use-async-effect';
import { v4 as uuid } from 'uuid/interfaces';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { Carousel, CarouselItem } from 'reactstrap';
import { Alert, Col, Card, CardBody, CardFooter, CardHeader, Row } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CreatedTrees } from '../../../_helpers/url-providers';
import { treesActions as ta } from '../_reducers/trees.actions';
import { treesServices as ts } from '../_services/_trees.services';
import TreesListItems from './TreesListItems';
import TreesModal from './TreesModal';
import TreesListDetails from './TreesListDetails';


interface Props {
    project_id: uuid
};


enum ViewTypeEnum {
    List = 0,
    Details = 1,
};


export default (props: Props) => {


    const dispatch = useDispatch();


    const [activeView, setActiveView] = useState<ViewTypeEnum>(0);


    const [animating, setAnimating] = useState<boolean>(false);


    useAsyncEffect(async () => {
        await ts.list(props.project_id, dispatch);
    }, []);


    const trees: Array<CreatedTrees> = useSelector((state: RootStateOrAny) => (
        state.treesListReducer.results
    ));


    const setList = (): void => {
        if (animating) return;
        console.log("List");
        setActiveView(0);
    };


    const setItemDetails = (id: uuid): void => {
        if (animating) return;
        const record = trees.filter(item => item.uuid === id);
        dispatch(ta.treesDetailsSuccess(record[0]));
        setActiveView(1);
    };


    const modalNew = (color?: string) => {
        return <TreesModal
            project_id={props.project_id}
            label={"Register a new tree"}
            color={color}
        />
    };


    const cards = [
        (
            <CarouselItem
                key={0}
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
            >
                <TreesListItems
                    project_id={props.project_id}
                    trees={trees}
                    setItemDetails={setItemDetails}
                />
            </CarouselItem>
        ),
        (
            <CarouselItem
                key={1}
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
            >
                <TreesListDetails
                    setList={setList}
                    project_id={props.project_id}
                />
            </CarouselItem>
        )
    ];


    return !trees ? null : (
        <Row>
            <Col
                md={{ size: 12, offset: 0 }}
                lg={{ size: 10, offset: 1 }}
                xl={{ size: 8, offset: 2 }}
            >
                <Card>
                    <CardHeader>
                        <h3>
                            <FontAwesomeIcon icon="tree" size="xs" />
                            &nbsp;&nbsp;&nbsp;
                            Phylogenetic Trees
                        </h3>
                    </CardHeader>

                    <CardBody className="pt-1">
                        {trees.length < 1
                            ? (
                                <div className="my-4">
                                    <Alert color="primary">
                                        No phylogenetic trees. {modalNew('primary')}
                                    </Alert>
                                </div>
                            ) : (
                                <Carousel
                                    activeIndex={activeView}
                                    next={() => { }}
                                    previous={() => { }}
                                    interval={false}
                                >
                                    {cards}
                                </Carousel>
                            )}
                    </CardBody>

                    {activeView === 0 && (
                        <CardFooter>
                            {modalNew()}
                        </CardFooter>
                    )}
                </Card>
            </Col>
        </Row>
    )
};