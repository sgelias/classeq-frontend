import React, { useState } from 'react';
import { Button, CardTitle, Badge, Spinner, ListGroupItem } from 'reactstrap';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';

import { cladesServices as cs } from '../_services/_clades.services';
import { CreatedClades, CreatedTrees } from '../../../_helpers/_url-providers';
import { useParams } from 'react-router-dom';


interface Props {
    min_clade_length: number
};


export default (props: Props) => {


    const dispatch = useDispatch();


    const params = useParams<any>();


    const [trainingStatus, setTrainingStatus] = useState<boolean>(false);


    const clade: CreatedClades = useSelector((state: RootStateOrAny) => (
        state.cladesDetailsReducer.record
    ));


    const tree: CreatedTrees = useSelector((state: RootStateOrAny) => (
        state.treesDetailsReducer.record
    ));


    const listClades = async (): Promise<void> => {
        (params.tid) && await cs.listClades(params.tid, dispatch);
    };


    const startSingleCladeTrain = () => {
        setTrainingStatus(true);
        (clade.uuid && tree.feature_set?.uuid) && (
            cs.startSingleCladeTrain(clade.uuid, tree?.feature_set?.uuid)
                .then(() => listClades())
                .then(() => setTrainingStatus(false))
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


    return (
        <ListGroupItem>
            {clade.model
                ? (
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
                ) : (
                    <CardTitle>
                        {clade.child && (clade.child?.length > props.min_clade_length || clade.branch_type !== "R")
                            ? <>Select a not root branch to train.</>
                            : (
                                <Button
                                    color="primary"
                                    className="btn-block"
                                    disabled={trainingStatus}
                                    onClick={() => {
                                        startSingleCladeTrain();
                                    }}
                                >
                                    {trainingStatus
                                        ? <Spinner />
                                        : "Start train"}
                                </Button>
                            )}
                    </CardTitle>
                )}
        </ListGroupItem>
    )
};