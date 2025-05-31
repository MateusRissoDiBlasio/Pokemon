import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../Context/theme';
import { Button } from '../Buttons/Button'
import { ThemeToggleButton } from '../Buttons/Theme-toggle';
import { Link } from 'react-router-dom';
import PokemonImage from '/pokemon.svg'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NoImagePlaceHolder from '/No-Pokemon-Image-Placeholder.png'
import '../../css/styles.css';
import {Stage1Light, Stage2Light, Stage3Light, Stage1Dark, Stage2Dark, Stage3Dark}  from '../Icons/StagesLogos';
import Swiper from '../Buttons/Swiper';



export function CardDetails() {

  const [pokemonDetails, setPokemonDetails] = useState({});
  const { id } = useParams();

  const noImage = ['koraidon-limited-build', 'koraidon-sprinting-build', 'koraidon-swimming-build', 'koraidon-gliding-build', 'miraidon-low-power-mode', 'miraidon-drive-mode', 'miraidon-aquatic-mode', 'miraidon-glide-mode']

  const Exceptions = ['slowpoke', 'nincada','clamperl', 'snorunt', 'eevee', 'tyrogue', 'burmy', 'poliwag', 'oddish', 'ralts', 'wurmple']


  const getAbilitiesText = async (abilities) => {
    try {
      const abilitiesTexts = await Promise.all(abilities.map(async (ability) => {
        const response = await axios.get(`https://pokeapi.co/api/v2/ability/${ability}`);

        const filteredAbilities = response.data.flavor_text_entries;
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
        namesize: response.data.name.length

      })
    
      setPokemonDetails(prevState => ({
        ...prevState,
        types: response.data.types.map(element => element.type.name),
        abilities: uniqueAbilityNames.map((element,index) => ({
        name: element.ability.name,
        text: abilitiesTexts[index],
        })),
        abilitieslength: uniqueAbilityNames.length,
        moves: response.data.moves.map(element => element.move.name),
        moveslength: response.data.moves.length,
      }))
      
    } catch (error) {
      console.error('Error geting Pokémon data:', error);
    }
  }

  useEffect(() => {
    getPokemons()
    getAbilitiesText()
  }, [])

  const [pokemonEvolutionDetails, setPokemonEvolutionDetails] = useState(false);
  const [evolutionDetails, setEvolutionDetails] = useState([]);
  const [speciesEvolutionImgs, setSpeciesEvolutionImgs] = useState([]);

  const getSpeciesEvolution = async () => {

    try{
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
      const chainId = response.data.evolution_chain.url.replace('https://pokeapi.co/api/v2/evolution-chain/','');
      // console.log(chainId)
      const responseEvolution = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${chainId}`);
      // console.log(responseEvolution.data.chain.evolves_to.length);
      // console.log(responseEvolution.data.chain.evolves_to[0] === undefined);
      // console.log(responseEvolution.data.chain.evolves_to.length) 
      console.log(responseEvolution.data.chain.evolves_to[0] === undefined && responseEvolution.data.chain.evolves_to.length === 0)
      

      // EXCEÇÕES PARA SE TRABALHAR
      
      if(responseEvolution.data.chain.species.name === 'wurmple' ){

        setEvolutionDetails({
          
          stage1: responseEvolution.data.chain.species.name,
          stage2: responseEvolution.data.chain.evolves_to[0].species.name,
          stage2option2: responseEvolution.data.chain.evolves_to[1].species.name,
          stage3: responseEvolution.data.chain.evolves_to[0].evolves_to[0].species.name,
          stage3option2: responseEvolution.data.chain.evolves_to[1].evolves_to[0].species.name,
  
        })
        
      }

      if(responseEvolution.data.chain.species.name === 'burmy'){

        setEvolutionDetails({
          
        stage1: responseEvolution.data.chain.species.name,
        stage2: responseEvolution.data.chain.evolves_to[0].species.name,
        stage2option2: responseEvolution.data.chain.evolves_to[1].species.name
        
      })}
      
      if(responseEvolution.data.chain.species.name === 'tyrogue'){

        setEvolutionDetails({
        
          stage1: responseEvolution.data.chain.species.name,
          stage2: responseEvolution.data.chain.evolves_to[0].species.name,
          stage2option2: responseEvolution.data.chain.evolves_to[1].species.name,
          stage2option3: responseEvolution.data.chain.evolves_to[2].species.name
      })}

      if(responseEvolution.data.chain.species.name === 'poliwag' || responseEvolution.data.chain.species.name === 'oddish' || responseEvolution.data.chain.species.name === 'ralts'){
        
        setEvolutionDetails({
        
          stage1: responseEvolution.data.chain.species.name,
          stage2: responseEvolution.data.chain.evolves_to[0].species.name,
          stage3: responseEvolution.data.chain.evolves_to[0].evolves_to[0].species.name,
          stage3option2: responseEvolution.data.chain.evolves_to[0].evolves_to[1].species.name
      })}

      if(responseEvolution.data.chain.species.name === 'slowpoke' || responseEvolution.data.chain.species.name === 'nincada' || responseEvolution.data.chain.species.name === 'clamperl'|| responseEvolution.data.chain.species.name === 'snorunt'){

        setEvolutionDetails({
        
          stage1: responseEvolution.data.chain.species.name,
          stage2: responseEvolution.data.chain.evolves_to[0].species.name,
          stage2option2: responseEvolution.data.chain.evolves_to[1].species.name
                  
      })}

      if(responseEvolution.data.chain.species.name === 'eevee'){

        setEvolutionDetails({
        
          stage1: responseEvolution.data.chain.species.name,
          stage2: responseEvolution.data.chain.evolves_to[0].species.name,
          stage2option2: responseEvolution.data.chain.evolves_to[1].species.name,
          stage2option3: responseEvolution.data.chain.evolves_to[2].species.name,
          stage2option4: responseEvolution.data.chain.evolves_to[3].species.name,
          stage2option5: responseEvolution.data.chain.evolves_to[4].species.name,
          stage2option6: responseEvolution.data.chain.evolves_to[5].species.name,
          stage2option7: responseEvolution.data.chain.evolves_to[6].species.name,
          stage2option8: responseEvolution.data.chain.evolves_to[7].species.name
                  
      })}


        if (responseEvolution.data.chain.evolves_to[0] === undefined && responseEvolution.data.chain.evolves_to.length === 0){
          setEvolutionDetails({
            noInfo: true
          }); 
          
        }else if(responseEvolution.data.chain.evolves_to[0].evolves_to[0] === undefined && responseEvolution.data.chain.evolves_to[0].species.name !== undefined && !Exceptions.includes(pokemonDetails.name)){

        setEvolutionDetails({
        
          stage1: responseEvolution.data.chain.species.name,
          stage2: responseEvolution.data.chain.evolves_to[0].species.name
    

        });
        }else if(!Exceptions.includes(pokemonDetails.name)){

          setEvolutionDetails({
          
            stage1: responseEvolution.data.chain.species.name,
            stage2: responseEvolution.data.chain.evolves_to[0].species.name,
            stage3: responseEvolution.data.chain.evolves_to[0].evolves_to[0].species.name
      
          });

          
        }
      
    } catch (error) {

      if (axios.isAxiosError(error)) {
        
        evolutionDetails.noInfo = true;
        return}

        console.error('Error fetching Pokémon data:', error);
      
    }
  
  }
  

  const getSpeciesEvolutionImgs = async () => {
    
    if(evolutionDetails.stage3 !== undefined && evolutionDetails.noInfo !== true){

    try{

      const responseStage1Img = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage1}`);
      const responseStage2Img = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage2}`);
      const responseStage3Img = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage3}`);

      setSpeciesEvolutionImgs({
        stage1Img: responseStage1Img.data.sprites.other.showdown.front_default,
        // stage1Img: responseStage1Img.data.sprites.other.dream_world.front_default,
        stage2Img: responseStage2Img.data.sprites.other.showdown.front_default,
        // stage2Img: responseStage2Img.data.sprites.other.dream_world.front_default,
        stage3Img: responseStage3Img.data.sprites.other.showdown.front_default,
        // stage3Img: responseStage3Img.data.sprites.other.dream_world.front_default
      
        
    })
      }catch (error) {
          console.error('Error fetching Pokémon data:', error);

      }
    }else if(evolutionDetails.stage3 === undefined ){

      try{

        const responseStage1Img = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage1}`);
        const responseStage2Img = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage2}`);
      setSpeciesEvolutionImgs({
        stage1Img: responseStage1Img.data.sprites.other.showdown.front_default,
        // stage1Img: responseStage1Img.data.sprites.other.dream_world.front_default,
        stage2Img: responseStage2Img.data.sprites.other.showdown.front_default,
        // stage2Img: responseStage2Img.data.sprites.other.dream_world.front_default,
    })
      }catch(error) {
        console.error('Error fetching Pokémon data:', error);
      }}else if(evolutionDetails.noInfo !== true ){
          alert('caiu nessa porra aqui');
      }
    }
  
    useEffect(() => {
      getSpeciesEvolution()
      getSpeciesEvolutionImgs()
    }, [pokemonEvolutionDetails]);
  
    const stage1pokemon = document.getElementById('stage1pokemon');
    const stage2pokemon = document.getElementById('stage2pokemon');
    const stage3pokemon = document.getElementById('stage3pokemon');
    
    
    const handleMouseEnter1 = () => {
      stage2pokemon.classList.remove('selected');
      stage3pokemon.classList.remove('selected');
    };
  
    const handleMouseEnter2 = () => {
      stage1pokemon.classList.remove('selected');
      stage3pokemon.classList.remove('selected');
    };

    const handleMouseEnter3 = () => {
      stage1pokemon.classList.remove('selected');
      stage2pokemon.classList.remove('selected');
    };
  
