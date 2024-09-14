import { useContext, useEffect, useState } from "react"
import { getPokemons } from "../../components/FilterByType/GetPokemons"
import { ThemeContext } from "../../Context/theme"
import { Select } from "../../components/FilterByType/FilterByType"
import styled from "styled-components"
import { Link } from 'react-router-dom'
import { LoadMoreTypes } from "../Buttons/LoadMore"
import { ScrollButton } from "../Buttons/ScrollButton"
import NoImagePlaceHolder from '/No-Pokemon-Image-card.png'
import UseAnimations from 'react-useanimations';
import lock from 'react-useanimations/lib/lock';

const response = await fetch(`https://pokeapi.co/api/v2/type`)
    const data = await response.json([])
    const { results } = data

    const pokemonTypesNames = results.map((type) => {
        return type.name
    })

    const filteredTypes = pokemonTypesNames.filter((type) => type !== 'unknown' && type !== 'stellar')

const PokemonByTypeList = () => {
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(0)
    const [pokemons, setPokemons] = useState([])
    const [value, setValue] = useState('All')
    const [renderAmount, setRenderAmount] = useState(10)
    const [active, setActive] = useState(false)
    const [show, setShow] = useState(false)
    const [loadLimit, setLoadLimit] = useState(0)
    
    const noImage = ['koraidon-limited-build', 'koraidon-sprinting-build', 'koraidon-swimming-build', 'koraidon-gliding-build', 'miraidon-low-power-mode', 'miraidon-drive-mode', 'miraidon-aquatic-mode', 'miraidon-glide-mode'];
    
    const offsetLimits = [{types: ['ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'electric', 'ice', 'dragon', 'dark', 'fairy', 'fighting'], limitValue: 1300 }, {types: ['poison'], limitValue: 1400}, {types: ['psychic'], limitValue: 1500}, {types: ['flying', 'grass'], limitValue: 1700}, {types: ['normal'], limitValue: 1800}, {types: ['water'], limitValue: 2100}]


    const { theme } = useContext(ThemeContext)

    const handleSelectChange = (e) => {
        setValue(e.target.value);
        const filteredLimits = offsetLimits.filter(l => l.types.includes(e.target.value));
        setActive(true);
        setLoadLimit(filteredLimits[0].limitValue);
        setIsLockDisabled(false)
        setChecked(false)
    }
    
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTryAgain(false);
        setDisabled(true);
       
        async function fetchData() {
        
        try{
            
            if ((value === "poison" && offset === 400) || (value === "poison" && offset === 500)) {setTryAgain(true), setLoading(false)}

            if ((value === "ground" || value === "bug" || value === "steel") && offset === 100) {
                setTryAgain(true), setLoading(false)}  
            
            if (value === "water" && offset === 200) {setTryAgain(true), setLoading(false)}
            
            if (value === "dragon" && offset === 500) {setTryAgain(true), setLoading(false)}

            if ((value === "dark" || value === "dragon") && offset === 0) {setOffset(+100)}

            (value !== ('All' && 'all')) ? setLimit(0) : setLimit(limit) 
            const renderPokemons = await getPokemons(limit+100, offset)
            setPokemons([...pokemons, ...renderPokemons])
       
        }catch(error){
            console.log(error);
             
        }

        finally {
            setLoading(false);
            setDisabled(false);            
         }
 
    }
        fetchData()
    }, [limit, offset, value]);

    const [tryAgain, setTryAgain] = useState(false);

    if(offset === loadLimit && value !== 'All'){
        setActive(false)
        setShow(true)
        setOffset(loadLimit+100)
    };


    const filteredPokemons = pokemons.filter((pokemon) => {
        if (pokemon.types.length > 1 && pokemon.types[1].type.name === value) {
            return (
                (pokemon)  
            )
        } else if (pokemon.types.length > 0 && pokemon.types[0].type.name === value){
            return (
                (pokemon)
            )
        }
    });

    const limitFilteredPokemons = filteredPokemons.slice(0, renderAmount);
    const uniqueName = limitFilteredPokemons.filter((obj,index) => limitFilteredPokemons.findIndex((item) => item.name === obj.name) === index);
        
    const [hidden, setHidden] = useState(-1);
    const [checked, setChecked] = useState(false);
    const [lockHover, setLockHover] = useState(-1);
    const [isLockDisabled, setIsLockDisabled] = useState(true);

    const LockPuro = () => {
        
        return (
          <DivLockPuro style={{color: lockHover === -1 ? theme.color : theme.revcolor , backgroundColor: lockHover === -1 ? theme.btnBackground : theme.revBtnBackground, border: theme.btnBorder}}
          className={`container ${isLockDisabled ? 'disabled' : ''}`}
          onClick={()=> {setOffset(0), setLimit(0), setPokemons([]), setValue('All'), setRenderAmount(10), setActive(false), setShow(false), setLoadLimit(''), setTimeout(() => {setChecked(true), setLockHover(-1), setIsLockDisabled(true)}, 150), setTimeout(() => {setChecked(false)}, 2000)}}
          >
            <UseAnimations size={50} wrapperStyle={{ marginTop: '5px' }} animation={lock} autoplay={checked} strokeColor={lockHover === -1 ? theme.color: theme.revcolor}/>
                Unlock <br/> Selection
          </DivLockPuro>
        );
      };  
    
    

    return (
        <DivCardByType style={{color: theme.color, backgroundColor: theme.background}}>
            
            <Select value={value} onChange={handleSelectChange}/>
            
            <div className={isLockDisabled ? 'disabledDivOn' : 'disabledDiv'} onMouseEnter={() => setLockHover(0)} onMouseLeave={() => setLockHover(-1)}>
                <LockPuro />
            </div>
                        <DivCardContainer >
                            {uniqueName.map((pokemon,index) => {
                                
                                return (
                                    <Link key={index} to={`/details/${pokemon.name}`}>
                                        <DivCard key={index} style={{color: hidden === pokemon ? theme.hover : theme.color, backgroundColor: hidden === pokemon ? theme.hover : theme.cardBackground, border: theme.cardBorder}} 
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
                                            
                                            {hidden === pokemon ? <h1 style={{color: theme.detail}}>Click for details</h1> : null}                                              
                                                                                
                                        </DivCard>
                                    </Link>
                                )
                            })}
                        </DivCardContainer>
                        
                        <DivLoading>
                            {loading ? <p className={'load'}>Loading...</p> : ''}
                            {tryAgain ? <p className={'load'}>Try again...</p> : ''}

                        </DivLoading>
                        
                        <DivBtn>
                            {filteredTypes.includes(value) && active ? <LoadMoreTypes setRenderAmount={setRenderAmount} renderAmount={renderAmount} setOffset={setOffset} offset={offset} /> : <p className={show ? 'limitreached' : 'hide'}>WE RAN OUT OF POKÉMONS<br/>FROM THIS TYPE <br/> THERE ARE {uniqueName.length} <br/> {value} POKÉMONS</p>}
                        </DivBtn>

                        <DivScrollBtn>
                            {filteredTypes.includes(value) ? <ScrollButton /> : null}
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

        .disabledDiv{
            justify-content: center;               
            max-width: 130px;
            align-self: center;
            margin-bottom: 10px;
        }
        .disabledDivOn{
            justify-content: center;               
            max-width: 130px;
            align-self: center;
            margin-bottom: 10px;
            pointer-events: none;
            opacity: 0.3;
        }
          
`

const DivLoading = styled.div`
    margin-top: 10px;
    display: flex;
    height: 15px;
    justify-content: center;
    
    .load{
            font-size: 1.5rem;
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
            margin-top: 5px;
        }                      
`

const DivBtn = styled.div`
    margin-top: 1rem;
        div{
                justify-content: center;
                display: flex;
            }

    p{
        display: flex;
        min-height: 102px;
        max-height: 120px;
        text-align: center;
    }

    .alert{
        color: yellow;
    }

    .limitreached{
        margin-top: -25px;
        color: red;
        font-family: "Orbitron", sans-serif;
        font-weight: 700;
        text-transform: uppercase;
        font-size:20px;
        justify-content: center;
        padding: 5px;
        align-itens: center;
        opacity: 1;
        animation-name: fadeInOpacity;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: 2s;
        margin-bottom: 15px;
        
    }

    .hide{
        
        opacity: 0;

    }

    @keyframes fadeInOpacity {
            0% {
            opacity: 0;
            }
            100% {
                opacity: 1;
            }
    }

    @media screen and (min-width: 320px) and (max-width: 374px) {
        .limitreached{      
            font-size: 16px;
            margin-bottom: 10px;
            max-width: 75vw;
        }
    }

    @media screen and (min-width: 375px) and (max-width: 425px) {
        .limitreached{      
            font-size: 18px;
            margin-bottom: 20px;
            max-width: 75vw;
    }
            
    }

    @media screen and (min-width: 426px) and (max-width: 500px) {
        .limitreached{      
            font-size: 18px;
            margin-bottom: 20px;
            max-width: 75vw;
        }
    }
`

const DivCard = styled.div`
    min-width: 220px;
    min-height: 290px;
    border-radius: 5px;
    padding: 0.5rem;

    h4 {
        text-transform: uppercase;
        text-align: center;
        color: white;
        min-height: 75px;
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

const DivLockPuro = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px 20px 10px 20px;
    border-radius: 15px;
    cursor: pointer;
    font-size: 1rem; 
    margin: 10px;
    align-self: center;
    text-align: center;
    
    div{
        align-self: center;
    }
    
    &:focus {
      outline: none
    }
`


export { PokemonByTypeList }
