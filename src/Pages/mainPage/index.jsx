import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../Context/theme';
import { CardsList } from '../../components/Card/Card';
import styled from 'styled-components';
import axios from 'axios';
import { LoadMoreButton } from '../../components/Buttons/LoadMore';
import { PokemonByTypeList } from '../../components/FilterByType/PokemonByTypeList';
import { Button } from '../../components/Buttons/Button';
import { ScrollButton } from '../../components/Buttons/ScrollButton'
import Go from '/go.png'

export function MainPage() {
    const { theme } = useContext(ThemeContext)

    const [pokemons, setPokemons] = useState([])
    const [limit, setLimit] = useState(10)
    const [search, setSearch] = useState('')
    var   [value,setValue] = useState(true)
    const [hovering, setHovering] = useState(-1);

    const pokeNamesWithNumbers = ['zygarde-10' , 'zygarde-50', 'zygarde-10-power-construct', 'zygarde-50-power-construct', 'porygon2' ]
    

    const getPokemons = async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
            const pokemonData = await Promise.all(response.data.results.map(async (pokemon) => {
            const pokemonResponse = await axios.get(pokemon.url);
                
                return {
                    name: pokemon.name,              
                    image: pokemonResponse.data.sprites.other.dream_world.front_default,
                    types: pokemonResponse.data.types,
                    altimage: pokemonResponse.data.sprites.other["official-artwork"].front_default,
                    exception: pokemonResponse.data.sprites.other["official-artwork"].front_shiny,
                    exception2: pokemonResponse.data.sprites.other.home.front_shiny,                   
                };
            }));
            setPokemons(pokemonData);
            setLimit(limit + 10)
            
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        }
    };

    useEffect(() => {
        getPokemons()
    }, [])

    const scrollDown = () => {
        window.scrollBy({
            
        top: 325,
        behavior: 'smooth'

        });
    };
    
    const [loading, setLoading] = useState(false);
    // const [data, setData] = useState(null);

    const getPokemonsByName = async (name) => {
        
        setLoading(true);
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            
            const pokemonData = {
                name: response.data.name,
                image: response.data.sprites.other.dream_world.front_default,
                altimage: response.data.sprites.other["official-artwork"].front_default,
                exception: response.data.sprites.other["official-artwork"].front_shiny,
                exception2: response.data.sprites.other.home.front_shiny,

            }
            setPokemons([pokemonData]);
            // setData(pokemonData)

            if( search.trim() === pokemonData.name){
                setVisible(false)
                scrollDown()
            
            }        
            
        } catch (error) {
            console.error('Error fetching Pokémon data:', error.response.data);             
            if(error.response.data === "Not Found"){
                handleClick(setErrorMessage('Invalid Pokemón'))
                setVisible(true)
                setShake(true)
            }
        }  finally {
            setLoading(false);
          }
        
    };

    const getName = (event) => {
               
        const query = event.target.value;    
        let inputNonLettersCheck = /^[a-zA-Z-]+$/;

        if(!isNaN(query) && query.trim() !== '') {
            setErrorMessage('Numbers are Invalid !')
            setVisible(true)
            setShake(true)
            setSearch(null)
        
        } else if(inputNonLettersCheck.test(query) === false && query.trim() !== '' && !pokeNamesWithNumbers.includes(query.trim())){
            setErrorMessage('Symbols and Numbers are Invalid!')
            setVisible(true)
            setShake(true)
            
            if(pokeNamesWithNumbers.includes(query.trim().toLowerCase())){

                setSearch(query.trim().toLowerCase());

            } else{ 
                setSearch('invalid')
            }

        }
            
        if((!isNaN(query) && query.trim() !== '') || (inputNonLettersCheck.test(query) === false && query.trim() !== '' && !pokeNamesWithNumbers.includes(query.trim())) === false ){
               
            setSearch(query.toLowerCase());
        }

    }
    
    const [errorMessage, setErrorMessage] = useState('')
    const [visible, setVisible] = useState(false)
    const [shake, setShake] = useState(false)
    
    const handleEnter = () => {
        
        if(pokeNamesWithNumbers.includes(search.trim().toLowerCase())){
            
            getPokemonsByName(search.trim().toLowerCase())

        }else if(search!==null){
        
            getPokemonsByName(search.replace(/[^a-z-]/gi, '').toLowerCase()); 

        }

        handleClick();       

    }

    const handleClick = () => {
        
        if(!isNaN(search.trim()) && search.trim() !== ''){
            
            setVisible(true)
            setShake(true)
            setErrorMessage('Numbers are Invalid!');
            
        }else if (search.trim() === '') {
                
            setVisible(true)
            setShake(true)
            setErrorMessage('Input cannot be empty'); 
            
            }else if(search === 'invalid'){
                
                setErrorMessage('Invalid Pokemón ! Symbols and Numbers are Invalid!')
                setVisible(true)
                setShake(true)
            
            }
                
    }; 

    if (pokemons.length === 1) {

        return (

            <DivMainPage style={{ color: theme.color, backgroundColor: theme.background }}>
                <DivSearchPoke>
                    <label htmlFor="input">Search for a Pokémon</label>
                    
                    <SearchInput
                        id='input'
                        placeholder='By Name'
                        style={{ color: theme.color, backgroundColor: theme.background, border: visible === true ? theme.btnBorderHover : theme.btnBorder, boxShadow: visible === true ? theme.shaddow : null}}
                        onChange={getName}
                        type='input'
                        className={shake ? 'animate invalidinput': ''}
                        onAnimationEnd={() => setShake(false)}
                        onKeyDown={ e => e.key ==='Enter' ? handleEnter() :''}                        
                    
                    />
                    <button onClick={ () => {handleEnter(); handleClick()}} onMouseEnter={() => setHovering(0)} onMouseLeave={() => setHovering(-1)} style={{ color: hovering ? theme.color : theme.revcolor, backgroundColor: hovering ? theme.background : theme.color, border: theme.btnBorder }}><img src={Go}></img>!</button>
                    {visible === true ? <h2 key={errorMessage} style={{ color: 'red' }}>{errorMessage}</h2> : null}
                    {loading ? <p className={'load'}>Loading...</p> : ''}
                    
                </DivSearchPoke>
                
                <CardsList pokemon={pokemons} />            
                
            </DivMainPage>
        )
    }
        
    return (

        <DivMainPage style={{ color: theme.color, backgroundColor: theme.background }}>
            <DivSearchPoke>
                <label htmlFor="input">Search for a Pokémon</label>
                <SearchInput
                    id='input'
                    placeholder='By Name'
                    style={{ color: theme.color, backgroundColor: theme.background, border: visible === true ? theme.btnBorderHover : theme.btnBorder, boxShadow: visible === true ? theme.shaddow : null}}
                    onChange={getName}
                    type='input'
                    className={shake ? 'animate invalidinput': ''}
                    onAnimationEnd={() => setShake(false)}
                    onKeyDown={ e => e.key ==='Enter' ? handleEnter() :''}
                />
                <button onClick={ () => {handleEnter(); handleClick()}} onMouseEnter={() => setHovering(0)} onMouseLeave={() => setHovering(-1)} style={{ color: hovering ? theme.color : theme.revcolor, backgroundColor: hovering ? theme.background : theme.color, border: theme.btnBorder }}><img src={Go}></img>!</button>
                {visible === true ? <h2 key={errorMessage} style={{ color: 'red' }}>{errorMessage}</h2> : null}
                {loading ? <p className={'load'} >Loading...</p> : ''}
                
            </DivSearchPoke>
            
            <Button onClick={()=> setValue(value === true ? false : true )}>{value === true ? "By Type" : "Random List" }</Button>

            {value === true ?  <Random>
                                    <h2>Random Pokemóns</h2>
                                    <CardsList pokemon={pokemons} />
                                    <LoadMoreButton onClick={() => getPokemons()} />
                                    <ScrollButton />
                                </Random> : <PokemonByTypeList/> 
            }

        </DivMainPage>
    )
    
}

