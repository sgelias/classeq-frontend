import React from 'react';
import { v4 as uuid } from 'uuid/interfaces';
import { Button, Table, Badge } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CopyToClipboard from 'react-copy-to-clipboard';
import ReactTooltip from "react-tooltip";
import { useHistory } from 'react-router-dom';

import { Dates } from '../../shared/index';
import { CreatedTrees } from '../../../_helpers/_url-providers';
import TreesModal from './TreesModal';


interface Props {
    trees: Array<CreatedTrees>
    project_id: uuid,
    setItemDetails: Function,
};


export default (props: Props) => {


    const history = useHistory();


    const max_text_size: number = 25;


    const goToClades = async (tree: uuid | undefined): Promise<void> => {
        history.push(`${history.location.pathname}/${tree}/clades`);
    };


    const getStatus = (item: boolean | undefined) => (
        item
            ? <FontAwesomeIcon icon="check" color="green" />
            : <FontAwesomeIcon icon="times" color="red" />
    );


    return props.trees && (
        <Table hover>

            <thead>
                <tr>
                    <th>Title</th>
                    <th>Gene</th>
                    <th>Description</th>
                    <th>Do</th>
                </tr>
            </thead>

            <tbody>
                {props.trees.map((item, index) => (
                    <tr key={index}>

                        <td>
                            {/* Title */}
                            {(
                                item?.tree_utils?.map_clade_status &&
                                item?.tree_utils?.upload_sequences_status &&
                                item?.tree_utils?.map_features_status
                            )
                                ? (
                                    <Button
                                        color="link"
                                        className="p-0"
                                        onClick={() => {
                                            goToClades(item.uuid);
                                        }}
                                    >
                                        {item.title}
                                    </Button>
                                ) : (
                                    item.title
                                )}

                            {/* Status badge */}
                            <Badge
                                color="light"
                                className="float-right border"
                                data-tip={!(
                                    item?.tree_utils?.map_clade_status &&
                                    item?.tree_utils?.upload_sequences_status &&
                                    item?.tree_utils?.map_features_status
                                )
                                    ? "You have not concluded all validations. Go to tree details and validations window to solve this."
                                    : "All validations were concluded."}>
                                <small>Status</small><br />
                                {getStatus(item?.tree_utils?.map_clade_status)}
                                &nbsp;&nbsp;
                                {getStatus(item?.tree_utils?.upload_sequences_status)}
                                &nbsp;&nbsp;
                                {getStatus(item?.tree_utils?.map_features_status)}
                                <ReactTooltip />
                            </Badge>

                            <br />

                            {/* Dates */}
                            <Dates
                                created={item.created}
                                updated={item.updated}
                            />
                        </td>

                        {/* Genes */}
                        <td>
                            <Badge color="secondary" className="ml-2">
                                {item.gene?.name} | {item.gene?.name_slug}
                            </Badge>
                        </td>

                        {/* Description */}
                        <td>
                            <span data-tip={item.description}>
                                {item.description && item.description?.length > max_text_size
                                    ? `${item.description?.substring(0, max_text_size)} ...`
                                    : item.description}
                            </span>
                            <ReactTooltip />
                        </td>

                        {/* Actions */}
                        <td>

                            {/* Copy phylogenetic tree to clipboard */}
                            {!item.tree ? null : (
                                <CopyToClipboard text={item.tree}
                                    onCopy={() => alert("Phylogenetic tree copied to clipboard.")}>
                                    <Button color="link" className="sm">
                                        <FontAwesomeIcon
                                            icon="copy"
                                            size="xs"
                                            data-tip="Copy phylogeny to clipboard"
                                        />
                                        <ReactTooltip />
                                    </Button>
                                </CopyToClipboard>
                            )}

                            {/* Edit modal */}
                            <TreesModal
                                is_update={true}
                                tree_id={item.uuid}
                                project_id={props.project_id}
                            />

                            {/* Details and advanced options modal */}
                            <Button
                                onClick={() => props.setItemDetails(item.uuid)}
                                color="link"
                            >
                                <FontAwesomeIcon
                                    icon="cog"
                                    size="xs"
                                    data-tip="Tree details and advanced options"
                                />
                                <ReactTooltip />
                            </Button>

                        </td>
                    </tr>
                ))}
            </tbody>

        </Table>
    )
};