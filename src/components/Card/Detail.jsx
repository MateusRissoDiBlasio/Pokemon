import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeContext, themes } from '../../Context/theme';
import { Button } from '../Buttons/Button'
import { ThemeToggleButton } from '../Buttons/Theme-toggle';
import PokemonImage from '/pokemon.svg'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NoImagePlaceHolder from '/No-Pokemon-Image-Placeholder.png'


export function CardDetails() {

  const [pokemonDetails, setPokemonDetails] = useState({});
  const { id } = useParams();

  const noImage = ['koraidon-limited-build', 'koraidon-sprinting-build', 'koraidon-swimming-build', 'koraidon-gliding-build', 'miraidon-low-power-mode', 'miraidon-drive-mode', 'miraidon-aquatic-mode', 'miraidon-glide-mode']


  const getAbilitiesText = async (abilities) => {
    try {
      const abilitiesTexts = await Promise.all(abilities.map(async (ability) => {
        const response = await axios.get(`https://pokeapi.co/api/v2/ability/${ability}`);

        const filteredAbilities = response.data.flavor_text_entries
        const filteredAbilitiesText = filteredAbilities.filter(filteredAbility => { return filteredAbility.language.name === 'en' });

        if (response.data.effect_entries.length === 1){
            
        return response.data.effect_entries[0].effect
                 
            } else if(response.data.effect_entries.length === 0){

              return filteredAbilitiesText[0].flavor_text
              
            } else if (response.data.effect_entries.length > 1 && response.data.effect_entries[1].language.name !== 'de'){
          
              return response.data.effect_entries[1].effect;

            } else{
          
              return response.data.effect_entries[0].effect;
            }
      
      }));
            
      return abilitiesTexts;
      
    } catch (error) {
      console.error('Error while geting ability details:', error);
      return null;
        }
  }
  
  const getPokemons = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const abilitiesTexts = await getAbilitiesText(response.data.abilities.map(ability => ability.ability.name));
      const uniqueAbilityNames = response.data.abilities.reduce((accumulator, current) => {
        if (!accumulator.find((item) => item.ability.name === current.ability.name)){

          accumulator.push(current);
        }
        return accumulator;
      }, []);    

      setPokemonDetails({
        image: response.data.sprites.other.dream_world.front_default,
        name: response.data.name,
        altimage: response.data.sprites.other["official-artwork"].front_default,
        imagegif: response.data.sprites.other.showdown.front_default,
        typeslength: response.data.types.length,
        exception: response.data.sprites.other["official-artwork"].front_shiny,
        exception2: response.data.sprites.other.home.front_shiny,

      })
    
      setPokemonDetails(prevState => ({
        ...prevState,
        types: response.data.types.map(element => element.type.name),
        abilities: uniqueAbilityNames.map((element,index) => ({
        name: element.ability.name,
        text: abilitiesTexts[index]

        })),
        moves: response.data.moves.map(element => element.move.name),
      }))
      
    } catch (error) {
      console.error('Error geting Pokémon data:', error);
    }
  };
 
  
  useEffect(() => {
    getPokemons()
    getAbilitiesText()
  }, [])


  const { theme } = useContext(ThemeContext)
  return (
    
    <div style={{color: theme.color, backgroundColor: theme.background}}>
      
      <HeaderDetails style={{color: theme.cardColor, backgroundColor: theme.detailsHeaderColor}}>
        
        <div>
          <ThemeToggleButton />
          <a href="/Pokemon/"> <Button>Go back</Button></a>
        </div>
        <img src={PokemonImage} alt="" width={'200px'} />
        
      </HeaderDetails>

      <Container>
          
          <ContainerDetailsDiv>

              <Type >
                    
                    {pokemonDetails.typeslength === 2  ? <h4>Types:</h4> : <h4>Type:</h4>}

                    {pokemonDetails.types?.map((type, index) => (
                      <>
                        <img src={`../Pokemon/Mezastar/${type}.png`} alt={type} />
                        <p key={index}>{type}</p>
                      </>
                    ))}
                    
              </Type>
          
              <Poke>
                  
                  <h3>{pokemonDetails.name}</h3>

                  {pokemonDetails.image !== undefined && pokemonDetails.image !== null && pokemonDetails.name !== 'mimikyu-busted' && pokemonDetails.name !== 'mimikyu-totem-busted' && !noImage.includes(pokemonDetails.name) ? <img src={pokemonDetails.image} alt={pokemonDetails.name} width={'300px'} height={'300px'} /> : null}

                  {pokemonDetails.image === undefined && !noImage.includes(pokemonDetails.name) ? <img src={pokemonDetails.altimage} alt={pokemonDetails.name} width={'300px'} height={'300px'} /> : null}

                  {pokemonDetails.image === null && pokemonDetails.name !== 'mimikyu-busted' && pokemonDetails.name !== 'mimikyu-totem-busted' && !noImage.includes(pokemonDetails.name) ? <img src={pokemonDetails.altimage} alt={pokemonDetails.name} width={'300px'} height={'300px'} /> : null}

                  {pokemonDetails.name === 'mimikyu-busted' ? <img src={pokemonDetails.exception} alt={pokemonDetails.name} width={'250px'} height={'250px'} /> : null}

                  {pokemonDetails.name === 'mimikyu-totem-busted' ? <img src={pokemonDetails.exception2} alt={pokemonDetails.name} width={'250px'} height={'250px'} /> : null}

                  {noImage.includes(pokemonDetails.name) ? <img className='noImage' src={NoImagePlaceHolder} alt={pokemonDetails.name} width={'250px'} /> : null}

              </Poke>

          </ContainerDetailsDiv>
          
          <TitlesDiv>
            <h4>Abilities:</h4>
          </TitlesDiv>
          
          <UlAbilities style={{border:theme.btnBorder, backgroundColor: theme.detailsHeaderColor}}>
            {pokemonDetails.abilities?.map((ability, index) => (
              <li key={index}>
                <strong>{ability.name}</strong>: {ability.text}
              </li>
            ))}
          </UlAbilities>
          
          <TitlesDiv>
            <h4>Moves:</h4>
          </TitlesDiv>

          <UlMovesDiv>
            
            <UlMoves style={{border:theme.btnBorder, backgroundColor: theme.detailsHeaderColor}}>
              {pokemonDetails.moves?.sort().map((move, index) => (
                <li key={index}>{move}</li>
              ))}
            </UlMoves>
            <UlGif>
              {pokemonDetails.imagegif !== null ? <img src={pokemonDetails.imagegif} alt={pokemonDetails.name} width={''} height={''} /> : <img className='noImage' src={NoImagePlaceHolder} alt={pokemonDetails.name} width={'120px'} height={'120px'} /> }
            </UlGif>
          </UlMovesDiv>            

      </Container>  

    </div>
  )
}


