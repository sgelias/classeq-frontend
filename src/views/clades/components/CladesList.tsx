import React, { useState } from 'react';
import { v4 as uuid } from 'uuid/interfaces';
import { Row, Card, Col, CardHeader, CardFooter, CardBody, Button, Alert, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, RootStateOrAny } from 'react-redux';

import { CreatedClades } from '../../../_helpers/_url-providers';


interface Props { };


export default (props: Props) => {


    const [childClades, setChildClades] = useState<Array<CreatedClades>>([]);


    const [itemRefs] = useState<{ [key: string]: any }>({});


    const clades: Array<CreatedClades> = useSelector((state: RootStateOrAny) => (
        state.cladesListReducer.results
    ));


    const scrollTo = (id: string) => {
        itemRefs[id].scrollIntoView({ block: 'start', behavior: 'smooth' });
    };


    const setIndexToRef = (index: uuid, element: any) => {
        itemRefs[index.toString()] = element;
    };


    const setSubItems = (item: CreatedClades) => {
        setChildClades([
            ...clades.filter(clade => (
                clade.parent === item.uuid && clade.branch_type === "B"
            )),
            ...clades.filter(clade => (
                clade.uuid && item.child?.includes(clade.uuid)
            ))
        ]);
    };


    const internalClade = (item: CreatedClades, index: number) => {

        const childClades = clades.filter(clade => (
            clade.parent === item.uuid && clade.branch_type === "B"
        ));

        return (
            <tr key={index}>
                <td ref={el => item.uuid && setIndexToRef(item.uuid, el)}>
                    <Button
                        onClick={() => setSubItems(item)}
                        color="link"
                    >
                        Uuid: {item.uuid}<br />
                        Parent: {item.parent}
                    </Button>
                </td>

                <td className={item?.child?.length ? "not-null-cell" : ""}>
                    {(item?.child?.length && item?.child?.length > 0)
                        ? item?.child?.length
                        : null}
                </td>

                <td className={childClades.length ? 'not-null-cell' : ""}>
                    {childClades?.length
                        ? childClades?.length
                        : null}
                </td>
            </tr>
        )
    };


    const childElements = childClades.map((item, index) => (
        <tr key={index}>
            <td>
                {item.branch_type}
            </td>

            <td>
                {item.name ? item.name : (
                    <Button
                        color="link"
                        onClick={() => (
                            item.uuid && scrollTo(item.uuid?.toString())
                        )}
                    >
                        Uuid: {item.uuid}<br />
                        Parent: {item.parent}
                    </Button>
                )}
            </td>
        </tr>
    ));


    const cladesCol = (
        <Col
            sm={{ size: 12 }}
            md={{ size: 6 }}
        >
            <Card>
                <CardHeader className="border-bottom">
                    <h3>
                        <FontAwesomeIcon icon="code-branch" size="xs" />
                        &nbsp;&nbsp;&nbsp;
                        Clades
                    </h3>
                </CardHeader>

                <CardBody className="pt-1 clades-card">
                    <Table hover className="tableBodyScroll">
                        <thead>
                            <tr>
                                <th>Identification</th>
                                <th>Leaves</th>
                                <th>Clades</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clades
                                .filter(item => item.branch_type === "B")
                                .map((item, index) => internalClade(item, index))}
                        </tbody>
                    </Table>
                </CardBody>

                <CardFooter />
            </Card>
        </Col>
    );


    const childCol = (
        <Col
            sm={{ size: 12 }}
            md={{ size: 6 }}
        >
            <Card>
                <CardHeader className="border-bottom">
                    <h3>
                        <FontAwesomeIcon icon="leaf" size="xs" />
                        &nbsp;&nbsp;&nbsp;
                        Leaves
                    </h3>
                </CardHeader>

                <CardBody className="pt-1 clades-card">
                    {!(childElements.length > 0)
                        ? <Alert color="mt-2 light">Select a clade to start.</Alert>
                        : (
                            <Table hover className="tableBodyScroll">
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {childElements}
                                </tbody>
                            </Table>
                        )}
                </CardBody>

                <CardFooter />
            </Card>
        </Col >
    );


    return !(clades && clades.length > 0) ? null : (
        <Row>
            {cladesCol}
            {childCol}
        </Row>
    )
};