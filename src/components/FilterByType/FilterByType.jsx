import { useEffect, useState } from "react";
import { getPokemonTypes } from "../../components/FilterByType/Get-type";
import styled from "styled-components";


export const Select = ({ value, onChange }) => {
    const [pokemonType, setPokemonType] = useState([])
    const [selectDisabled, setSelectDisabled] = useState(false);
    
    function handleSelectChange (){

        if(value === 'normal' || value === 'fighting' || value === 'flying' || value === 'poison' || value === 'ground' || value === 'rock' || value === 'bug' || value === 'ghost' || value === 'steel' || value === 'fire' || value === 'water' || value === 'grass' || value === 'electric' || value === 'psychic' || value === 'ice' || value === 'dragon' || value === 'dark' || value === 'fairy' ){
    
    
            setSelectDisabled(true);   
        }
        if(value === 'All'){

            setSelectDisabled(false);   
        }
    }
    setTimeout(() => {handleSelectChange()}, 100);

    useEffect(() => {        

        async function fetchType() {
            const pokemonTypes = await getPokemonTypes()
            setPokemonType(pokemonTypes)   
        }
        fetchType();
                
        
    }, []);
    

    return (
        <label>
            
            <SelectStyle name="selectedType" value={value} onChange={onChange} disabled={selectDisabled}>
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