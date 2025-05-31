import { useContext } from 'react';
import { ThemeContext } from '../../Context/theme';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '../../components/Buttons/Button'
import NoImagePlaceHolder from './images/No-Pokemon-Image-card.png'


export function CardsList({ pokemon }) {
   
    const reloadPage = () => {
        window.location.reload();
    };
    
    const { theme } = useContext(ThemeContext)
    const [hidden, setHidden] = useState(-1);
    const noImage = ['koraidon-limited-build', 'koraidon-sprinting-build', 'koraidon-swimming-build', 'koraidon-gliding-build', 'miraidon-low-power-mode', 'miraidon-drive-mode', 'miraidon-aquatic-mode', 'miraidon-glide-mode'];

    
    if (pokemon.length === 1) {

        const poke = pokemon[0];
        
        return (
            <DivCardContainerSearch style={{color: theme.color, backgroundColor: theme.background}}>
                <Link to={`/details/${poke.name}`}>
                    <DivCard style={{color: hidden === -1 ? theme.color : theme.hover, backgroundColor: hidden === -1 ? theme.cardBackground : theme.hover, border: theme.cardBorder, boxShadow: hidden === 0 ? theme.cardshadow : ''}} 
                    onMouseEnter={() => setHidden(0)}
                    onMouseLeave={() => setHidden(-1)}>
                        <h4>{poke.name}</h4>
                        <DivImgCard>
                            
                            {poke.image === undefined ? <img src={poke.altimage} alt={poke.name} /> : null}
                            
                            {poke.image === null && poke.name !== 'mimikyu-busted' && poke.name !== 'mimikyu-totem-busted' && !noImage.includes(poke.name) ? <img src={poke.altimage} alt={poke.name} /> : null}
                            
                            {poke.image !== undefined && poke.image !== null && poke.name !== 'mimikyu-busted' && poke.name !== 'mimikyu-totem-busted' && !noImage.includes(poke.name) ? <img src={poke.image} alt={poke.name} /> : null}
                            
                            {poke.name === 'mimikyu-busted' ? <img src={poke.exception} alt={poke.name} width={'300px'} /> : null}
                            
                            {poke.name === 'mimikyu-totem-busted' ? <img src={poke.exception2} alt={poke.name} width={'300px'} /> : null}
                            
                            {noImage.includes(poke.name) ? <img className='noImage' src={NoImagePlaceHolder} alt={poke.name} width={'250px'} /> : null}
                            
                        </DivImgCard>
                        {hidden === 0 ? <h1 style={{color: theme.detail}}>Click for details</h1> : null}                                              
                    </DivCard>
                </Link>
                <Button
                    onClick={reloadPage}
                >Back to the List
                </Button>
            </DivCardContainerSearch>
        );
    }      
        
    return (
        <DivCardContainer style={{color: theme.color, backgroundColor: theme.background}}>
                {pokemon.map((poke, index) => (
                
                <Link key={index} to={`/details/${poke.name}`}>
                <DivCard key={index} style={{color: hidden === index ? theme.hover : theme.color, backgroundColor: hidden === index ? theme.hover : theme.cardBackground, border: theme.cardBorder, boxShadow: hidden === index ? theme.cardshadow : '' }} 
                            onMouseEnter={() => setHidden(index)}
                            onMouseLeave={() => setHidden(-1)} >
                    
                    <h4>{poke.name}</h4>
                    <DivImgCard>
                        
                        {poke.image === undefined ? <img src={poke.altimage} alt={poke.name} /> : null}
                        
                        {poke.image === null && poke.name !== 'mimikyu-busted' && poke.name !== 'mimikyu-totem-busted' && !noImage.includes(poke.name) ? <img src={poke.altimage} alt={poke.name} /> : null}
                        
                        {poke.image !== undefined && poke.image !== null && poke.name !== 'mimikyu-busted' && poke.name !== 'mimikyu-totem-busted' && !noImage.includes(poke.name) ? <img src={poke.image} alt={poke.name} /> : null}
                        
                        {poke.name === 'mimikyu-busted' ? <img src={poke.exception} alt={poke.name} width={'300px'} /> : null}
                        
                        {poke.name === 'mimikyu-totem-busted' ? <img src={poke.exception2} alt={poke.name} width={'300px'} /> : null}
                        
                        {noImage.includes(poke.name) ? <img className='noImage' src={NoImagePlaceHolder} alt={poke.name} width={'250px'} /> : null}
                                                            
                    </DivImgCard>
                    {hidden === index ? <h1 style={{color: theme.detail}}>Click for details</h1> : null}
                </DivCard>
                </Link>
            ))}
        </DivCardContainer>    
    )
}


const DivCardContainer = styled.div`
    
    display: flex;
    max-width: 75vw;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    gap: 2rem;   
    min-height: 18vh;
`

const DivCardContainerSearch = styled.div`
    
    padding: 1.5rem;
    height: 60vh;
    display: flex;
    flex-direction: column;
    
    button{
            padding: 10px 20px;
            border-radius: 15px;
            cursor: pointer;
            font-size: 1rem; 
            margin-top: 1rem; 

            &:focus {
            outline: none
            }
    }              

    @media screen and (orientation: landscape) and (max-height: 400px) {   
        height: 120vh;
    }
`

const DivCard = styled.div`
]
    min-width: 200px;
    max-width: 220px;
    min-height: 290px;
    max-height: 325px;
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
        margin-top: 10px;
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