const handleMouseleave = () => {
     if(pokemonDetails.name === evolutionDetails.stage1 ){
      stage1pokemon.classList.add('selected');
     }else if(pokemonDetails.name === evolutionDetails.stage2){
      stage2pokemon.classList.add('selected');
     }else if(pokemonDetails.name === evolutionDetails.stage3){
      stage3pokemon.classList.add('selected');}
    }  
  
  const { theme } = useContext(ThemeContext)
  // console.log(theme.name)
  return (
    
    <div style={{color: theme.color, backgroundColor: theme.background}}>
      
      <HeaderDetails style={{color: theme.cardColor, backgroundColor: theme.detailsHeaderColor}}>
        
        <div>
          <ThemeToggleButton />
          <a href="/"> <Button>Go back</Button></a>
        </div>
        <a href="/"><img src={PokemonImage} alt="" width={'200px'} /></a>
        
      </HeaderDetails>

      <Container>
          
          <ContainerDetailsDiv>

              <Type >
                    
                    {pokemonDetails.typeslength === 2  ? <h4>Types:</h4> : <h4>Type:</h4>}

                    {pokemonDetails.types?.map((type, index) => (
                      <>
                        <img src={`../Mezastar/${type}.png`} alt={type} />
                        <p key={index}>{type}</p>
                      </>
                    ))}
                    
              </Type>
          
              <Poke>
                  
                  {pokemonDetails.namesize >= 18 ? <h3 className="largeName ">{pokemonDetails.name}</h3> : <h3>{pokemonDetails.name}</h3>}

                  {pokemonDetails.image !== undefined && pokemonDetails.image !== null && pokemonDetails.name !== 'mimikyu-busted' && pokemonDetails.name !== 'mimikyu-totem-busted' && !noImage.includes(pokemonDetails.name) ? <img src={pokemonDetails.image} alt={pokemonDetails.name} width={'200px'} height={'200px'} /> : null}

                  {pokemonDetails.image === undefined && !noImage.includes(pokemonDetails.name) ? <img src={pokemonDetails.altimage} alt={pokemonDetails.name} width={'200px'} height={'200px'} /> : null}

                  {pokemonDetails.image === null && pokemonDetails.name !== 'mimikyu-busted' && pokemonDetails.name !== 'mimikyu-totem-busted' && !noImage.includes(pokemonDetails.name) ? <img src={pokemonDetails.altimage} alt={pokemonDetails.name} width={'200px'} height={'200px'} /> : null}

                  {pokemonDetails.name === 'mimikyu-busted' ? <img src={pokemonDetails.exception} alt={pokemonDetails.name} width={'250px'} height={'250px'} /> : null}

                  {pokemonDetails.name === 'mimikyu-totem-busted' ? <img src={pokemonDetails.exception2} alt={pokemonDetails.name} width={'250px'} height={'250px'} /> : null}

                  {noImage.includes(pokemonDetails.name) ? <img className='noImage' src={NoImagePlaceHolder} alt={pokemonDetails.name} width={'250px'} /> : null}

              </Poke>

          </ContainerDetailsDiv>
          
          <TitlesDiv>
            {pokemonDetails.abilitieslength <= 1  ? <h4 className='abilities'>Ability:</h4> : <h4 className='abilities'>Abilities:</h4>}
            {pokemonEvolutionDetails === false ? <h4 onClick={() => setPokemonEvolutionDetails(true)} className='evolution'> EVOLUTION</h4> : <h4 onClick={() => setPokemonEvolutionDetails(false)} className='evolution'>Moves</h4>}
          </TitlesDiv>
          
          <UlAbilities style={{border:theme.btnBorder, backgroundColor: theme.detailsHeaderColor}}>
            {pokemonDetails.abilities?.map((ability, index) => (
              <li key={index}>
                <strong>{ability.name}</strong>: {ability.text}
              </li>
            ))}
          </UlAbilities>
          
          <TitlesDiv>
            {pokemonEvolutionDetails === false ? <h4 className='moves'>Moves:</h4> : <h4 className='moves'>EVOLUTION:</h4>}
          </TitlesDiv>

          { pokemonEvolutionDetails === true ?
          
          <EvolutionDiv>
            { evolutionDetails.noInfo !== true  ?
            <Link style={{color: theme.color}} className='links' reloadDocument to={`/details/${evolutionDetails.stage1}`}>
             <Stage1 onMouseEnter={handleMouseEnter1} onMouseLeave={handleMouseleave}>
                {/* <img className='stagelogo' src={`/STAGE1${theme.name}.svg`} alt="Logo Pokémon estágio 1" /> */}
                <div id='stage1pokemon' className={pokemonDetails.name === evolutionDetails.stage1 ? 'selected stageslogos': 'stageslogos'}>
                  {theme.name === 'light' ? <Stage1Light /> : <Stage1Dark />}
                </div>
                <h4>{evolutionDetails.stage1}</h4>
                <div className='stagesgif'>
                  {speciesEvolutionImgs.stage1Img !== null ? <img src={speciesEvolutionImgs.stage1Img} alt={evolutionDetails.stage1} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage1} width={'60px'} height={'60px'} /> }
                </div>
            </Stage1>
            </Link> 
            : <h4 className='noEvolutionInfo'>No Evolution Data</h4> }

            { evolutionDetails.noInfo !== true ? <img className='seta' src="/seta-pequena.svg" alt="seta pequena" /> : ''}

            <Link style={{color: theme.color}} className='links' reloadDocument to={`/details/${evolutionDetails.stage2}`}>
            { evolutionDetails.noInfo !== true ? <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                {/* <img className='stagelogo' src={`/STAGE2${theme.name}.svg`} alt="Logo Pokémon estágio 2" /> */}

                <div id='stage2pokemon' className={pokemonDetails.name === evolutionDetails.stage2 ? 'selected stageslogos': 'stageslogos'}>
                  {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                </div>
                <h4>{evolutionDetails.stage2}</h4>
                <div className='stagesgif'>
                  {speciesEvolutionImgs.stage2Img !== null ? <img src={speciesEvolutionImgs.stage2Img} alt={evolutionDetails.stage2} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2} width={'60px'} height={'60px'} /> }
                </div>
            </Stage2> : ''}
            </Link> 
           
            { evolutionDetails.stage3 !== undefined ? <img className='seta' src="/seta-pequena.svg" alt="seta pequena" /> : ''}
            
            <Link style={{color: theme.color}} className='links' reloadDocument to={`/details/${evolutionDetails.stage3}`}>
            { evolutionDetails.stage3 !== undefined ? <Stage3 onMouseEnter={handleMouseEnter3} onMouseLeave={handleMouseleave}>
              {/* <img className='stagelogo' src={`/STAGE3${theme.name}.svg`} alt="Logo Pokémon estágio 3" /> */}
              
              <div id='stage3pokemon' className={pokemonDetails.name === evolutionDetails.stage3 ? 'selected stageslogos': 'stageslogos'}>
                {theme.name === 'light' ? <Stage3Light /> : <Stage3Dark />}
              </div>
              <h4>{evolutionDetails.stage3}</h4>
              <div className='stagesgif'>
                {speciesEvolutionImgs.stage3Img !== null ? <img src={speciesEvolutionImgs.stage3Img} alt={evolutionDetails.stage3} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage3} width={'60px'} height={'60px'} /> }
              </div>
            </Stage3> : ''}
            </Link> 
            <Swiper />

          </EvolutionDiv> :
          
          
          <UlMovesDiv>
            
            <UlMoves style={{border:theme.btnBorder, backgroundColor: theme.detailsHeaderColor}}>
                {pokemonDetails.moveslength === 0  ? <p className='NoMoves'>No listed moves</p> : pokemonDetails.moves?.sort().map((move, index) => (
                <li key={index}>{move}</li>
              ))}
            </UlMoves>
            <UlGif>
              {pokemonDetails.imagegif !== null ? <img src={pokemonDetails.imagegif} alt={pokemonDetails.name} width={''} height={''} /> : <img className='noImage' src={NoImagePlaceHolder} alt={pokemonDetails.name} width={'120px'} height={'120px'} /> }
            </UlGif>
          </UlMovesDiv>   
          }         

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

  @media screen and (orientation: landscape) and (max-height: 400px) {     
    
    max-width: 100vw;
    padding: 5px;
    height: 18vh;              
    
    div{
      flex-direction: row;
      gap: 0;
      margin-left: 10px;
    }
    
    button{
      width: 150px;
      padding:7px; 
      margin-bottom:0;
      margin-top:0px;
      font-size: 14px;
    }
    
    img{
      width: 130px;
      margin-right: 30px;
    }

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

  @media screen and (min-width: 501px) and (max-width: 767px) and (portrait) {
      
    max-width: 100vw;
    padding: 10px;
    height: 20vh;
    justify-content: space-around;
    
    div{
      flex-direction:column;
      gap: 0;  
    }

    button{
      width: 130px;
      padding:15px; 
    }

    img{
      width: 280px;
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

    @media screen and (orientation: landscape) and (max-height: 400px) {
      height: 82vh;
      padding:0;   
    }

    @media screen and (min-width: 320px) and (max-width: 374px) {
      height: 84vh;
    }

    @media screen and (min-width: 375px) and (max-width: 500px) {
      height: 80vh;
    }
    
    @media screen and (min-width: 501px) and (max-width: 767px) and (orientation: portrait){
      height: 95vh;
    }
    
    @media screen and (min-width: 768px) and (orientation: portrait) { 
      height: 95vh;
    }
`

const ContainerDetailsDiv = styled.div`
  
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
    @media screen and (orientation: landscape) and (max-height: 400px) {
      width: 100vw;
      padding: 0;
    }
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

    @media screen and (orientation: landscape) and (max-height: 400px) {
      width: 65vw ;
      flex-direction: row;
      align-self: flex-start;
      padding: 0.5rem;
      justify-content: left;
      margin-top: 0px;

      img{
                
        width:10%;
      }

      h4{
        font-size: 1.4rem;
      }

      p{
        font-size: 1.0rem;
      }
    
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

    @media screen and (min-width: 501px) and (max-width: 767px) {
      margin-right: 5px;
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

  @media screen and (orientation: landscape) and (max-height: 400px) {
    width: 35vw;
    margin-left: 40px;

      h3{
        font-size: 18px;
        min-height: 44px;
        max-width: 200px;
      }

      .largeName{
        font-size: 16px
      }

      img{
        width: 200px;
        height: 200px;
      }

      .noImage{
        width: 200px;
        height: 200px;
        margin-left: 10px;
        border-radius: 15px;
      }

  }
  
  @media screen and (min-width: 320px) and (max-width: 374px) {

    h3{
      font-size: 24px
    }

    .largeName{
      font-size: 16px
    }

    img{
      width: 180px;
      height: 180px;
    }
    
  }

  @media screen and (min-width: 375px) and (max-width: 425px) {

    h3{
      font-size: 26px
    }

    .largeName{
      font-size: 20px
    }

    img{
      width: 200px;
      height: 200px;
    }

  }


  @media screen and (min-width: 426px) and (max-width: 500px) {

    .largeName{
      font-size: 22px
    }

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
  
  .evolution{
    margin-left: 270px;
  }
  .evolution:hover{
    color: red;
    cursor: pointer;
    scale: 1.1;
  }

  @media screen and (orientation: landscape) and (max-height: 400px) {
    margin-top: 0px;
    margin-left: -100px;
    z-index: 1;
    
    h4{
      font-size: 1.4rem;
    }
   
    .abilities{
      margin-top: -135px;
      margin-left: 5px;
    }

    .moves{
      margin-left: 360px;
      margin-top: -260px;
    } 
      
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

  @media screen and (min-width: 501px) and (max-width: 767px) and (orientation: portrait) {
    max-width: 90vw;
    margin-left: 10px;
  }
`

const UlAbilities = styled.ul`
  
  width: 600px;
  min-height: 50px;
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

    @media screen and (orientation: landscape) and (max-height: 400px) {
      width: 480px;
      height: 100px;
      margin-left: -225px;
      margin-top: -110px;
      z-index:1;
      
      li {
        font-size: 1.0rem;
      }
      
    }

    @media screen and (min-width: 320px) and (max-width: 767px) {
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
  position: relative;
  z-index: 0;

  @media screen and (min-width: 320px) and (max-width: 670px) {
    width: 90vw;
  }

  @media screen and (orientation: landscape) and (max-height: 400px) {
    margin-top: -235px;
    width: 210px;
    margin-left: 165px;
    display: flex;
    flex-direction: column;
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

    .NoMoves{
      text-align: center;
      font-size: 1rem;
      font-weight: 700;
      list-style: none;
      font-family: "Roboto", sans-serif;
      text-transform: uppercase;
    }

    @media screen and (orientation: landscape) and (max-height: 400px) {
      width: 150px;
      height: 100px ;
      display: flex;
      flex-direction: column;
      z-index:0;
      position: relative;
     
      li {
        font-size: 0.8rem;
        }

    }

    @media screen and (min-width: 320px) and (max-width: 600px) {
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

    .noImage{
      border-radius: 15px;
      margin-bottom: 3px;
    }    

    @media screen and (orientation: landscape) and (max-height: 400px) {
    width: 150px; 
    height: 120px;
    align-items: flex-end;
    position: relative;
    margin-left: -190px;
    margin-top: -98px;
      
      img{
        max-height: 120px;
      }

      .noImage{     
        width: 90px;
        height: 90px;
      }

    }

    @media screen and (min-width: 320px) and (max-width: 374px) {
  
      .noImage{
      margin-left: 5px;
      }
      
    }
`
const EvolutionDiv = styled.div`

  display: flex;
  width: 600px;
  height: 200px;
  justify-content: center;
  position: relative;
  z-index: 0;
  gap: 10px;
  
    .seta{
      width: 50px;
      margin-top: 18px;
    }

    @media screen and (min-width: 320px) and (max-width: 670px) {
      width: 90vw;
    }

    @media screen and (orientation: landscape) and (max-height: 400px) {
      margin-top: -235px;
      width: 210px;
      margin-left: 165px;
      display: flex;
      flex-direction: column;
    }

    .noEvolutionInfo{
      height: 120px;
      text-align: center;
      font-size: 1.5rem;
      font-weight: 700;
      list-style: none;
      font-family: "Roboto", sans-serif;
      text-transform: uppercase;
      justify-content: center;
      align-content: center;
      pointer-events: none;
    }

    .stageslogos{
      align-self: center;
    }

    .stagesgif{
      display: grid;
      min-width: 100px;
      min-height: 80px;  
      align-content: flex-end; 
      justify-items: center;     
    }

    .links{
      text-decoration: none;
    }

`

const Stage1 = styled.div`

  display: flex;
  flex-direction: column;
  width: 150px;
  height:  150px;
  justify-content: space-between;
  position: relative;
  z-index: 0;
  text-transform: uppercase;
    
      
    #stage1light, #stage1dark{
      height: 60px;
      // width: 80px;
    }

    h4{
      font-family: "Orbitron", sans-serif;
      align-self: center;
    }

    img{
      // width: 60px;
      // height: 60px;
      align-self: center;
      opacity: 1;
      animation-name: fadeInOpacity;
      animation-iteration-count: 1;
      animation-timing-function: ease-in;
      animation-duration: 1s;
    }  

    &:hover, .selected{
      #pokebola-stage1, #pokebola-stage1-black{
          transform-origin: 50% 50%;
          scale: 1;
          transition: 0.3s; 

      #fundo-cima-stage1, #fundo-cima-stage1-black{
          display: initial;
      }

      #botao-stage1, #botao-stage1-black{
          display: initial;
      }
      
      #botao-fundo-stage1, #botao-fundo-stage1-black{
          display: initial;
      }

      #fundo-baixo-stage1, #fundo-baixo-stage1-black{
          display: initial;
      }

      #estrela-stage1, #estrela-stage1-black{
          fill:#ffcc00;
          clip-path: circle(100%);
          transition-delay: 0.1s;
      }

      #borda-estrela{
        display: none;
      }

      #fundo-branco-estrela{
          display: initial;
      }

      #fundo-branco-stage1-black{
        display: initial;
      }
     
      #borda-stage1-black{
        fill: black;
      }
    }

