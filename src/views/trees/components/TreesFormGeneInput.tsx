import React, { useState } from 'react';
import Downshift from 'downshift'
import { Badge, Input, Label } from 'reactstrap';

import { Gene } from '../../../_helpers/_url-providers';
import { treesServices as ts } from '../_services/_trees.services';


interface Props {
    handleGeneInput: Function,
    gene: Gene | undefined,
};


export default (props: Props) => {


    let is_selected: boolean = props.gene ? true : false;


    const [ genes, setGenes ] = useState<Array<Gene>>([]);


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
                    name_slug: selection.name_slug,
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
                            placeholder={props.gene?.name}
                            onKeyDown={event => { if (event.key === 'Enter') event.preventDefault(); }}
                            {...getInputProps()}
                            {...getRootProps({ refKey: 'innerRef' }, { suppressRefError: true })}
                        />

                        {/* Selection list */}
                        <ul {...getMenuProps()} className="suggestion-list">
                            {isOpen ?
                                genes.map((item, index) => (
                                    <li key={index} className="suggestion-list-item"
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
                                            <small key={index}>
                                                <Badge color="primary" className="m-1" pill>
                                                    { term }
                                                </Badge>
                                            </small>
                                        ))}
                                    </li>
                                )) : null}
                        </ul>

                        {/* Badge to identificate the currently selected gene. */}
                        {is_selected ? (
                            <>
                                <small className="text-muted">Selected: </small>
                                <Badge color="success" pill>
                                    { props.gene?.name } | { props.gene?.name_slug }
                                </Badge>
                            </>
                        ) : null}
                    </>
                )}
        </Downshift>
    )
};