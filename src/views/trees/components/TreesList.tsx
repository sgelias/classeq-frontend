import { Alert, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import { Button, Carousel, CarouselItem } from 'reactstrap';
import React, { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

import { CreatedTrees } from '../../../_helpers/_url-providers';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TreesListDetails from './TreesListDetails';
import TreesListItems from './TreesListItems';
import TreesModal from './TreesModal';
import { treesActions as ta } from '../_reducers/_trees.actions';
import { treesServices as ts } from '../_services/_trees.services';
import { useAsyncEffect } from 'use-async-effect';
import { v4 as uuid } from 'uuid/interfaces';


interface Props {
    project_id: uuid
};


enum ViewTypeEnum {
    List = 0,
    Details = 1,
};


export default (props: Props) => {


    /**
	 * @description Create a read-only hook for cookies.
	 */
    const [cookie] = useCookies();
    
    
    /**
     * @description Set a dispatcher for state management.
     */
    const dispatch = useDispatch();


    const [activeView, setActiveView] = useState<ViewTypeEnum>(0);


    const [animating, setAnimating] = useState<boolean>(false);


    const trees: Array<CreatedTrees> = useSelector((state: RootStateOrAny) => (
        state.treesListReducer.results
    ));


    const goToItemList = (): void => {
        if (animating) return;
        setActiveView(0);
    };


    const goToItemDetails = (id: uuid): void => {
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


    useAsyncEffect(() => {
        ts.list(cookie.pas_auth.access_token, props.project_id, dispatch);
    }, []);


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
                    setItemDetails={goToItemDetails}
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
                    setList={goToItemList}
                    project_id={props.project_id}
                />
            </CarouselItem>
        )
    ];


    return (trees && props.project_id) && (
        <Row>
            <Col>
                <Card>
                    <CardHeader>
                        <h3>
                            <FontAwesomeIcon icon="tree" size="xs" />
                            &nbsp;&nbsp;&nbsp;
                            Phylogenetic Trees

                            {activeView === 1 && (
                                <Button
                                    onClick={() => goToItemList()}
                                    color="link float-right"
                                >
                                    <FontAwesomeIcon icon="arrow-left" size="xs" />
                                    &nbsp;&nbsp;&nbsp;
                                    Go back
                                </Button>
                            )}
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