const HeaderDetails = styled.div`
  height: 12vh;
  padding: 10px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    gap: 10px
  }


    @media screen and (min-width: 320px) and (max-width: 374px) {
      
      max-width: 100vw;
      padding: 0;
      height:16vh;
      justify-content: center;
      
      div{
        flex-direction: column;
        gap: 0;
        margin: 0;
      }

      button{
        width: 100px;
        padding:7px; 
        margin-bottom:0;
        margin-top:5px;
      }

      img{
        width: 180px;
      }

    }

    @media screen and (min-width: 375px) and (max-width: 425px) {
     
      max-width: 100vw;
      padding: 0;
      height: 20vh;
      justify-content: space-around;
      
      div{
        flex-direction: column;
        gap: 0;
        margin: 0;
      }

      button{
        width: 120px;
        padding:10px; 
      }

      img{
        width: 220px;
      }
    }

    @media screen and (min-width: 426px) and (max-width: 500px) {
        
      max-width: 100vw;
      padding: 10px;
      height: 20vh;
      justify-content: space-around;
      
      div{
        flex-direction:column;
        gap: 0;  
      }

      button{
        width: 120px;
        padding:10px; 
      }

      img{
        width: 250px;
      }
    }
`

const Container = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  height: 88vh;
  padding: 0.5rem;

    @media screen and (min-width: 320px) and (max-width: 374px) {

    height: 84vh;

    }

    @media screen and (min-width: 375px) and (max-width: 500px) {

    height: 80vh;

    }
`

const ContainerDetailsDiv = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

`

