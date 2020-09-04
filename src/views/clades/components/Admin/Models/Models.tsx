import React, { useState } from 'react';
import { Button, Badge, Spinner, ListGroupItem } from 'reactstrap';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { cladesServices as cs } from '../../../_services/_clades.services';
import { CreatedClades, CreatedTrees } from '../../../../../_helpers/_url-providers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


declare type LocalTrainStatusType = "SUBMITTED" | "PENDING" | "SUCCESS" | "FAIL";


interface Props {
    min_clade_length: number
};


export default (props: Props) => {


    const dispatch = useDispatch();


    const params = useParams<any>();


    const [trainingStatus, setTrainingStatus] = useState<undefined | LocalTrainStatusType>(undefined);


    const clade: CreatedClades = useSelector((state: RootStateOrAny) => (
        state.cladesDetailsReducer.record
    ));


    const tree: CreatedTrees = useSelector((state: RootStateOrAny) => (
        state.treesDetailsReducer.record
    ));


    const listClades = async (): Promise<void> => {
        (params.tid) && await cs.listClades(params.tid, dispatch);
    };


    const evaluateListCladesResponse = () => {
        Promise.resolve()
            .then(() => setTrainingStatus("SUCCESS"))
            .then(() => listClades());
    };


    const startSingleCladeTrain = () => {
        setTrainingStatus("PENDING");
        (clade.uuid && tree.feature_set?.uuid) && (
            cs.startSingleCladeTrain(clade.uuid, tree?.feature_set?.uuid)
                //.then(res => console.log(res.data))
                .then(res => {
                    console.log(res);
                    switch (res.status) {
                        case "PENDING": setTrainingStatus("SUBMITTED"); break;
                        case "SUCCESS": evaluateListCladesResponse(); break;
                        case "FAIL": setTrainingStatus("FAIL");
                    }
                })
                .catch(err => {
                    setTrainingStatus("FAIL");
                    console.log(err.data);
                })
        )
    };


    const round = (value: number, decimals: number) => (
        Number(`${Math.round(parseFloat(`${value}e${decimals}`))}e-${decimals}`)
    );


    const setScoreColor = (value: number): string => {
        if (value > 0.9) {
            return "success";
        } else if (value < 0.9 && value > 0.7) {
            return "warning";
        } else {
            return "danger";
        }
    };


    const setTrainButtonStatus = (
        trainingStatus === "PENDING" ||
            clade.train_status === "started" ||
            clade.train_status === "undefined" ? true : false
    );


    return (
        <ListGroupItem>
            {!clade.model && (clade.child && (clade.child?.length > props.min_clade_length || clade.branch_type === "B"))
                ? (
                    <>
                        <details>
                            <summary className="float-right">
                                <Button
                                    color="primary" 
                                    className="px-1 py-0"
                                    disabled={setTrainButtonStatus}
                                    onClick={() => {
                                        startSingleCladeTrain();
                                    }}
                                >
                                    {setTrainButtonStatus
                                        ? <Spinner animation="grow" />
                                        : (
                                            <>
                                                START TRAIN
                                                &nbsp;&nbsp;
                                                <FontAwesomeIcon icon="brain" />
                                            </>
                                        )}
                                </Button>
                            </summary>
                        </details>
                        <strong>
                            <FontAwesomeIcon icon="exclamation-triangle" />
                            &nbsp;&nbsp;
                            Pending model train
                            <small className="ml-1 text-muted">(optional)</small>
                        </strong>
                        <p className="mt-4 mb-1">
                            All valid clades can be converted to models. 
                            Click on START TRAIN button to do this.
                        </p>
                    </>
                ) : (
                    <>
                        <p className="mb-2">
                            <span className="text-muted">
                                Model:&nbsp;&nbsp;
                            </span>
                            {clade?.model?.ml_model}
                        </p>
                        <p className="mb-2">
                            <span className="text-muted">
                                Scores:&nbsp;&nbsp;
                            </span>
                            {clade?.model?.test_score.map((score, index) => (
                                <Badge
                                    key={index}
                                    color={setScoreColor(score)}
                                    className="m-1">
                                    {round(score, 2)}
                                </Badge>
                            ))}
                        </p>
                    </>
                )}
        </ListGroupItem>
    )
};