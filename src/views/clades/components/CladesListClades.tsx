import React from 'react';
import { Col, Card, CardHeader, CardBody, Table, CardFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, RootStateOrAny } from 'react-redux';

import { CreatedClades } from '../../../_helpers/_url-providers';


interface Props {
    setIndexToRef: Function,
    setSubItems: Function,
};


export default (props: Props) => {


    const clades: Array<CreatedClades> = useSelector((state: RootStateOrAny) => (
        state.cladesListReducer.results
    ));


    const internalClade = (item: CreatedClades, index: number) => {

        const filteredClades = clades.filter(clade => (
            clade.parent === item.uuid && clade.branch_type === "B"
        ));

        return (
            <tr key={index}>
                <td ref={el => item.uuid && props.setIndexToRef(item.uuid, el)}>
                    <Button
                        color="link"
                        className="p-0 text-left"
                        onClick={() => {
                            props.setSubItems(item);
                        }}
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

                <td className={filteredClades.length ? 'not-null-cell' : ""}>
                    {filteredClades?.length
                        ? filteredClades?.length
                        : null}
                </td>
            </tr>
        )
    };


    return (
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
                                .filter(item => item.branch_type === "B" || item.branch_type === "R")
                                .map((item, index) => internalClade(item, index))}
                        </tbody>
                    </Table>
                </CardBody>

                <CardFooter />
            </Card>
        </Col>
    )
};