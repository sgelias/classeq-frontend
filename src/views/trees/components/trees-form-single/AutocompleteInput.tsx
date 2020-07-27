import React, { useState } from 'react';
import Downshift from 'downshift'
import { Badge, Input, Label } from 'reactstrap';

import { Gene } from '../../../../_helpers/url-providers';
import { treesServices as ts } from '../_trees.services';


interface Props {
    handleGeneInput: Function,
    gene: Gene | undefined,
};


const AutocompleteInput = (props: Props) => {


    let is_selected: boolean = props.gene ? true : false;


    const [genes, setGenes] = useState<Array<Gene>>([]);


    const handleGenes = (genes: Gene[]) => {
        setGenes([...genes]);
    };


    return (
        <Downshift
            itemToString={item => (item ? item.name : '')}
            onChange={selection => {
                props.handleGeneInput({
                    id: selection.id,
                    name: selection.name,
                    name_slug: selection.data,
                    meta: selection.meta,
                });
            }}
            onInputValueChange={value => {
                if (value.length > 2) {
                    ts.searchGene(value).then(res => {
                        handleGenes(res.data.results);
                    })
                }
            }}
        >
            {({
                getInputProps,
                getItemProps,
                getLabelProps,
                getMenuProps,
                getRootProps,
                isOpen,
                highlightedIndex,
                selectedItem,
            }) => (
                    <>
                        {/* Input field to select genes */}
                        <Label {...getLabelProps()} for="gene">Gene</Label>
                        <Input
                            type="text"
                            name="gene"
                            id="gene"
                            required={true}
                            onKeyDown={event => { if (event.key === 'Enter') event.preventDefault(); }}
                            {...getInputProps()}
                            {...getRootProps({ refKey: 'innerRef' }, { suppressRefError: true })}
                        />

                        {/* Selection list */}
                        <ul {...getMenuProps()}>
                            {isOpen ?
                                genes.map((item, index) => (
                                    <li key={index}
                                        {...getItemProps({
                                            item, index, key: index, style: {
                                                listStyle: 'mone',
                                                backgroundColor:
                                                    highlightedIndex === index ? 'lightgray' : 'white',
                                                    fontWeight: selectedItem === item ? 'bold' : 'normal',
                                            },
                                        })}
                                    >
                                        <span>{item.name}</span><br/>
                                        {item.meta.terms.map((term, index) => (
                                            <Badge color="secondary" className="m-1" key={index} pill>
                                                { term }
                                            </Badge>
                                        ))}
                                    </li>
                                )) : null}
                        </ul>

                        {/* Badge to identificate the currently selected gene. */}
                        {is_selected ? (
                            <>
                                <small className="text-muted">Selected: </small>
                                <Badge color="success" pill>
                                    {props.gene?.name}
                                </Badge>
                            </>
                        ) : null}
                    </>
                )}
        </Downshift>
    )
}


export default AutocompleteInput;