`

const Stage2 = styled.div`

  display: flex;
  flex-direction: column;
  width: 150px;
  height: 150px;
  justify-content: space-between;
  position: relative;
  z-index: 0;
  text-transform: uppercase;
  
    #stage2light, #stage2dark{
      height: 60px;
    }

    h4{
      font-family: "Orbitron", sans-serif;
      align-self: center;
    }

    img{
      // width: 60px;
      // height: 60px;
      align-self: center;
      opacity: 1;
      animation-name: fadeInOpacity;
      animation-iteration-count: 1;
      animation-timing-function: ease-in;
      animation-duration: 1s;
    }

    &:hover, .selected{
      #pokebola-stage2, #pokebola-stage2-black{
          transform-origin: 50% 50%;
          scale: 1;
          transition: 0.3s; 

      #fundo-cima-stage2, #fundo-cima-stage2-black{
          display: initial;
      }

      #botao-stage2, #botao-stage2-black{
          display: initial;
      }
      
      #botao-fundo-stage2, #botao-fundo-stage2-black{
          display: initial;
      }

      #fundo-baixo-stage2, #fundo-baixo-stage2-black{
          display: initial;
      }

      #estrelas-stage2{
          #stage2-direita, #stage2-esquerda{
            fill:#ffcc00;
            clip-path: circle(100%);
            transition-delay: 0.1s;
            }
            
            #borda-direita{
                display: none;
            }

            #borda-esquerda{
                display: none;
            }
      }
      
      #estrelas-stage2-black{
          #direita, #esquerda{
            fill:#ffcc00;
            clip-path: circle(100%);
            transition-delay: 0.1s;
            }
            
            #borda-direita{
                display: none;
            }

            #borda-esquerda{
                display: none;
            }
      }

      #fundo-branco-stage2-black{
        display: initial;
      }
     
      #borda-stage2-black{
        fill: black;
      }
    }

