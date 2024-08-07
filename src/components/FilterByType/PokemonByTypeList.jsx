import { useContext, useEffect, useState } from "react"
import { getPokemons } from "../../components/FilterByType/GetPokemons"
import { ThemeContext } from "../../Context/theme"
import { Select, SelectStyle } from "../../components/FilterByType/FilterByType"
import styled from "styled-components"
import { Link } from 'react-router-dom'
import { LoadMoreTypes } from "../Buttons/LoadMore"
import { ScrollButton } from "../Buttons/ScrollButton"
import NoImagePlaceHolder from '/No-Pokemon-Image-card.png'

const response = await fetch(`https://pokeapi.co/api/v2/type`)
    const data = await response.json([])
    const { results } = data

    const pokemonTypesNames = results.map((type) => {
        return type.name
    })

    const filteredTypes = pokemonTypesNames.filter((type) => type !== 'unknown' && type !== 'stellar')

const PokemonByTypeList = () => {
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(10)
    const [pokemons, setPokemons] = useState([])
    const [value, setValue] = useState('All')
    const [renderAmount, setRenderAmount] = useState(10)

    const noImage = ['koraidon-limited-build', 'koraidon-sprinting-build', 'koraidon-swimming-build', 'koraidon-gliding-build', 'miraidon-low-power-mode', 'miraidon-drive-mode', 'miraidon-aquatic-mode', 'miraidon-glide-mode'];    
    
    const { theme } = useContext(ThemeContext)

    const handleSelectChange = (e) => {
        setValue(e.target.value);      
    }

    useEffect(() => {
        async function fetchData() {
            (value !== ('All' && 'all')) ? setLimit(1302) : setLimit(limit)

            const renderPokemons = await getPokemons(limit, offset)
            setPokemons([...pokemons, ...renderPokemons])
        }
        fetchData()
    }, [limit, offset, value]);

    const filteredPokemons = pokemons.filter((pokemon, index) => {
        if (pokemon.types.length > 1) {
            return (
                (pokemon.types[0].type.name === value) ||
                (pokemon.types[1].type.name === value)
            )
        } else {
            return (
                (pokemon.types[0].type.name === value)
            )
        }
    })

    const limitFilteredPokemons = filteredPokemons.slice(0, renderAmount)

    const [hidden, setHidden] = useState(-1);

    return (
        <DivCardByType style={{ color: theme.color, backgroundColor: theme.background }}>
            
            <Select value={value} onChange={handleSelectChange} />
        
                        <DivCardContainer >
                            {limitFilteredPokemons.map((pokemon,index) => {
                                
                                return (
                                    <Link key={index} to={`/details/${pokemon.name}`}>
                                        <DivCard key={index} style={ {color: hidden === pokemon ? theme.hover : theme.color, backgroundColor: hidden === pokemon ? theme.hover : theme.cardBackground, border: theme.cardBorder }} 
                                                onMouseEnter={() => setHidden(pokemon)}
                                                onMouseLeave={() => setHidden(-1)} >
                                            
                                            <h4>{pokemon.name}</h4>
                                            <DivImgCard>

                                                {pokemon.sprites.other.dream_world.front_default === undefined ? <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} /> : null}
                            
                                                {pokemon.sprites.other.dream_world.front_default === null && pokemon.name !== 'mimikyu-busted' && pokemon.name !== 'mimikyu-totem-busted' && !noImage.includes(pokemon.name) ? <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} /> : null}
                                                
                                                {pokemon.sprites.other.dream_world.front_default !== undefined && pokemon.sprites.other.dream_world.front_default !== null && pokemon.name !== 'mimikyu-busted' && pokemon.name !== 'mimikyu-totem-busted' && !noImage.includes(pokemon.name) ? <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} /> : null}
                                                
                                                {pokemon.name === 'mimikyu-busted' ? <img src={pokemon.sprites.other["official-artwork"].front_shiny} alt={pokemon.name} width={'300px'} /> : null}
                                                
                                                {pokemon.name === 'mimikyu-totem-busted' ? <img src={pokemon.sprites.other.home.front_shiny} alt={pokemon.name} width={'300px'} /> : null}
                                                
                                                {noImage.includes(pokemon.name) ? <img className='noImage' src={NoImagePlaceHolder} alt={pokemon.name} width={'250px'} /> : null}
                                                                                                                                               
                                            </DivImgCard>
                                            
                                            {hidden === pokemon ? <h1 style={{ color: theme.detail}}>Click for details</h1> : null }                                              
                                                                                
                                        </DivCard>
                                    </Link>
                                )
                            })}
                        </DivCardContainer>

                        <DivBtn>
                            { filteredTypes.includes(value) ? <LoadMoreTypes setRenderAmount={setRenderAmount} renderAmount={renderAmount} setOffset={setOffset} offset={offset} /> : null }                           
                        </DivBtn>

                        <DivScrollBtn>
                            { filteredTypes.includes(value) ? <ScrollButton /> : null }
                        </DivScrollBtn>                                            

        </DivCardByType>
    )
}

const DivCardContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   align-items: Flex-start;
   max-width: 75vw;
   justify-content: center;
   gap: 2rem;
   margin-top: 9px;
`

const DivCardByType = styled.div`
    padding: 1.5rem;
    min-height: 80vh;
    display: flex;
    flex-direction: column;   

        button{
                padding: 10px 20px;
                border-radius: 15px;
                cursor: pointer;
                font-size: 1rem; 
                border: 2px solid var(--card-yellow);
                margin-top: 1rem; 

                &:focus {
                outline: none
                }
        }
        label{
            display:flex;
            justify-content: center;               
        }        
`

const DivBtn = styled.div`
margin-top: 1rem;
    div{
            justify-content: center;
            display: flex;
        }
`

const DivCard = styled.div`
    min-width: 220px;
    min-height: 265px;
    border-radius: 5px;
    padding: 0.5rem;

    h4 {
        text-transform: uppercase;
        text-align: center;
        color: white;
        min-height: 50px;
        max-width: 200px;
        font-family: "Orbitron", sans-serif;
        font-size: 20px;
    }
    
    img {
        height:150px;
        width: 180px;
        filter: drop-shadow(10px 10px 20px #FFF);
    }

    &:hover img {
        filter: drop-shadow(10px 10px 20px #000000);
        }

    h1{ 
        font-size: 1rem; 
        display: flex;
        justify-content: center; 
    }

    h1{
        opacity: 1;
	    animation-name: fadeInOpacity;
	    animation-iteration-count: 1;
	    animation-timing-function: ease-in;
	    animation-duration: 0.5s;
    }
    @keyframes fadeInOpacity {
        0% {
		opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }    
`

const DivImgCard = styled.div`
   
   margin: 0.5rem;
`

const DivScrollBtn = styled.div`
display: flex;
font-size: 40px;
border-radius: 40px;
cursor: pointer;
justify-content: center;
`

export { PokemonByTypeList }
