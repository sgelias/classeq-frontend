import React, { useEffect } from 'react';
import { Col, Card, CardHeader, CardBody, Alert, Table, CardFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MapInteractionCSS } from 'react-map-interaction';


interface Props {
    childClades: any,
    scrollTo: Function,
};


export default (props: Props) => {


    const gotTdNucleotides = (sequence: Array<string>) => sequence.map((item, index) => (
        <td key={index} className={`${item} nucleotide`}>
            {item}
        </td>
    ));


    const getLargestSequence = (
        (props.childClades.length > 0) && Math.max(...(props.childClades
            .filter(item => item.branch_type === "L")
            .map(el => el.sequence.fasta_sequence.length)))
    );


    const populateStatistics = () => {
        console.log(getLargestSequence);
        const newArray = [...Array(getLargestSequence)]
        /* props.childClades.map((item, index) => {
            item.sequence.fasta_sequence.toLowerCase().split('').map(letter => {
                newArray[index] = letter;
            });
        }); */
    };


    useEffect(() => {
        populateStatistics();
    }, [props.childClades.length])


    const childElements = () => props.childClades.map((item, index) => (
        <tr key={index}>
            <td>
                {item.branch_type === "L" && item.branch_type}
            </td>

            <td>
                {item.name && item.name}
            </td>

            {!item.sequence ? null : (
                gotTdNucleotides(item.sequence.fasta_sequence.toLowerCase().split(''))
            )}
        </tr>
    ));


    return (
        <Col>
            <Card>
                <CardHeader className="border-bottom">
                    <h3>
                        <FontAwesomeIcon icon="leaf" size="xs" />
                        &nbsp;&nbsp;&nbsp;
                        Leaves
                    </h3>
                </CardHeader>

                <CardBody className="pt-1 clades-card">
                    {!(props.childClades.length > 0)
                        ? <Alert color="mt-2 light">Select a clade to start.</Alert>
                        : (
                            <MapInteractionCSS
                                showControls={true}
                            >
                                <Table hover className="tableBodyScroll">
                                    <tbody className="not-overflow">
                                        {childElements()}
                                    </tbody>
                                </Table>
                            </MapInteractionCSS>
                        )}
                </CardBody>

                <CardFooter />
            </Card>
        </Col>
    )
};