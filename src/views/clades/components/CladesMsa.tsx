import React, { useState } from 'react';
import { Alert, Table, Modal, ModalBody, Button } from 'reactstrap';
import { MapInteractionCSS } from 'react-map-interaction';
//import ReactApexChart from 'react-apexcharts';

import { useAsyncEffect } from 'use-async-effect';
import { CreatedClades } from '../../../_helpers/_url-providers';


interface Props {
    childClades: any,
    modal: boolean,
    toggle: Function,
};


interface NucleotideStats {
    A: number,
    C: number,
    T: number,
    G: number,
};


export default (props: Props) => {


    const [nucleotideMatrix, setNucleotideMatrix] = useState<Array<any>>();


    //const [nucleotideMatrixStats, setNucleotideMatrixStats] = useState<any>();


    /* const getLargestSequence = (
        (props.childClades.length > 0) && Math.max(...(props.childClades
            .filter(item => item.branch_type === "L")
            .map(el => el.sequence.fasta_sequence.length)))
    ); */


    /* const populateStatistics = () => {
        console.log(getLargestSequence);
        const newArray = [...Array(getLargestSequence)]
        props.childClades.map((item, index) => {
            item.sequence.fasta_sequence.toLowerCase().split('').map(letter => {
                newArray[index] = letter;
            });
        });
    }; */


    /* useEffect(() => {
        populateStatistics();
    }, [props.childClades.length]) */


    const compileMatrix = async () => {
        setNucleotideMatrix([...props.childClades
            .filter((item: CreatedClades) => item.branch_type === "L")
            .map(item => item.sequence && {
                name: item.name,
                sequence: item?.sequence?.fasta_sequence.toLowerCase().split('')
            })
        ]);
    };


    useAsyncEffect(() => {
        compileMatrix();
    }, [props.childClades.length]);


    const gotTdNucleotides = (sequence: Array<string>) => sequence.map((item, index) => (
        <td key={index} className={`${item} nucleotide`}>
            {item}
        </td>
    ));


    const childElements = () => {
        return props.childClades.filter(item => item.branch_type === "L").map((item: CreatedClades, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                {item?.sequence?.fasta_sequence && gotTdNucleotides(item?.sequence?.fasta_sequence.toLowerCase().split(''))}
            </tr>
        ))
    };


    return !nucleotideMatrix ? null : (
        <Modal
            isOpen={props.modal}
            className="success full-width-modal"
            scrollable={true}
            size="xl"
        >
            <div>
                <Button
                    color="link"
                    className="float-right m-0"
                    onClick={() => props.toggle()}
                >
                    &times;&nbsp;&nbsp;Cancel
                </Button>
            </div>

            {/* <div>
                <ReactApexChart
                    options={graphOptions.options}
                    series={nucleotideMatrixStats}
                    type="line"
                    height={350}
                />
            </div> */}
            <ModalBody className="border clades-card">
                {!(props.childClades.length > 0)
                    ? <Alert color="mt-2 light">Select a clade to start.</Alert>
                    : (
                        <MapInteractionCSS
                            showControls={true}
                        >
                            <Table hover className="tableBodyScroll not-overflow">
                                <tbody>
                                    {childElements()}
                                </tbody>
                            </Table>
                        </MapInteractionCSS>
                    )}
            </ModalBody>
        </Modal>
    )
};