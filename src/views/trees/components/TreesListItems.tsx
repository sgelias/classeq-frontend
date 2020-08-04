import React from 'react';
import { v4 as uuid } from 'uuid/interfaces';
import { Button, Table, Badge } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CopyToClipboard from 'react-copy-to-clipboard';
import ReactTooltip from "react-tooltip";
import { useDispatch } from 'react-redux';

import { Dates } from '../../shared/index';
import { CreatedTrees } from '../../../_helpers/_url-providers';
import { cladesServices as cs } from '../../clades/_services/_clades.services';
import TreesModal from './TreesModal';


interface Props {
    trees: Array<CreatedTrees>
    project_id: uuid,
    setItemDetails: Function,
};


export default (props: Props) => {


    const dispatch = useDispatch();


    const max_text_size: number = 25;


    const listClades = async (tree: uuid | undefined): Promise<void> => {
        tree !== undefined && await cs.list(tree, dispatch);
    };


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
                            <Button
                                onClick={() => listClades(item.uuid)}
                                color="link"
                            >
                                {item.title}
                            </Button>

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