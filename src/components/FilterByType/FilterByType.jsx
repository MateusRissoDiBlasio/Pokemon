import React, { useEffect, useState } from "react";
import { getPokemonTypes } from "../../components/FilterByType/Get-type";
import styled from "styled-components";


export const Select = ({ value, onChange }) => {
    const [pokemonType, setPokemonType] = useState([])

    useEffect(() => {
        async function fetchType() {
            const pokemonTypes = await getPokemonTypes()
            setPokemonType(pokemonTypes)
        }
        fetchType()
    }, []);

    return (
        <label>
            <SelectStyle name="selectedType" value={value} onChange={onChange}>
                <option value="All">Select type</option>

                {pokemonType.map((type) => {
                    return (
                        <option key={type.id} value={type.name}>{type.name}</option>
                    )
                })}
            </SelectStyle>
        </label>
    )
}

export const SelectStyle = styled.select`
width: 150px;
text-align: center;
font-family: font-family: "Roboto", sans-serif;
font-weight: 700;
text-transform: uppercase;
height: 40px;
`