const Type = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 2rem;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  margin-right: 40px;

  h4 {
    font-family: "Black Ops One", system-ui;
    font-size: 1.8rem;
    font-weight: 300;
  }

  p{
    font-family: "Roboto", sans-serif;
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
    text-transform: uppercase;
  }

  img{ 
    display: flex;
    width: 50%;
    }

   @media screen and (min-width: 320px) and (max-width: 500px) {

      padding: 0;
       gap: 5px;

    }

    @media screen and (min-width: 320px) and (max-width: 374px) {

          margin-right: 5px;

    }

    @media screen and (min-width: 320px) and (max-width: 425px) {

          h4{
            font-size: 1.5rem;
          }

          p{
            font-size: 1.0rem;
          }

    }

    @media screen and (min-width: 375px) and (max-width: 500px) {


          margin-right: 15px;

    }
`

const Poke = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  h3 {
      max-width: 400px;
      text-align: center;
      font-family: "Orbitron", sans-serif;
      font-size: 30px;
      text-transform: uppercase;
      margin-bottom: 10px;
  }
  
  @media screen and (min-width: 320px) and (max-width: 374px) {

    h3 {
      font-size: 24px;      
    }

    img{
      width: 180px;
      height: 180px;
    }

  }

  @media screen and (min-width: 375px) and (max-width: 425px) {

    h3 {
      font-size: 26px;      
    }

    img{
      width: 200px;
      height: 200px;
    }

  }


  @media screen and (min-width: 426px) and (max-width: 500px) {

    img{
      width: 220px;
      height: 220px;
    }

  }
`

const TitlesDiv = styled.div` 
  width: 600px;
  display: flex;
  justify-content: left;
  margin-left: 20px;
   
  h4{
    font-family: "Black Ops One", system-ui;
    font-size: 1.8rem;
    font-weight: 300;
  }

  @media screen and (min-width: 320px) and (max-width: 425px) {
    
    max-width: 90vw;
    margin-left: 10px;

    h4{
    font-size: 1.5rem;
    }

  }

  @media screen and (min-width: 426px) and (max-width: 500px) {

    max-width: 90vw;
    margin-left: 10px;

  }
`

const UlAbilities = styled.ul`
  width: 600px;
  max-height: 140px;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 10px;
  overflow-y: auto;
    
    li {
      font-size: 1.2rem;
      list-style: none;
      font-family: "Roboto", sans-serif;
      text-align: justify;
      margin-bottom: 10px;
        strong{
          text-transform: uppercase;
          font-family: "Orbitron", sans-serif;
        }
    }

    @media screen and (min-width: 320px) and (max-width: 500px) {

      max-width: 90vw;

    }

    @media screen and (min-width: 320px) and (max-width: 374px) {

      max-height: 120px;

    }

    @media screen and (min-width: 320px) and (max-width: 425px) {

      li {
        font-size: 1.0rem;   
      }
          
    }
`

const UlMovesDiv = styled.ul`
  display: flex;
  width: 600px;
  justify-content: space-between;

  @media screen and (min-width: 320px) and (max-width: 500px) {

    width: 90vw;
          
  }
`

const UlMoves = styled.ul`
  display: grid;
  grid-template-columns: auto 200px;
  overflow-y: auto;
  min-height: 80px;
  max-height: 125px; 
  width: 400px;
  border-radius: 5px;
  padding: 8px;
  background-color: grey;
  justify-content: space-between;

    li {
      text-align: center;
      font-size: 1rem;
      list-style: none;
      font-family: "Roboto", sans-serif;
      text-transform: uppercase;
    }

    @media screen and (min-width: 320px) and (max-width: 500px) {
      display: flex;
      flex-direction: column;
      
      li {
        font-size: 0.8rem;
        }
    }

    @media screen and (min-width: 320px) and (max-width: 425px) {
      width: 270px;
    }

    @media screen and (min-width: 426px) and (max-width: 500px) {
      width: 300px;
    }
`

const UlGif = styled.ul`
  display: flex;
  justify-content: center;
  width: 200px;
  align-items: center;
    img{
      opacity: 1;
      animation-name: fadeInOpacity;
      animation-iteration-count: 1;
      animation-timing-function: ease-in;
      animation-duration: 2s;
      max-width: 120px;
      max-height: 120px;
      }
      
      @keyframes fadeInOpacity {
          0% {
      opacity: 0;
          }
          100% {
              opacity: 1;
          }
      }
    }

    .noImage{
      border-radius: 15px;
    }

    @media screen and (min-width: 320px) and (max-width: 374px) {
  
      .noImage{
      margin-left: 5px;
      }
    }
`