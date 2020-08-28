import React, { useState } from 'react';
import { Button, Badge, Card, CardBody, CardTitle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface Props {
    maxChildLength: number,
    nodes: Array<any>,
    annotateClade?: Function,
};


export default (props: Props) => {


    const [showAll, setShowAll] = useState<boolean>(false);


    const showAllButton = (node: Array<any>, show: boolean) => {
        const isShow = show ? showAll : !showAll;
        return !(node.length > props.maxChildLength) ? null : isShow && (
            <Button
                color="link"
                className="px-1 py-0 float-right"
                onClick={() => setShowAll(!showAll)}
            >
                {!showAll
                    ? <>Show all &nbsp;&nbsp;<FontAwesomeIcon icon="arrow-down" /></>
                    : <>Show less &nbsp;&nbsp;<FontAwesomeIcon icon="times" /></>}
            </Button>
        )
    };


    const populateNodes = (childs: Array<any>) => {

        const elements = showAll
            ? childs : childs.slice(0, props.maxChildLength)

        return (
            <>
                {elements.map((child, index) => (
                    <Badge key={index} color="light border" className="m-1 px-2">
                        {child.scientificName}
                    </Badge>
                ))}
            </>
        );
    };


    return !(props.nodes.length > 0) ? null : (
        <>
            {props.nodes.map((node, index) => (
                <Card key={index} className="border mt-3 p-3">
                    <h4>
                        {node.target.scientificName}
                        <small className="text-muted ml-2">
                            {node.target.taxonRank}
                        </small>
                        {!props.annotateClade ? null : (
                            <Button
                                color="success"
                                className="float-right py-0 px-1"
                                onClick={() => props.annotateClade && props.annotateClade(node.target.id)}
                            >
                                Use this node
                            </Button>
                        )}
                    </h4>
                    {node.parent && (
                        <CardBody className="p-1">
                            <CardTitle className="m-0">
                                Parent:&nbsp;&nbsp;
                                <Badge color="light border" className="m-1 px-2">
                                    {node.parent.scientificName}
                                </Badge>
                            </CardTitle>
                        </CardBody>
                    )}
                    {node.child.length > 0 && (
                        <CardBody className="p-1">
                            <CardTitle className="m-0">
                                Childs:&nbsp;&nbsp;
                                {showAllButton(node.child, true)}
                                <br />
                                {populateNodes(node.child)}
                                {showAllButton(node.child, false)}
                            </CardTitle>
                        </CardBody>
                    )}
                </Card>
            ))}
        </>
    )
};