const Random = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2{
        font-family: "Orbitron", sans-serif;
        text-align: center;
    }
`

const DivMainPage = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center; 

    label{
        font-size: 1.5rem;
        margin-bottom: 10px;
        font-weight: bold;
        color: var(--black);
        font-family: "Orbitron", sans-serif;
        text-align: center;
    }
    button{
        min-width:7rem;
    }
`

const SearchInput = styled.input`
    height: 3rem;
    width: 100%;
    padding: 10px 20px;
    max-width: 15rem;
    border-radius: 5px;
    font-size: 1rem;

    &:focus {
        outline: none;
    }            
`

const DivSearchPoke = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    height: 285px;
    width: 80vw;

    .load{
        font-family: "Orbitron", sans-serif;
        font-weight: 700;
        text-transform: uppercase;
        opacity: 1;
	    animation-name: fadeInOpacity;
	    animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: 0.3s;
        color: red;
        text-shadow: 1px 1px black;
    }

    button{
        width: 180px;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
        font-size: 50px;
        justify-content: center;

        &:focus {
            outline: none;
        } 
    }

    button img{
        margin-top: 10px;
        width: 90px;   
    } 

    h2{
        font-family: "Orbitron", sans-serif;
        font-weight: 700;
        text-transform: uppercase;
        opacity: 1;
	    animation-name: fadeInOpacity;
	    animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: 0.5s;
        text-align: center;
        max-width: 450px;
    }
    
    @keyframes fadeInOpacity {
        0% {
		opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }  

    .animate{
        animation: shake 0.2s ease-in-out 0s 2;
    }

    .invalidinput {   
        box-shadow: 0 0 0.6rem #ff0000;
    }

     @keyframes shake {
            0% {
                margin-left: 0rem;
            }
            25% {
                margin-left: 0.5rem;
            }
            75% {
                margin-left: -0.5rem;
            }
            100% {
                margin-left: 0rem;
        } 
    }

    @media screen and (min-width: 320px) and (max-width: 374px) {
        height:315px;
        
        h2{
            font-size: 16px;
        }
    }

    @media screen and (min-width: 375px) and (max-width: 425px) {
        height:300px;
        h2{
            font-size: 20px;
        }
        
    }

    @media screen and (min-width: 426px) and (max-width: 500px) {
        height:300px;
        h2{
            font-size: 22px;
        }
        
    }
`