`

const Stage3 = styled.div`

  display: flex;
  flex-direction: column;
  width: 150px;
  height: 150px;
  justify-content: space-between;
  position: relative;
  z-index: 0;
  text-transform: uppercase;
   
    #stage3light, #stage3dark{
      height: 60px;
    }

    h4{
      font-family: "Orbitron", sans-serif;
      align-self: center;
    }

    img{
      // width: 60px;
      // height: 60px;
      align-self: center;
      opacity: 1;
      animation-name: fadeInOpacity;
      animation-iteration-count: 1;
      animation-timing-function: ease-in;
      animation-duration: 1s;
    }

    &:hover, .selected{
      #pokebola-stage3, #pokebola-stage3-black{
          transform-origin: 50% 50%;
          scale: 1;
          transition: 0.3s; 

      #fundo-cima-stage3, #fundo-cima-stage3-black{
          display: initial;
      }

      #botao-stage3, #botao-stage3-black{
          display: initial;
      }
      
      #botao-fundo-stage3, #botao-fundo-stage3-black{
          display: initial;
      }

      #fundo-baixo-stage3, #fundo-baixo-stage3-black{
          display: initial;
      }

      #estrelas-stage3, #estrelas-stage3-black{
          fill:#ffcc00;
          clip-path: circle(100%);
          transition-delay: 0.1s;
      }

      #fundo-branco-stage3-black{
        display: initial;
      }
     
      #borda-stage3-black{
        fill: black;
      }
    }

`