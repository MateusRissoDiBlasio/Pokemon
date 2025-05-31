import { useContext } from 'react';
import { ThemeContext } from '../../Context/theme';
import styled from 'styled-components';
import PokemonImage from '../images/pokemon.svg';
import PokeBallGif from '../images/pokeball.gif';
import { ThemeToggleButton } from '../../components/Buttons/Theme-toggle';


export function Header() {
    const { theme } = useContext(ThemeContext)

    return (
        <div style={{ color: theme.color, backgroundColor: theme.background, borderBottom: theme.btnBorder }}>
            <HeaderTopInfo>
                <ThemeToggleButton />
                
            </HeaderTopInfo>

            <HeaderContainer>
                <img className="reverse" src={PokeBallGif} alt="pokeball"></img>
                <img className="pokelogo" src={PokemonImage} alt="pokelogo"/>
                <img className="right" src={PokeBallGif} alt="pokeball"></img>
            </HeaderContainer>
        </div>
    )
}

const HeaderContainer = styled.header`
    
    height: 20vh;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
        width: 100%; 
        height: auto; 
        max-width: 300px; 
        padding-bottom: 2rem;
        z-index: 1;
        margin: -100px;
    }

    .reverse{
        -moz-transform: scaleX(-1);
        -o-transform: scaleX(-1);
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
        z-index: 0;
       
    }

    .right{
        margin: -100px;
        z-index: 0;
    }
    @media screen and (max-width: 600px) {
        flex-direction: column;            
    }
    
    @media screen and (max-width: 320px) { 
        margin-left: 10px;
        margin-right: 10px;
        height: 25vh;
        
        img {
            width: 80%;
              
        }

        .right{
            margin: -65px;
        }

        .reverse{
            margin: -65px;
        }

    }

    @media screen and (min-width: 321px) and (max-width: 600px) {
        
        height: 30vh;
        margin-left: 10px;
        margin-right: 10px;  
        
        img {
            width: 80%;
              
        }

        .right{
            margin: -90px;
        }

        .reverse{
            margin: -90px;
        }

    }

    @media screen and (orientation: landscape) and (max-height: 400px) {
        
        .pokelogo {
            width: 260px;       
        }
    }
`

const HeaderTopInfo = styled.div`
    
    display: flex;
    justify-content: space-between;
    padding: 10px;
    
    @media screen and (max-width: 600px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`
