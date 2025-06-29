import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../Context/theme';
import { Button } from '../Buttons/Button'
import { ThemeToggleButton } from '../Buttons/Theme-toggle';
import { Link } from 'react-router-dom';
import PokemonImage from '/images/pokemon.svg'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NoImagePlaceHolder from '/images/No-Pokemon-Image-Placeholder.png'
import '../../css/styles.css';
import {Stage1Light, Stage2Light, Stage3Light, Stage1Dark, Stage2Dark, Stage3Dark}  from '../Icons/StagesLogos';
import { MegaLight, MegaDark, MegaLightSelected, MegaDarkSelected } from '../Icons/Mega';
import { Controller } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { register } from 'swiper/element/bundle';
import {DelayedLink} from '../Buttons/DelayedLink';

register();


export function Stage2Details() {

  const [pokemonDetails, setPokemonDetails] = useState({});
  const { id } = useParams();

  const noImage = ['koraidon-limited-build', 'koraidon-sprinting-build', 'koraidon-swimming-build', 'koraidon-gliding-build', 'miraidon-low-power-mode', 'miraidon-drive-mode', 'miraidon-aquatic-mode', 'miraidon-glide-mode']

  const Exceptions = ['slowpoke', 'slowbro', 'slowking', 'nincada', 'ninjask', 'shedinja', 'clamperl', 'huntail', 'gorebyss', 'snorunt', 'glalie', 'froslass', 'tyrogue', 'hitmonlee', 'hitmonchan', 'hitmontop', 'burmy', 'mothim', 'wormadam', 'poliwag', 'poliwhirl', 'poliwrath', 'politoed', 'oddish', 'gloom', 'vileplume', 'bellossom', 'ralts', 'kirlia', 'gardevoir', 'gallade', 'wurmple', 'silcoon', 'beautifly', 'cascoon', 'dustox', 'eevee', 'vaporeon', 'jolteon', 'flareon', 'espeon', 'umbreon', 'leafeon', 'glaceon', 'sylveon']

  const ExceptionsWurmple = [ 'wurmple', 'silcoon', 'beautifly', 'cascoon', 'dustox' ]
  const ExceptionsBurmy = [ 'burmy', 'mothim', 'wormadam' ]
  const ExceptionsTyrogue = [ 'tyrogue', 'hitmonlee', 'hitmonchan', 'hitmontop' ]
  const ExceptionsPoliwag = [ 'poliwag', 'poliwhirl', 'poliwrath', 'politoed' ]
  const ExceptionsOddish = [ 'oddish', 'gloom', 'vileplume', 'bellossom' ]
  const ExceptionsRalts = [ 'ralts', 'kirlia', 'gardevoir', 'gallade' ]
  const ExceptionsSlowpoke = [ 'slowpoke', 'slowbro', 'slowking' ]
  const ExceptionsNincada = [ 'nincada', 'ninjask', 'shedinja' ]
  const ExceptionsClamperl = [ 'clamperl', 'huntail', 'gorebyss' ]
  const ExceptionsSnorunt = [ 'snorunt', 'glalie', 'froslass' ]
  const ExceptionsEevee = [ 'eevee', 'vaporeon', 'jolteon', 'flareon', 'espeon', 'umbreon', 'leafeon', 'glaceon', 'sylveon']

  const Mega = [ 'abomasnow', 'absol', 'aerodactyl', 'aggron', 'alakazam', 'altaria', 'ampharos', 'audino', 'banette', 'beedrill', 'blastoise', 'blaziken', 'camerupt', 'charizard', 'diancie', 'gallade', 'garchomp', 'gardevoir', 'gengar', 'glalie', 'gyarados', 'heracross', 'houndoom', 'kangaskhan', 'latias', 'latios', 'lopunny', 'lucario', 'manectric', 'mawile', 'medicham', 'metagross', 'mewtwo', 'pidgeot', 'pinsir', 'rayquaza', 'sableye', 'salamence', 'sceptile', 'scizor', 'sharpedo', 'slowbro', 'steelix', 'swampert', 'tyranitar', 'venusaur' ]

  let MegaFull = ['abomasnow-mega', 'absol-mega', 'aerodactyl-mega', 'aggron-mega', 'alakazam-mega', 'altaria-mega', 'ampharos-mega', 'audino-mega', 'banette-mega', 'beedrill-mega', 'blastoise-mega', 'blaziken-mega', 'camerupt-mega', 'charizard-mega', 'diancie-mega', 'gallade-mega', 'garchomp-mega', 'gardevoir-mega', 'gengar-mega', 'glalie-mega', 'gyarados-mega', 'heracross-mega', 'houndoom-mega', 'kangaskhan-mega', 'latias-mega', 'latios-mega', 'lopunny-mega', 'lucario-mega', 'manectric-mega', 'mawile-mega', 'medicham-mega', 'metagross-mega', 'mewtwo-mega', 'pidgeot-mega', 'pinsir-mega', 'rayquaza-mega', 'sableye-mega', 'salamence-mega', 'sceptile-mega', 'scizor-mega', 'sharpedo-mega', 'slowbro-mega', 'steelix-mega', 'swampert-mega', 'tyranitar-mega', 'venusaur-mega']

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
  const [activateEvolution, setActivateEvolution ] = useState(false);
  const [evolutionDetails, setEvolutionDetails] = useState([]);
  const [speciesEvolutionImgs, setSpeciesEvolutionImgs] = useState([]);
  

  const getSpeciesEvolution = async () => {

    try{
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
      const chainId = response.data.evolution_chain.url.replace('https://pokeapi.co/api/v2/evolution-chain/','');
      const responseEvolution = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${chainId}`);    

      if(pokemonDetails.name === undefined){
        getPokemons();
      }
      
        if(ExceptionsWurmple.includes(responseEvolution.data.chain.species.name)){
        
        setEvolutionDetails({
          
          stage1: responseEvolution.data.chain.species.name,
          stage2: [ responseEvolution.data.chain.evolves_to[0].species.name, responseEvolution.data.chain.evolves_to[1].species.name ],
          stage3: [ responseEvolution.data.chain.evolves_to[0].evolves_to[0].species.name, responseEvolution.data.chain.evolves_to[1].evolves_to[0].species.name ]
            
        })

        try{
    
            const responseStage1Img = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage1}`);
            const responseStage2Img = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage2[0]}`);
            const responseStage2Option2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage2[1]}`);
            const responseStage3Img = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage3[0]}`);
            const responseStage3Option2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage3[1]}`);           
      
            setSpeciesEvolutionImgs({
              stage1Img: responseStage1Img.data.sprites.other.showdown.front_default,
              stage2Img: [ responseStage2Img.data.sprites.other.showdown.front_default, responseStage2Option2.data.sprites.other.showdown.front_default ],
              stage3Img: [ responseStage3Img.data.sprites.other.showdown.front_default, responseStage3Option2.data.sprites.other.showdown.front_default ]              
          })
            }catch (error) {
                console.error('Error fetching Pokémon data:', error);      
            }
    
        }else          
      
        if(ExceptionsBurmy.includes(responseEvolution.data.chain.species.name)){
          setEvolutionDetails({
          
            stage1: responseEvolution.data.chain.species.name,
            stage2: [ responseEvolution.data.chain.evolves_to[0].species.name, responseEvolution.data.chain.evolves_to[1].species.name]
        
          })
      
        try{
    
          const responseStage1Img = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage1}`);
          const responseStage2Option2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage2[1]}`);
    
          setSpeciesEvolutionImgs({
            stage1Img: responseStage1Img.data.sprites.other.showdown.front_default,
            stage2Img: [ undefined , responseStage2Option2.data.sprites.other.showdown.front_default ]
                    
          })
        }catch (error) {
            console.error('Error fetching Pokémon data:', error);
  
        }
        }else      
      
        if(ExceptionsTyrogue.includes(responseEvolution.data.chain.species.name)){
          setEvolutionDetails({
          
            stage1: responseEvolution.data.chain.species.name,
            stage2: [ responseEvolution.data.chain.evolves_to[0].species.name, responseEvolution.data.chain.evolves_to[1].species.name, responseEvolution.data.chain.evolves_to[2].species.name ]
          })      
    
        try{
      
          const responseStage1Img = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage1}`);
          const responseStage2Img = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage2[0]}`);
          const responseStage2Option2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage2[1]}`);
          const responseStage2Option3 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage2[2]}`);
          
          setSpeciesEvolutionImgs({
            stage1Img: responseStage1Img.data.sprites.other.showdown.front_default,
            stage2Img: [ responseStage2Img.data.sprites.other.showdown.front_default , responseStage2Option2.data.sprites.other.showdown.front_default, responseStage2Option3.data.sprites.other.showdown.front_default ]            
          })
        }catch (error) {
            console.error('Error fetching Pokémon data:', error);
  
        }
        }else
      
        if(ExceptionsPoliwag.includes(responseEvolution.data.chain.species.name) || ExceptionsOddish.includes(responseEvolution.data.chain.species.name) || ExceptionsRalts.includes(responseEvolution.data.chain.species.name) ) {
          setEvolutionDetails({
          
            stage1: responseEvolution.data.chain.species.name,
            stage2: responseEvolution.data.chain.evolves_to[0].species.name,
            stage3: [ responseEvolution.data.chain.evolves_to[0].evolves_to[0].species.name, responseEvolution.data.chain.evolves_to[0].evolves_to[1].species.name ]
          })
    
        try{
      
          const responseStage1Img = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage1}`);
          const responseStage2Img = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage2}`);
          const responseStage3Img = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage3[0]}`);
          const responseStage3Option2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage3[1]}`);
              
          setSpeciesEvolutionImgs({
            stage1Img: responseStage1Img.data.sprites.other.showdown.front_default,
            stage2Img: responseStage2Img.data.sprites.other.showdown.front_default,
            stage3Img: [ responseStage3Img.data.sprites.other.showdown.front_default, responseStage3Option2.data.sprites.other.showdown.front_default ]
            
          })
        }catch (error) {
            console.error('Error fetching Pokémon data:', error);
  
        }    
        }else
      
        if(ExceptionsSlowpoke.includes(responseEvolution.data.chain.species.name) || ExceptionsNincada.includes(responseEvolution.data.chain.species.name) || ExceptionsClamperl.includes(responseEvolution.data.chain.species.name) || ExceptionsSnorunt.includes(responseEvolution.data.chain.species.name)){
          setEvolutionDetails({
          
            stage1: responseEvolution.data.chain.species.name,
            stage2: [ responseEvolution.data.chain.evolves_to[0].species.name, responseEvolution.data.chain.evolves_to[1].species.name ]
                    
          })
    
        try{
      
          const responseStage1Img = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage1}`);
          const responseStage2Img = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage2[0]}`);
          const responseStage2Option2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage2[1]}`);               
    
          setSpeciesEvolutionImgs({
            stage1Img: responseStage1Img.data.sprites.other.showdown.front_default,
            stage2Img: [ responseStage2Img.data.sprites.other.showdown.front_default , responseStage2Option2.data.sprites.other.showdown.front_default ]
                    
          })
        }catch (error) {
            console.error('Error fetching Pokémon data:', error);
  
        }
        }else
          
        if(ExceptionsEevee.includes(responseEvolution.data.chain.species.name) === true){
          setEvolutionDetails({
          
            stage1: 'eevee',
            stage2: ['vaporeon', 'jolteon', 'flareon', 'espeon', 'umbreon', 'leafeon', 'glaceon', 'sylveon']
                  
          })
      
        try{
          
          const responseStage1Img = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage1}`);
          const responseStage2Img = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage2[0]}`);
          const responseStage2Option2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage2[1]}`);
          const responseStage2Option3 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage2[2]}`);
          const responseStage2Option4 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage2[3]}`);
          const responseStage2Option5 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage2[4]}`);
          const responseStage2Option6 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage2[5]}`);
          const responseStage2Option7 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage2[6]}`);
          const responseStage2Option8 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage2[7]}`);
    
          setSpeciesEvolutionImgs({
            stage1Img: responseStage1Img.data.sprites.other.showdown.front_default,
            stage2Img: [ responseStage2Img.data.sprites.other.showdown.front_default, responseStage2Option2.data.sprites.other.showdown.front_default, responseStage2Option3.data.sprites.other.showdown.front_default, responseStage2Option4.data.sprites.other.showdown.front_default, responseStage2Option5.data.sprites.other.showdown.front_default, responseStage2Option6.data.sprites.other.showdown.front_default, responseStage2Option7.data.sprites.other.showdown.front_default, responseStage2Option8.data.sprites.other.showdown.front_default ]                
          })
        }catch (error) {
            console.error('Error fetching Pokémon data:', error);
  
        }
    
        }else

        // REGRAS FORA DAS EXCEÇÕES
        if (responseEvolution.data.chain.evolves_to[0] === undefined && responseEvolution.data.chain.evolves_to.length === 0 && !Exceptions.includes(pokemonDetails.name)){
          setEvolutionDetails({
            noInfo: true
          });
          
        }else if(responseEvolution.data.chain.evolves_to[0].evolves_to[0] === undefined && responseEvolution.data.chain.evolves_to[0].species.name !== undefined && !Exceptions.includes(pokemonDetails.name)){

          setEvolutionDetails({
          
            stage1: responseEvolution.data.chain.species.name,
            stage2: responseEvolution.data.chain.evolves_to[0].species.name

          })
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
    
    if(pokemonDetails.name === undefined){
      getPokemons();
      getSpeciesEvolution();
    }else

    if(evolutionDetails.stage3 !== undefined && evolutionDetails.noInfo !== true && !Exceptions.includes(pokemonDetails.name)){

      try{

        const responseStage1Img = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage1}`);
        const responseStage2Img = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage2}`);
        const responseStage3Img = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage3}`);

        setSpeciesEvolutionImgs({
          stage1Img: responseStage1Img.data.sprites.other.showdown.front_default,
          stage2Img: responseStage2Img.data.sprites.other.showdown.front_default,
          stage3Img: responseStage3Img.data.sprites.other.showdown.front_default
                
        })
      }catch (error) {
          console.error('Error fetching Pokémon data:', error);
          
      } 
    }else if(evolutionDetails.stage3 === undefined && !Exceptions.includes(pokemonDetails.name)){
      
      try{

        const responseStage1Img = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage1}`);
        const responseStage2Img = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionDetails.stage2}`);
        setSpeciesEvolutionImgs({
          stage1Img: responseStage1Img.data.sprites.other.showdown.front_default,
          stage2Img: responseStage2Img.data.sprites.other.showdown.front_default

        })
      }catch(error) {
        console.error('Error fetching Pokémon data:', error);
      }}else if(evolutionDetails === undefined ){
          setActivateEvolution(false);
          setActivateEvolution(true);
      }
  }
  
  useEffect(() => {
    getSpeciesEvolution()
    getSpeciesEvolutionImgs()  
  }, [activateEvolution, pokemonDetails, pokemonEvolutionDetails]);

  
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);

  const stage1pokemon = document.getElementById('stage1pokemon');
  const stage2pokemon = document.getElementById('stage2pokemon');
  const stage2pokemon2 = document.getElementById('stage2pokemon2');
  const stage3pokemon = document.getElementById('stage3pokemon');
  const stage3pokemon2 = document.getElementById('stage3pokemon2');
  
  
  const handleMouseEnter1 = () => {
    stage2pokemon.classList.remove('selected');
    if(pokemonDetails.name === evolutionDetails.stage2[1]){
      stage2pokemon2.classList.remove('selected');
    } 
    stage3pokemon.classList.remove('selected');
    if(pokemonDetails.name === evolutionDetails.stage3[1]){
      stage3pokemon2.classList.remove('selected');
    }
  };
  
  const handleMouseEnter2 = () => {
    stage1pokemon.classList.remove('selected');
    stage3pokemon.classList.remove('selected');
    if(pokemonDetails.name === evolutionDetails.stage3[1]){
      stage3pokemon2.classList.remove('selected');
    }
  };

  const handleMouseEnter3 = () => {
    stage1pokemon.classList.remove('selected');
    stage2pokemon.classList.remove('selected');
    if(pokemonDetails.name === evolutionDetails.stage2[1]){
      stage2pokemon2.classList.remove('selected');
    }      
  };
  
  const handleMouseleave = () => {
    if(pokemonDetails.name === evolutionDetails.stage1 ){
    stage1pokemon.classList.add('selected');
    }

    if(pokemonDetails.name === evolutionDetails.stage2){
    stage2pokemon.classList.add('selected');
    }

    if(pokemonDetails.name === evolutionDetails.stage2[0]){
    stage2pokemon.classList.add('selected');
    }

    if(pokemonDetails.name === evolutionDetails.stage2[1]){
    stage2pokemon2.classList.add('selected');
    }

    if(pokemonDetails.name === evolutionDetails.stage3){
    stage3pokemon.classList.add('selected');
    }

    if(pokemonDetails.name === evolutionDetails.stage3[0]){
    stage3pokemon.classList.add('selected');
    }    

    if(pokemonDetails.name === evolutionDetails.stage3[1]){
    stage3pokemon2.classList.add('selected');
    }
  }
    
  const addname = /-mega/

  const { theme } = useContext(ThemeContext)

  const megaselected = document.getElementById('mega-com-estrelas');
  const megablackselected = document.getElementById('mega-com-estrelas-black');    
  const [megaExceptions, setMegaExceptions] = useState(false);

  const [ istoggled, setToggle] = useState(false)

  const handleToggle = () => {

    setToggle(!istoggled);
  };

  const handleMegaExceptionsClick = () => {  
    handleToggle();
    setMegaExceptions(istoggled);
    setPokemonEvolutionDetails(istoggled);

    if(theme.name === 'light' && istoggled === true){
      megaselected.classList.add('megaactive');
    }

    if(theme.name === 'dark' && istoggled === true){
      megablackselected.classList.add('megablackactive');
    }
    
    if(theme.name === 'light' && istoggled === false){
      megaselected.classList.remove('megaactive');
    }

    if(theme.name === 'dark' && istoggled === false){
      megablackselected.classList.remove('megablackactive');
    }
    
  } 

  const handleMegaClick = () => {  
    handleToggle();
    if(theme.name === 'light'&& istoggled === false) {
      megaselected.classList.add('megaactive');
    }

    if(theme.name === 'dark'&& istoggled === false){
      megablackselected.classList.add('megablackactive');
    }

  }

  return (
    
    <div style={{color: theme.color, backgroundColor: theme.background}}>
      
      <HeaderDetails style={{color: theme.cardColor, backgroundColor: theme.detailsHeaderColor}}>
        
        <div>
          <ThemeToggleButton />
          <a href="/Pokemon/"> <Button>Go back</Button></a>
        </div>
        <a href="/Pokemon/"><img src={PokemonImage} alt="" width={'200px'} /></a>
        
      </HeaderDetails>

      <Container>
          
          <ContainerDetailsDiv>

              <Type >
                    
                    {pokemonDetails.typeslength === 2  ? <h4>Types:</h4> : <h4>Type:</h4>}

                    {pokemonDetails.types?.map((type, index) => (
                      <>
                        <img key={type} src={`../Mezastar/${type}.png`} alt={type} />
                        <p key={index}>{type}</p>
                      </>
                    ))}
                    
              </Type>
          
              <Poke>
                  
                  {pokemonDetails.namesize < 18 && addname.test(pokemonDetails.name) === false ? <h3>{pokemonDetails.name}</h3> : ''}

                  {pokemonDetails.namesize >= 18 ? <h3 className="largeName ">{pokemonDetails.name}</h3> : ''}

                  {addname.test(pokemonDetails.name) && pokemonDetails.namesize > 9 ? <h3 className="largeName ">{pokemonDetails.name}</h3> : ''}


                  {pokemonDetails.image !== undefined && pokemonDetails.image !== null && pokemonDetails.name !== 'mimikyu-busted' && pokemonDetails.name !== 'mimikyu-totem-busted' && !noImage.includes(pokemonDetails.name) ? <img src={pokemonDetails.image} alt={pokemonDetails.name} width={'200px'} height={'200px'} /> : null}

                  {pokemonDetails.image === undefined && !noImage.includes(pokemonDetails.name) ? <img src={pokemonDetails.altimage} alt={pokemonDetails.name} width={'200px'} height={'200px'} /> : null}

                  {pokemonDetails.image === null && pokemonDetails.name !== 'mimikyu-busted' && pokemonDetails.name !== 'mimikyu-totem-busted' && !noImage.includes(pokemonDetails.name) ? <img src={pokemonDetails.altimage} alt={pokemonDetails.name} width={'200px'} height={'200px'} /> : null}

                  {pokemonDetails.name === 'mimikyu-busted' ? <img src={pokemonDetails.exception} alt={pokemonDetails.name} width={'250px'} height={'250px'} /> : null}

                  {pokemonDetails.name === 'mimikyu-totem-busted' ? <img src={pokemonDetails.exception2} alt={pokemonDetails.name} width={'250px'} height={'250px'} /> : null}

                  {noImage.includes(pokemonDetails.name) ? <img className='noImage' src={NoImagePlaceHolder} alt={pokemonDetails.name} width={'250px'} /> : null}

              </Poke>

          </ContainerDetailsDiv>
          
          <TitlesDiv>
            {pokemonDetails.abilitieslength <= 1  ? <h4 className='ability'>Ability:</h4> : <h4 className='abilities'>Abilities:</h4>}

            {Mega.includes(pokemonDetails.name) || pokemonDetails.name ==='charizard' || pokemonDetails.name ==='mewtwo' ? <div className='emptydiv'></div> : <div className={MegaFull.includes(pokemonDetails.name) ? 'emptydiv box2' : 'emptydiv box'}></div>}
            
            {Mega.includes(pokemonDetails.name) && pokemonDetails.name !=='charizard' && pokemonDetails.name !=='mewtwo' ? <div onClick={() => {handleMegaClick();}} className='mega'> {theme.name === 'light' ? <DelayedLink to={`/megadetails/${pokemonDetails.name}-mega`}><MegaLight /></DelayedLink> : <DelayedLink to={`/megadetails/${pokemonDetails.name}-mega`}><MegaDark /></DelayedLink>} </div> : '' }
            
            {MegaFull.includes(pokemonDetails.name) && theme.name === 'light' ? <div className='mega1'> <MegaLightSelected /> </div> : ''}
            
            {MegaFull.includes(pokemonDetails.name) && theme.name === 'dark' ? <div className='mega1'> <MegaDarkSelected /> </div> : ''}
            
            {pokemonDetails.name ==='charizard' || pokemonDetails.name ==='mewtwo' ? <div onClick={() => {handleMegaExceptionsClick();}} className='mega'> {theme.name === 'light' ? <MegaLight /> : <MegaDark />} </div> : ''}

            {pokemonDetails.name ==='charizard-mega-y' || pokemonDetails.name ==='charizard-mega-x' ? <div className='mega2'> {theme.name === 'light' ? <MegaLightSelected /> : <MegaDarkSelected />} </div> : ''}

            {pokemonDetails.name ==='mewtwo-mega-y' || pokemonDetails.name ==='mewtwo-mega-x' ? <div className='mega2'> {theme.name === 'light' ? <MegaLightSelected /> : <MegaDarkSelected />} </div> : ''}

            {pokemonEvolutionDetails === false ? <h4 onClick={() => {setPokemonEvolutionDetails(true); setActivateEvolution(true); getSpeciesEvolution()}} className='evolution-moves'> EVOLUTION</h4> : <h4 onClick={() => {handleMegaExceptionsClick(); setPokemonEvolutionDetails(false); {setActivateEvolution(false); setMegaExceptions(false)}}} className='moves-evolution'>Moves</h4>}
          </TitlesDiv>
          
          <UlAbilities style={{border:theme.btnBorder, backgroundColor: theme.detailsHeaderColor}}>
            {pokemonDetails.abilities?.map((ability, index) => (
              <li key={index}>
                <strong>{ability.name}</strong>: {ability.text}
              </li>
            ))}
          </UlAbilities>
          
          <TitlesDiv>
            {pokemonEvolutionDetails === false ? <h4 className='moves box'>Moves:</h4> : <h4 className='moves'>EVOLUTION:</h4>}
          </TitlesDiv>

          { pokemonEvolutionDetails === true ?
          
          <EvolutionDiv>
            
            {/* STAGE 1 */}
            { evolutionDetails.noInfo !== true ?
            <Link style={{color: theme.color}} className='links' to={`/stage1details/${evolutionDetails.stage1}`}>
             <Stage1 onMouseEnter={handleMouseEnter1} onMouseLeave={handleMouseleave}>
                
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

            {/* SETA 1 */}
            { evolutionDetails.noInfo !== true ? <img className='seta' src="../images/seta-pequena.svg" alt="seta pequena" /> : ''}
            
            {/* STAGE 2 PADRÃO */}
            { evolutionDetails.noInfo !== true && !Exceptions.includes(pokemonDetails.name) ? 
            <div style={{color: theme.color}} className='links'>
              <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                

                <div id='stage2pokemon' className={pokemonDetails.name === evolutionDetails.stage2 ? 'selected stageslogos': 'stageslogos'}>
                  {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                </div>
                <h4>{evolutionDetails.stage2}</h4>
                <div className='stagesgif'>
                  {speciesEvolutionImgs.stage2Img !== null ? <img src={speciesEvolutionImgs.stage2Img} alt={evolutionDetails.stage2} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2} width={'60px'} height={'60px'} /> }
                </div>
              </Stage2>
            </div>: ''}

            {/* STAGE 2 EXCEÇÕES */} 
            { evolutionDetails.noInfo !== true && ExceptionsWurmple.includes(pokemonDetails.name) && pokemonDetails.name === 'silcoon' || pokemonDetails.name === 'beautifly' ? 
            <div style={{color: theme.color}} className='links'>
              <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                

                <div id='stage2pokemon2' className={pokemonDetails.name === evolutionDetails.stage2[0] ? 'selected stageslogos': 'stageslogos'}>
                  {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                </div>
                <h4>{evolutionDetails.stage2[0]}</h4>
                <div className='stagesgif'>
                  {speciesEvolutionImgs.stage2Img[0] !== null ? <img src={speciesEvolutionImgs.stage2Img[0]} alt={evolutionDetails.stage2[0]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2} width={'60px'} height={'60px'} /> }
                </div>
              </Stage2>
            </div>: ''}

            { evolutionDetails.noInfo !== true && ExceptionsWurmple.includes(pokemonDetails.name) && pokemonDetails.name === 'cascoon' || pokemonDetails.name === 'dustox'  ? 
            <div style={{color: theme.color}} className='links'>
              <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                

                <div id='stage2pokemon2' className={pokemonDetails.name === evolutionDetails.stage2[1] ? 'selected stageslogos': 'stageslogos'}>
                  {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                </div>
                <h4>{evolutionDetails.stage2[1]}</h4>
                <div className='stagesgif'>
                  {speciesEvolutionImgs.stage2Img[1] !== null ? <img src={speciesEvolutionImgs.stage2Img[1]} alt={evolutionDetails.stage2[1]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2} width={'60px'} height={'60px'} /> }
                </div>
              </Stage2>
            </div>: ''}           
            
            { evolutionDetails.noInfo !== true && ExceptionsOddish.includes(pokemonDetails.name) || ExceptionsPoliwag.includes(pokemonDetails.name) || ExceptionsRalts.includes(pokemonDetails.name) ? 
            <div style={{color: theme.color}} className='links'>
              <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                

                <div id='stage2pokemon' className={pokemonDetails.name === evolutionDetails.stage2 ? 'selected stageslogos': 'stageslogos'}>
                  {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                </div>
                <h4>{evolutionDetails.stage2}</h4>
                <div className='stagesgif'>
                  {speciesEvolutionImgs.stage2Img !== null ? <img src={speciesEvolutionImgs.stage2Img} alt={evolutionDetails.stage2} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2} width={'60px'} height={'60px'} /> }
                </div>
              </Stage2>
            </div>: ''}

{/* REVER DAQUI !!!!!!! */}

            {/* SWIPER EEVEE */}
            { evolutionDetails.noInfo !== true && ExceptionsEevee.includes(pokemonDetails.name) ?
            <Swiper
            initialSlide={`${evolutionDetails.stage2.indexOf(`${pokemonDetails.name}`)}`}
            // effect="flip"
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            // pagination={{clickable: true}}
            navigation
            >
              <SwiperSlide  >
                
                {pokemonDetails.name !== evolutionDetails.stage2[0] ?
                <Link style={{color: theme.color}} className='links' to={`/details/${evolutionDetails.stage2[0]}`}>
                    <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                        
                        <div id='stage2pokemon' className={pokemonDetails.name === evolutionDetails.stage2[0] ? 'selected stageslogos': 'stageslogos'}>
                          {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                        </div>
                        <h4>{evolutionDetails.stage2[0]}</h4>
                        <div className='stagesgif'>
                          {speciesEvolutionImgs.stage1Img !== null ? <img src={speciesEvolutionImgs.stage2Img[0]} alt={evolutionDetails.stage2[0]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2} width={'60px'} height={'60px'} /> }
                        </div>
                        <h4 className='qtd' >1-8</h4>
                    </Stage2>
                    
                </Link> : 
                <div style={{color: theme.color}} className='links'>
                    <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                        
                        <div id='stage2pokemon' className={pokemonDetails.name === evolutionDetails.stage2[0] ? 'selected stageslogos': 'stageslogos'}>
                          {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                        </div>
                        <h4>{evolutionDetails.stage2[0]}</h4>
                        <div className='stagesgif'>
                          {speciesEvolutionImgs.stage1Img !== null ? <img src={speciesEvolutionImgs.stage2Img[0]} alt={evolutionDetails.stage2[0]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2} width={'60px'} height={'60px'} /> }
                        </div>
                        <h4 className='qtd' >1-8</h4>
                    </Stage2>
                    
                </div> }
                
              </SwiperSlide>

              <SwiperSlide >

                {pokemonDetails.name !== evolutionDetails.stage2[1] ?
                <Link style={{color: theme.color}} className='links' to={`/details/${evolutionDetails.stage2[1]}`}>
                  <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                      

                      <div id='stage2pokemon1' className={pokemonDetails.name === evolutionDetails.stage2[1] ? 'selected stageslogos': 'stageslogos'}>
                        {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                      </div>
                      
                      <h4>{evolutionDetails.stage2[1]}</h4>
                      <div className='stagesgif'>
                        {speciesEvolutionImgs.stage2Img !== null ? <img src={speciesEvolutionImgs.stage2Img[1]} alt={evolutionDetails.stage2[1]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2} width={'60px'} height={'60px'} /> }
                      </div>
                      <h4 className='qtd' >2-8</h4>
                  </Stage2>
                </Link> :
                <div style={{color: theme.color}} className='links'>
                  <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                      

                      <div id='stage2pokemon1' className={pokemonDetails.name === evolutionDetails.stage2[1] ? 'selected stageslogos': 'stageslogos'}>
                        {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                      </div>
                      
                      <h4>{evolutionDetails.stage2[1]}</h4>
                      <div className='stagesgif'>
                        {speciesEvolutionImgs.stage2Img !== null ? <img src={speciesEvolutionImgs.stage2Img[1]} alt={evolutionDetails.stage2[1]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2} width={'60px'} height={'60px'} /> }
                      </div>
                      <h4 className='qtd' >2-8</h4>
                  </Stage2>
                </div> }

              </SwiperSlide>

              <SwiperSlide >

                {pokemonDetails.name !== evolutionDetails.stage2[2] ?
                <Link style={{color: theme.color}} className='links' to={`/details/${evolutionDetails.stage2[2]}`}>
                  { evolutionDetails.noInfo !== true ? <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                      

                      <div id='stage2pokemon2' className={pokemonDetails.name === evolutionDetails.stage2[2] ? 'selected stageslogos': 'stageslogos'}>
                        {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                      </div>
                      
                      <h4>{evolutionDetails.stage2[2]}</h4>
                      <div className='stagesgif'>
                        {speciesEvolutionImgs.stage2Img !== null ? <img src={speciesEvolutionImgs.stage2Img[2]} alt={evolutionDetails.stage2[2]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2} width={'60px'} height={'60px'} /> }
                      </div>
                      <h4 className='qtd' >3-8</h4>
                  </Stage2> : ''}
                </Link> :
                <div style={{color: theme.color}} className='links' >
                  { evolutionDetails.noInfo !== true ? <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                      

                      <div id='stage2pokemon2' className={pokemonDetails.name === evolutionDetails.stage2[2] ? 'selected stageslogos': 'stageslogos'}>
                        {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                      </div>
                      
                      <h4>{evolutionDetails.stage2[2]}</h4>
                      <div className='stagesgif'>
                        {speciesEvolutionImgs.stage2Img !== null ? <img src={speciesEvolutionImgs.stage2Img[2]} alt={evolutionDetails.stage2[2]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2} width={'60px'} height={'60px'} /> }
                      </div>
                      <h4 className='qtd' >3-8</h4>
                  </Stage2> : ''}
                </div> }

              </SwiperSlide>

              <SwiperSlide >
                
                {pokemonDetails.name !== evolutionDetails.stage2[3] ?
                <Link style={{color: theme.color}} className='links' to={`/details/${evolutionDetails.stage2[3]}`}>
                    <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                
                        <div id='stage2pokemon3' className={pokemonDetails.name === evolutionDetails.stage2[3] ? 'selected stageslogos': 'stageslogos'}>
                          {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                        </div>
                        <h4>{evolutionDetails.stage2[3]}</h4>
                        <div className='stagesgif'>
                          {speciesEvolutionImgs.stage1Img !== null ? <img src={speciesEvolutionImgs.stage2Img[3]} alt={evolutionDetails.stage2[3]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage1} width={'60px'} height={'60px'} /> }
                        </div>
                        <h4 className='qtd' >4-8</h4>
                    </Stage2>
                </Link> :
                <div style={{color: theme.color}} className='links'>
                    <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                
                        <div id='stage2pokemon3' className={pokemonDetails.name === evolutionDetails.stage2[3] ? 'selected stageslogos': 'stageslogos'}>
                          {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                        </div>
                        <h4>{evolutionDetails.stage2[3]}</h4>
                        <div className='stagesgif'>
                          {speciesEvolutionImgs.stage1Img !== null ? <img src={speciesEvolutionImgs.stage2Img[3]} alt={evolutionDetails.stage2[3]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage1} width={'60px'} height={'60px'} /> }
                        </div>
                        <h4 className='qtd' >4-8</h4>
                    </Stage2>
                </div> }
                
              </SwiperSlide>

              <SwiperSlide >
                
                {pokemonDetails.name !== evolutionDetails.stage2[4] ?
                <Link style={{color: theme.color}} className='links' to={`/details/${evolutionDetails.stage2[4]}`}>
                  { evolutionDetails.noInfo !== true ? <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                      

                      <div id='stage2pokemon4' className={pokemonDetails.name === evolutionDetails.stage2[4] ? 'selected stageslogos': 'stageslogos'}>
                        {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                      </div>
                      
                      <h4>{evolutionDetails.stage2[4]}</h4>
                      <div className='stagesgif'>
                        {speciesEvolutionImgs.stage2Img !== null ? <img src={speciesEvolutionImgs.stage2Img[4]} alt={evolutionDetails.stage2[4]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2[4]} width={'60px'} height={'60px'} /> }
                      </div>
                      <h4 className='qtd' >5-8</h4>
                  </Stage2> : ''}
                </Link> :
                <div style={{color: theme.color}} className='links'>
                  { evolutionDetails.noInfo !== true ? <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                      

                      <div id='stage2pokemon4' className={pokemonDetails.name === evolutionDetails.stage2[4] ? 'selected stageslogos': 'stageslogos'}>
                        {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                      </div>
                      
                      <h4>{evolutionDetails.stage2[4]}</h4>
                      <div className='stagesgif'>
                        {speciesEvolutionImgs.stage2Img !== null ? <img src={speciesEvolutionImgs.stage2Img[4]} alt={evolutionDetails.stage2[4]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2[4]} width={'60px'} height={'60px'} /> }
                      </div>
                      <h4 className='qtd' >5-8</h4>
                  </Stage2> : ''}
                </div> }
              </SwiperSlide>

              <SwiperSlide >
                
                {pokemonDetails.name !== evolutionDetails.stage2[5] ?
                <Link style={{color: theme.color}} className='links' to={`/details/${evolutionDetails.stage2[5]}`}>
                  { evolutionDetails.noInfo !== true ? <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                      

                      <div id='stage2pokemon5' className={pokemonDetails.name === evolutionDetails.stage2[5] ? 'selected stageslogos': 'stageslogos'}>
                        {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                      </div>
                      
                      <h4>{evolutionDetails.stage2[5]}</h4>
                      <div className='stagesgif'>
                        {speciesEvolutionImgs.stage2Img !== null ? <img src={speciesEvolutionImgs.stage2Img[5]} alt={evolutionDetails.stage2[5]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2[5]} width={'60px'} height={'60px'} /> }
                      </div>
                      <h4 className='qtd' >6-8</h4>
                  </Stage2> : ''}
                </Link> :
                <div style={{color: theme.color}} className='links'>
                  { evolutionDetails.noInfo !== true ? <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                      

                      <div id='stage2pokemon5' className={pokemonDetails.name === evolutionDetails.stage2[5] ? 'selected stageslogos': 'stageslogos'}>
                        {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                      </div>
                      
                      <h4>{evolutionDetails.stage2[5]}</h4>
                      <div className='stagesgif'>
                        {speciesEvolutionImgs.stage2Img !== null ? <img src={speciesEvolutionImgs.stage2Img[5]} alt={evolutionDetails.stage2[5]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2[5]} width={'60px'} height={'60px'} /> }
                      </div>
                      <h4 className='qtd' >6-8</h4>
                  </Stage2> : ''}
                </div> }
              </SwiperSlide>

              <SwiperSlide >

                {pokemonDetails.name !== evolutionDetails.stage2[6] ?                
                <Link style={{color: theme.color}} className='links' to={`/details/${evolutionDetails.stage2[6]}`}>
                    <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                
                        <div id='stage2pokemon6' className={pokemonDetails.name === evolutionDetails.stage2[6] ? 'selected stageslogos': 'stageslogos'}>
                          {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                        </div>
                        <h4>{evolutionDetails.stage2[6]}</h4>
                        <div className='stagesgif'>
                          {speciesEvolutionImgs.stage1Img !== null ? <img src={speciesEvolutionImgs.stage2Img[6]} alt={evolutionDetails.stage2[6]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2[6]} width={'60px'} height={'60px'} /> }
                        </div>
                        <h4 className='qtd' >7-8</h4>
                    </Stage2>
                </Link> :
                <div style={{color: theme.color}} className='links'>
                    <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                
                        <div id='stage2pokemon6' className={pokemonDetails.name === evolutionDetails.stage2[6] ? 'selected stageslogos': 'stageslogos'}>
                          {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                        </div>
                        <h4>{evolutionDetails.stage2[6]}</h4>
                        <div className='stagesgif'>
                          {speciesEvolutionImgs.stage1Img !== null ? <img src={speciesEvolutionImgs.stage2Img[6]} alt={evolutionDetails.stage2[6]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2[6]} width={'60px'} height={'60px'} /> }
                        </div>
                        <h4 className='qtd' >7-8</h4>
                    </Stage2>
                </div> }
                
              </SwiperSlide>

              <SwiperSlide >
                
                {pokemonDetails.name !== evolutionDetails.stage2[7] ?
                <Link style={{color: theme.color}} className='links' to={`/details/${evolutionDetails.stage2[7]}`}>
                    <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                
                        <div id='stage2pokemon7' className={pokemonDetails.name === evolutionDetails.stage2[7] ? 'selected stageslogos': 'stageslogos'}>
                          {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                        </div>
                        <h4>{evolutionDetails.stage2[7]}</h4>
                        <div className='stagesgif'>
                          {speciesEvolutionImgs.stage1Img !== null ? <img src={speciesEvolutionImgs.stage2Img[7]} alt={evolutionDetails.stage2[7]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2[7]} width={'60px'} height={'60px'} /> }
                        </div>
                        <h4 className='qtd' >8-8</h4>
                    </Stage2>
                </Link> :
                <div style={{color: theme.color}} className='links' >
                    <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                
                        <div id='stage2pokemon7' className={pokemonDetails.name === evolutionDetails.stage2[7] ? 'selected stageslogos': 'stageslogos'}>
                          {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                        </div>
                        <h4>{evolutionDetails.stage2[7]}</h4>
                        <div className='stagesgif'>
                          {speciesEvolutionImgs.stage1Img !== null ? <img src={speciesEvolutionImgs.stage2Img[7]} alt={evolutionDetails.stage2[7]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2[7]} width={'60px'} height={'60px'} /> }
                        </div>
                        <h4 className='qtd' >8-8</h4>
                    </Stage2>
                </div> }
                
              </SwiperSlide>

            </Swiper> : ''}

            { evolutionDetails.noInfo !== true && ExceptionsWurmple.includes(pokemonDetails.name) && pokemonDetails.name === 'wurmple' ? 
            <Swiper
            // effect="flip"
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            // pagination={{clickable: true}}
            modules={[Controller]}
            onSwiper={setFirstSwiper}
            controller={{ control: secondSwiper }}
            navigation
            >
              <SwiperSlide  >
                
                <Link style={{color: theme.color}} className='links' to={`/details/${evolutionDetails.stage2[0]}`}>
                    <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                        
                        <div id='stage2pokemon' className={pokemonDetails.name === evolutionDetails.stage2[0] ? 'selected stageslogos': 'stageslogos'}>
                          {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                        </div>
                        <h4>{evolutionDetails.stage2[0]}</h4>
                        <div className='stagesgif'>
                          {speciesEvolutionImgs.stage1Img !== null ? <img src={speciesEvolutionImgs.stage2Img[0]} alt={evolutionDetails.stage2[0]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2} width={'60px'} height={'60px'} /> }
                        </div>
                        <h4 className='qtd' >1-2</h4>
                    </Stage2>
                </Link> 
                
              </SwiperSlide>

              <SwiperSlide >
                
                <Link style={{color: theme.color}} className='links' to={`/details/${evolutionDetails.stage2[1]}`}>
                  { evolutionDetails.noInfo !== true ? <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                      

                      <div id='stage2pokemon2' className={pokemonDetails.name === evolutionDetails.stage2[1] ? 'selected stageslogos': 'stageslogos'}>
                        {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                      </div>
                      
                      <h4>{evolutionDetails.stage2[1]}</h4>
                      <div className='stagesgif'>
                        {speciesEvolutionImgs.stage2Img !== null ? <img src={speciesEvolutionImgs.stage2Img[1]} alt={evolutionDetails.stage2[1]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2} width={'60px'} height={'60px'} /> }
                      </div>
                      <h4 className='qtd' >2-2</h4>
                  </Stage2> : ''}
                </Link> 
              </SwiperSlide>
      
            </Swiper> : ''}

            { evolutionDetails.noInfo !== true && ExceptionsBurmy.includes(pokemonDetails.name) ? 
            <Swiper
            initialSlide={`${evolutionDetails.stage2.indexOf(`${pokemonDetails.name}`)}`}
            // effect="flip"
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            // pagination={{clickable: true}}
            navigation
            >
              <SwiperSlide  >
                
                <Link style={{color: theme.color}} className='links' to={`/details/${evolutionDetails.stage1}`}>
                    <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                        
                        <div id='stage2pokemon' className={pokemonDetails.name === evolutionDetails.stage2[0] ? 'selected stageslogos': 'stageslogos'}>
                          {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                        </div>
                        <h4>{evolutionDetails.stage2[0]}</h4>
                        <div className='stagesgif'>
                          {speciesEvolutionImgs.stage1Img !== null ? <img className='noImage' src={NoImagePlaceHolder} alt={pokemonDetails.name} width={'70px'} height={'70px'} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2} width={'60px'} height={'60px'} /> }
                        </div>
                        <h4 className='qtd' >1-2</h4>
                    </Stage2>
                </Link> 
                
              </SwiperSlide>

              <SwiperSlide >
                
                {pokemonDetails.name !== evolutionDetails.stage2[1] ?
                <Link style={{color: theme.color}} className='links' to={`/details/${evolutionDetails.stage2[1]}`}>
                  { evolutionDetails.noInfo !== true ? <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                      

                      <div id='stage2pokemon2' className={pokemonDetails.name === evolutionDetails.stage2[1] ? 'selected stageslogos': 'stageslogos'}>
                        {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                      </div>
                      
                      <h4>{evolutionDetails.stage2[1]}</h4>
                      <div className='stagesgif'>
                        {speciesEvolutionImgs.stage2Img !== null ? <img src={speciesEvolutionImgs.stage2Img[1]} alt={evolutionDetails.stage2[1]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2} width={'60px'} height={'60px'} /> }
                      </div>
                      <h4 className='qtd' >2-2</h4>
                  </Stage2> : ''}
                </Link> :
                <div style={{color: theme.color}} className='links'>
                  { evolutionDetails.noInfo !== true ? <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                      

                      <div id='stage2pokemon2' className={pokemonDetails.name === evolutionDetails.stage2[1] ? 'selected stageslogos': 'stageslogos'}>
                        {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                      </div>
                      
                      <h4>{evolutionDetails.stage2[1]}</h4>
                      <div className='stagesgif'>
                        {speciesEvolutionImgs.stage2Img !== null ? <img src={speciesEvolutionImgs.stage2Img[1]} alt={evolutionDetails.stage2[1]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2} width={'60px'} height={'60px'} /> }
                      </div>
                      <h4 className='qtd' >2-2</h4>
                  </Stage2> : ''}
                </div> } 
              </SwiperSlide>

            </Swiper> : ''}

            { evolutionDetails.noInfo !== true && ExceptionsTyrogue.includes(pokemonDetails.name) ? 
            <Swiper
            initialSlide={`${evolutionDetails.stage2.indexOf(`${pokemonDetails.name}`)}`}
            // effect="flip"
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            // pagination={{clickable: true}}
            navigation
            >
              <SwiperSlide  >
                
                {pokemonDetails.name !== evolutionDetails.stage2[0] ?
                <Link style={{color: theme.color}} className='links' to={`/details/${evolutionDetails.stage2[0]}`}>
                    <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                        
                        <div id='stage2pokemon' className={pokemonDetails.name === evolutionDetails.stage2[0] ? 'selected stageslogos': 'stageslogos'}>
                          {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                        </div>
                        <h4>{evolutionDetails.stage2[0]}</h4>
                        <div className='stagesgif'>
                          {speciesEvolutionImgs.stage1Img !== null ? <img src={speciesEvolutionImgs.stage2Img[0]} alt={evolutionDetails.stage2[0]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2[0]} width={'60px'} height={'60px'} /> }
                        </div>
                        <h4 className='qtd' >1-3</h4>
                    </Stage2>
                </Link> :
                <div style={{color: theme.color}} className='links'>
                    <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                        
                        <div id='stage2pokemon' className={pokemonDetails.name === evolutionDetails.stage2[0] ? 'selected stageslogos': 'stageslogos'}>
                          {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                        </div>
                        <h4>{evolutionDetails.stage2[0]}</h4>
                        <div className='stagesgif'>
                          {speciesEvolutionImgs.stage1Img !== null ? <img src={speciesEvolutionImgs.stage2Img[0]} alt={evolutionDetails.stage2[0]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2[0]} width={'60px'} height={'60px'} /> }
                        </div>
                        <h4 className='qtd' >1-3</h4>
                    </Stage2>
                </div> }
                
              </SwiperSlide>

              <SwiperSlide >
                
                {pokemonDetails.name !== evolutionDetails.stage2[1] ?
                <Link style={{color: theme.color}} className='links' to={`/details/${evolutionDetails.stage2[1]}`}>
                  { evolutionDetails.noInfo !== true ? <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                      

                      <div id='stage2pokemon2' className={pokemonDetails.name === evolutionDetails.stage2[1] ? 'selected stageslogos': 'stageslogos'}>
                        {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                      </div>
                      
                      <h4>{evolutionDetails.stage2[1]}</h4>
                      <div className='stagesgif'>
                        {speciesEvolutionImgs.stage2Img !== null ? <img src={speciesEvolutionImgs.stage2Img[1]} alt={evolutionDetails.stage2[1]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2} width={'60px'} height={'60px'} /> }
                      </div>
                      <h4 className='qtd' >2-3</h4>
                  </Stage2> : ''}
                </Link> :
                <div style={{color: theme.color}} className='links'>
                  { evolutionDetails.noInfo !== true ? <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                      

                      <div id='stage2pokemon2' className={pokemonDetails.name === evolutionDetails.stage2[1] ? 'selected stageslogos': 'stageslogos'}>
                        {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                      </div>
                      
                      <h4>{evolutionDetails.stage2[1]}</h4>
                      <div className='stagesgif'>
                        {speciesEvolutionImgs.stage2Img !== null ? <img src={speciesEvolutionImgs.stage2Img[1]} alt={evolutionDetails.stage2[1]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2} width={'60px'} height={'60px'} /> }
                      </div>
                      <h4 className='qtd' >2-3</h4>
                  </Stage2> : ''}
                </div> }
              </SwiperSlide>

              <SwiperSlide >
                
                {pokemonDetails.name !== evolutionDetails.stage2[2] ?
                <Link style={{color: theme.color}} className='links' to={`/details/${evolutionDetails.stage2[2]}`}>
                  { evolutionDetails.noInfo !== true ? <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                      

                      <div id='stage2pokemon3' className={pokemonDetails.name === evolutionDetails.stage2[2] ? 'selected stageslogos': 'stageslogos'}>
                        {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                      </div>
                      
                      <h4>{evolutionDetails.stage2[2]}</h4>
                      <div className='stagesgif'>
                        {speciesEvolutionImgs.stage2Img !== null ? <img src={speciesEvolutionImgs.stage2Img[2]} alt={evolutionDetails.stage2[2]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2[2]} width={'60px'} height={'60px'} /> }
                      </div>
                      <h4 className='qtd'>3-3</h4>
                  </Stage2> : ''}
                </Link> :
                <div style={{color: theme.color}} className='links'>
                  { evolutionDetails.noInfo !== true ? <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                      

                      <div id='stage2pokemon3' className={pokemonDetails.name === evolutionDetails.stage2[2] ? 'selected stageslogos': 'stageslogos'}>
                        {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                      </div>
                      
                      <h4>{evolutionDetails.stage2[2]}</h4>
                      <div className='stagesgif'>
                        {speciesEvolutionImgs.stage2Img !== null ? <img src={speciesEvolutionImgs.stage2Img[2]} alt={evolutionDetails.stage2[2]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2[2]} width={'60px'} height={'60px'} /> }
                      </div>
                      <h4 className='qtd'>3-3</h4>
                  </Stage2> : ''}
                </div> }
              </SwiperSlide>
    
            </Swiper> : ''}

            { evolutionDetails.noInfo !== true && (ExceptionsSlowpoke.includes(pokemonDetails.name) || ExceptionsClamperl.includes(pokemonDetails.name) || ExceptionsSnorunt.includes(pokemonDetails.name) || ExceptionsNincada.includes(pokemonDetails.name)) && pokemonDetails.name !== evolutionDetails.stage2[0] && pokemonDetails.name !== evolutionDetails.stage2[1] ?
            <Swiper
            initialSlide={`${evolutionDetails.stage2.indexOf(`${pokemonDetails.name}`)}`}
            // effect="flip"
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            // pagination={{clickable: true}}
            navigation
            >
              <SwiperSlide  >
                
                <Link style={{color: theme.color}} className='links' to={`/details/${evolutionDetails.stage2[0]}`}>
                    <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                        
                        <div id='stage2pokemon' className={pokemonDetails.name === evolutionDetails.stage2[0] ? 'selected stageslogos': 'stageslogos'}>
                          {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                        </div>
                        <h4>{evolutionDetails.stage2[0]}</h4>
                        <div className='stagesgif'>
                          {speciesEvolutionImgs.stage1Img !== null ? <img src={speciesEvolutionImgs.stage2Img[0]} alt={evolutionDetails.stage2[0]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2[0]} width={'60px'} height={'60px'} /> }
                        </div>
                        <h4 className='qtd' >1-2</h4>
                    </Stage2>
                </Link> 
                
              </SwiperSlide>

              <SwiperSlide >
                
                <Link style={{color: theme.color}} className='links' to={`/details/${evolutionDetails.stage2[1]}`}>
                  { evolutionDetails.noInfo !== true ? <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                      

                      <div id='stage2pokemon2' className={pokemonDetails.name === evolutionDetails.stage2[1] ? 'selected stageslogos': 'stageslogos'}>
                        {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                      </div>
                      
                      <h4>{evolutionDetails.stage2[1]}</h4>
                      <div className='stagesgif'>
                        {speciesEvolutionImgs.stage2Img !== null ? <img src={speciesEvolutionImgs.stage2Img[1]} alt={evolutionDetails.stage2[1]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2} width={'60px'} height={'60px'} /> }
                      </div>
                      <h4 className='qtd' >2-2</h4>
                  </Stage2> : ''}
                </Link> 
              </SwiperSlide>
      
            </Swiper> : ''}

            { evolutionDetails.noInfo !== true && (ExceptionsSlowpoke.includes(pokemonDetails.name) || ExceptionsClamperl.includes(pokemonDetails.name) || ExceptionsSnorunt.includes(pokemonDetails.name) || ExceptionsNincada.includes(pokemonDetails.name)) && pokemonDetails.name === evolutionDetails.stage2[0] ?
            <Swiper
            initialSlide={`${evolutionDetails.stage2.indexOf(`${pokemonDetails.name}`)}`}
            // effect="flip"
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            // pagination={{clickable: true}}
            navigation
            >
              <SwiperSlide  >
                
                <div style={{color: theme.color}} className='links'>
                    <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                        
                        <div id='stage2pokemon' className={pokemonDetails.name === evolutionDetails.stage2[0] ? 'selected stageslogos': 'stageslogos'}>
                          {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                        </div>
                        <h4>{evolutionDetails.stage2[0]}</h4>
                        <div className='stagesgif'>
                          {speciesEvolutionImgs.stage1Img !== null ? <img src={speciesEvolutionImgs.stage2Img[0]} alt={evolutionDetails.stage2[0]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2[0]} width={'60px'} height={'60px'} /> }
                        </div>
                        <h4 className='qtd' >1-2</h4>
                    </Stage2>
                </div> 
                
              </SwiperSlide>

              <SwiperSlide >
                
                <Link style={{color: theme.color}} className='links' to={`/details/${evolutionDetails.stage2[1]}`}>
                  { evolutionDetails.noInfo !== true ? <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                      

                      <div id='stage2pokemon2' className={pokemonDetails.name === evolutionDetails.stage2[1] ? 'selected stageslogos': 'stageslogos'}>
                        {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                      </div>
                      
                      <h4>{evolutionDetails.stage2[1]}</h4>
                      <div className='stagesgif'>
                        {speciesEvolutionImgs.stage2Img !== null ? <img src={speciesEvolutionImgs.stage2Img[1]} alt={evolutionDetails.stage2[1]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2} width={'60px'} height={'60px'} /> }
                      </div>
                      <h4 className='qtd' >2-2</h4>
                  </Stage2> : ''}
                </Link> 
              </SwiperSlide>
      
            </Swiper> : ''}

            { evolutionDetails.noInfo !== true && (ExceptionsSlowpoke.includes(pokemonDetails.name) || ExceptionsClamperl.includes(pokemonDetails.name) || ExceptionsSnorunt.includes(pokemonDetails.name) || ExceptionsNincada.includes(pokemonDetails.name)) && pokemonDetails.name === evolutionDetails.stage2[1] ?
            <Swiper
            initialSlide={`${evolutionDetails.stage2.indexOf(`${pokemonDetails.name}`)}`}
            // effect="flip"
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            // pagination={{clickable: true}}
            navigation
            >
              <SwiperSlide  >
                
                <Link style={{color: theme.color}} className='links' to={`/details/${evolutionDetails.stage2[0]}`}>
                    <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                        
                        <div id='stage2pokemon' className={pokemonDetails.name === evolutionDetails.stage2[0] ? 'selected stageslogos': 'stageslogos'}>
                          {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                        </div>
                        <h4>{evolutionDetails.stage2[0]}</h4>
                        <div className='stagesgif'>
                          {speciesEvolutionImgs.stage1Img !== null ? <img src={speciesEvolutionImgs.stage2Img[0]} alt={evolutionDetails.stage2[0]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2[0]} width={'60px'} height={'60px'} /> }
                        </div>
                        <h4 className='qtd' >1-2</h4>
                    </Stage2>
                </Link>  
                
              </SwiperSlide>

              <SwiperSlide >
                
                <div style={{color: theme.color}} className='links'>
                  { evolutionDetails.noInfo !== true ? <Stage2 onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseleave}>
                      

                      <div id='stage2pokemon2' className={pokemonDetails.name === evolutionDetails.stage2[1] ? 'selected stageslogos': 'stageslogos'}>
                        {theme.name === 'light' ? <Stage2Light /> : <Stage2Dark />}
                      </div>
                      
                      <h4>{evolutionDetails.stage2[1]}</h4>
                      <div className='stagesgif'>
                        {speciesEvolutionImgs.stage2Img !== null ? <img src={speciesEvolutionImgs.stage2Img[1]} alt={evolutionDetails.stage2[1]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2} width={'60px'} height={'60px'} /> }
                      </div>
                      <h4 className='qtd' >2-2</h4>
                  </Stage2> : ''}
                </div> 
              </SwiperSlide>
    
            </Swiper> : ''}


{/* ATÉ AQUI */}
         
            {/* SETA 2 */}
            { evolutionDetails.stage3 !== undefined ? <img className='seta' src="../images/seta-pequena.svg" alt="seta pequena" /> : ''}
            
            {/* STAGE 3 PADRÃO */}
            { evolutionDetails.stage3 !== undefined && !Exceptions.includes(pokemonDetails.name) ?
            <Link style={{color: theme.color}} className='links' to={`/stage3details/${evolutionDetails.stage3}`}>
             <Stage3 onMouseEnter={handleMouseEnter3} onMouseLeave={handleMouseleave}>
              
              
              <div id='stage3pokemon' className={pokemonDetails.name === evolutionDetails.stage3 ? 'selected stageslogos': 'stageslogos'}>
                {theme.name === 'light' ? <Stage3Light /> : <Stage3Dark />}
              </div>
              <h4>{evolutionDetails.stage3}</h4>
              <div className='stagesgif'>
                {speciesEvolutionImgs.stage3Img !== null ? <img src={speciesEvolutionImgs.stage3Img} alt={evolutionDetails.stage3} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage3} width={'60px'} height={'60px'} /> }
              </div>
            </Stage3>
            </Link>  : ''}

            {/* STAGE 3 EXCEÇÕES */}
            { evolutionDetails.stage3 !== undefined && ExceptionsWurmple.includes(pokemonDetails.name) && pokemonDetails.name === 'wurmple'?
            <Swiper
            // effect="flip"
            slidesPerView={1}
            // onSlideChange={() => setSlideChange(true)}
            // onSwiper={() => setSlideChange(true)}
            // pagination={{clickable: true}}
            modules={[Controller]}
            onSwiper={setSecondSwiper}
            controller={{ control: firstSwiper }}
            navigation
            >
              <SwiperSlide  >
                
                <Link style={{color: theme.color}} className='links' to={`/stage3details/${evolutionDetails.stage3[0]}`}>
                    <Stage3 onMouseEnter={handleMouseEnter3} onMouseLeave={handleMouseleave}>
                        
                        <div id='stage3pokemon' className={pokemonDetails.name === evolutionDetails.stage3[0] ? 'selected stageslogos': 'stageslogos'}>
                          {theme.name === 'light' ? <Stage3Light /> : <Stage3Dark />}
                        </div>

                        <h4>{evolutionDetails.stage3[0]}</h4>                        

                        <div className='stagesgif'>
                          {speciesEvolutionImgs.stage3Img !== null ? <img src={speciesEvolutionImgs.stage3Img[0]} alt={evolutionDetails.stage3[0]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage3[0]} width={'60px'} height={'60px'} /> }
                        </div>
                        <h4 className='qtd' >1-2</h4>
                    </Stage3>
                </Link> 
                
              </SwiperSlide>

              <SwiperSlide >
                
                <Link style={{color: theme.color}} className='links' to={`/stage3details/${evolutionDetails.stage3[1]}`}>
                  { evolutionDetails.noInfo !== true ? <Stage3 onMouseEnter={handleMouseEnter3} onMouseLeave={handleMouseleave}>
                      

                      <div id='stage3pokemon2' className={pokemonDetails.name === evolutionDetails.stage3[1] ? 'selected stageslogos': 'stageslogos'}>
                        {theme.name === 'light' ? <Stage3Light /> : <Stage3Dark />}
                      </div>
                      
                      <h4>{evolutionDetails.stage3[1]}</h4>
                      <div className='stagesgif'>
                        {speciesEvolutionImgs.stage3Img !== null ? <img src={speciesEvolutionImgs.stage3Img[1]} alt={evolutionDetails.stage3[1]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage3[1]} width={'60px'} height={'60px'} /> }
                      </div>
                      <h4 className='qtd' >2-2</h4>
                  </Stage3> : ''}
                </Link> 
              </SwiperSlide>
     
            </Swiper> : ''}

            { evolutionDetails.noInfo !== true && ExceptionsWurmple.includes(pokemonDetails.name) && pokemonDetails.name === 'silcoon' || pokemonDetails.name === 'beautifly'  ? 
            <Link style={{color: theme.color}} className='links' to={`/stage3details/${evolutionDetails.stage3[0]}`}>
              <Stage3 onMouseEnter={handleMouseEnter3} onMouseLeave={handleMouseleave}>
                

                <div id='stage3pokemon' className={pokemonDetails.name === evolutionDetails.stage3[0] ? 'selected stageslogos': 'stageslogos'}>
                  {theme.name === 'light' ? <Stage3Light /> : <Stage3Dark />}
                </div>
                <h4>{evolutionDetails.stage3[0]}</h4>
                <div className='stagesgif'>
                  {speciesEvolutionImgs.stage3Img[0] !== null ? <img src={speciesEvolutionImgs.stage3Img[0]} alt={evolutionDetails.stage3[0]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2} width={'60px'} height={'60px'} /> }
                </div>
              </Stage3>
            </Link>: ''}

            { evolutionDetails.noInfo !== true && ExceptionsWurmple.includes(pokemonDetails.name) && pokemonDetails.name === 'cascoon' || pokemonDetails.name === 'dustox'  ? 
            <Link style={{color: theme.color}} className='links' to={`/stage3details/${evolutionDetails.stage3[1]}`}>
              <Stage3 onMouseEnter={handleMouseEnter3} onMouseLeave={handleMouseleave}>
                

                <div id='stage3pokemon' className={pokemonDetails.name === evolutionDetails.stage3[1] ? 'selected stageslogos': 'stageslogos'}>
                  {theme.name === 'light' ? <Stage3Light /> : <Stage3Dark />}
                </div>
                <h4>{evolutionDetails.stage3[1]}</h4>
                <div className='stagesgif'>
                  {speciesEvolutionImgs.stage3Img[1] !== null ? <img src={speciesEvolutionImgs.stage3Img[1]} alt={evolutionDetails.stage3[1]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage2} width={'60px'} height={'60px'} /> }
                </div>
              </Stage3>
            </Link>: ''}
            
            { evolutionDetails.noInfo !== true && ExceptionsOddish.includes(pokemonDetails.name) || ExceptionsPoliwag.includes(pokemonDetails.name) || ExceptionsRalts.includes(pokemonDetails.name) ?
            <Swiper
            initialSlide={`${evolutionDetails.stage3.indexOf(`${pokemonDetails.name}`)}`}
            // effect="flip"
            slidesPerView={1}
            // onSlideChange={() => setSlideChange(true)}
            // onSwiper={() => setSlideChange(true)}
            // pagination={{clickable: true}}
            navigation
            >
              <SwiperSlide  >
                
                <Link style={{color: theme.color}} className='links' to={`/stage3details/${evolutionDetails.stage3[0]}`}>
                    <Stage3 onMouseEnter={handleMouseEnter3} onMouseLeave={handleMouseleave}>
                        
                        <div id='stage3pokemon' className={pokemonDetails.name === evolutionDetails.stage3[0] ? 'selected stageslogos': 'stageslogos'}>
                          {theme.name === 'light' ? <Stage3Light /> : <Stage3Dark />}
                        </div>

                        <h4>{evolutionDetails.stage3[0]}</h4>                        

                        <div className='stagesgif'>
                          {speciesEvolutionImgs.stage3Img !== null ? <img src={speciesEvolutionImgs.stage3Img[0]} alt={evolutionDetails.stage3[0]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage3[0]} width={'60px'} height={'60px'} /> }
                        </div>
                        <h4 className='qtd' >1-2</h4>
                    </Stage3>
                </Link> 
                
              </SwiperSlide>

              <SwiperSlide >
                
                <Link style={{color: theme.color}} className='links' to={`/stage3details/${evolutionDetails.stage3[1]}`}>
                  { evolutionDetails.noInfo !== true ? <Stage3 onMouseEnter={handleMouseEnter3} onMouseLeave={handleMouseleave}>
                      

                      <div id='stage3pokemon2' className={pokemonDetails.name === evolutionDetails.stage3[1] ? 'selected stageslogos': 'stageslogos'}>
                        {theme.name === 'light' ? <Stage3Light /> : <Stage3Dark />}
                      </div>
                      
                      <h4>{evolutionDetails.stage3[1]}</h4>
                      <div className='stagesgif'>
                        {speciesEvolutionImgs.stage3Img !== null ? <img src={speciesEvolutionImgs.stage3Img[1]} alt={evolutionDetails.stage3[1]} /> : <img className='noImage' src={NoImagePlaceHolder} alt={evolutionDetails.stage3[1]} width={'60px'} height={'60px'} /> }
                      </div>
                      <h4 className='qtd' >2-2</h4>
                  </Stage3> : ''}
                </Link> 
              </SwiperSlide>
     
            </Swiper> : ''}

            {megaExceptions === true && pokemonDetails.name === 'charizard'?
            
            <MegaExceptions>
            
                <Link style={{color: theme.color, backgroundColor: theme.background}} className='MegaExceptions' to={`/megadetails/${pokemonDetails.name+'-mega-x'}`}>
                  <StageMega>

                        <h4>{pokemonDetails.name+'-mega-x'}</h4>                        

                        <div className='stagesgifexceptions'>
                          {megaExceptions === true ? <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/10034.gif`} alt={pokemonDetails.name+'-mega-X'} /> : <img className='noImage' src={NoImagePlaceHolder} alt={pokemonDetails.name+'-mega-X'} width={'60px'} height={'60px'} /> }
                        </div>
                        
                    </StageMega>
                </Link> 
                      
                <Link style={{color: theme.color, backgroundColor: theme.background}} className='MegaExceptions mega-y' to={`/megadetails/${pokemonDetails.name+'-mega-y'}`}>
                    <StageMega>
                        
                        <h4>{pokemonDetails.name+'-mega-y'}</h4>                        

                        <div className='stagesgifexceptions'>
                          {megaExceptions === true ? <img className='mega-y' src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/10035.gif'} alt={pokemonDetails.name+'Y'} /> : <img className='noImage' src={NoImagePlaceHolder} alt={pokemonDetails.name+'-mega-y'} width={'60px'} height={'60px'} /> }
                        </div>
                        
                    </StageMega>
                </Link> 
            
            </MegaExceptions>
             : ''}

            {megaExceptions === true && pokemonDetails.name === 'mewtwo'?
            
            <MegaExceptions>
            
                <Link style={{color: theme.color, backgroundColor: theme.background}} className='MegaExceptions' to={`/megadetails/${pokemonDetails.name+'-mega-x'}`}>
                  <StageMega>

                        <h4>{pokemonDetails.name+'-mega-x'}</h4>                        

                        <div className='stagesgifexceptions'>
                          {megaExceptions === true ? <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/10043.gif`} alt={pokemonDetails.name+'-mega-x'} /> : <img className='noImage' src={NoImagePlaceHolder} alt={pokemonDetails.name+'-mega-x'} width={'60px'} height={'60px'} /> }
                        </div>
                        
                    </StageMega>
                </Link> 
                      
                <Link style={{color: theme.color, backgroundColor: theme.background}} className='MegaExceptions' to={`/megadetails/${pokemonDetails.name+'-mega-y'}`}>
                    <StageMega>
                        
                        <h4>{pokemonDetails.name+'-mega-y'}</h4>                        

                        <div className='stagesgifexceptions'>
                          {megaExceptions === true ? <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/10044.gif'} alt={pokemonDetails.name+'y'} /> : <img className='noImage' src={NoImagePlaceHolder} alt={pokemonDetails.name+'-mega-y'} width={'60px'} height={'60px'} /> }
                        </div>
                        
                    </StageMega>
                </Link> 
            
            </MegaExceptions>
             : ''}
           
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
      height: 83vh;
      margin-top: 1vh;
    }

    @media screen and (min-width: 375px) and (max-width: 500px) {
      height: 75.5vh;
      margin-top: 4.5vh;
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
      margin-top: -5px;

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
      margin-top: 20px;

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
  padding-bottom: 0;
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
    height: 30px
  }

  @media screen and (orientation: landscape) and (max-height: 400px) {
    width: 35vw;
    margin-left: 40px;
    margin-bottom: 10px;

      h3{
        font-size: 18px;
        min-height: 44px;
        max-width: 200px;
        margin-bottom: 0px;
      }

      .largeName{
        font-size: 16px
      }

      img{
        width: 180px;
        height: 180px;
        margin-top: -7px;
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
    width: 200px;
  }
  
  // .evolution{
  //   margin-left: 155px;
  // }

  .evolution-moves{
    display: flex;
    
  }

  .moves-evolution{
    display: flex;
  }

  .moves-evolution:hover, .evolution-moves:hover{
    color: red;
    cursor: pointer;
    scale: 1.1;
  }

  .mega{
    width: 200px;
    margin-top: -50px;
    margin-left:-10px;
    margin-right: 10px;
    justify-self: center;
    align-self: center;
  }

   .mega1{
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    height: 80px;
    align-items: center;
    margin-left: -142px;
    margin-right: 70px;
    margin-top: -55px;
    }

  .emptydiv{
    width:200px;
    margin-left: -180px;
    
  }

  .emptydiv.box{
    width:200px;
    margin-left: 30px;
    
  }

  .emptydiv.box2{
      width:200px;
      margin-right: 160px;
  }

  @media screen and (orientation: landscape) and (max-height: 400px) {
    margin-top: -20px;
    margin-left: -100px;
    z-index: 1;
    
    h4{
      font-size: 1.4rem;
    }
   
    .ability{
      margin-top: -68px;
      margin-left: 10px;
      margin-right: 15px;
    }

    .abilities{
      // width: 107.36px;
      margin-top: -68px;
      margin-left: 10px;
    }

    .moves{
      margin-left: 350px;
      margin-top: -260px;
    } 

    .moves.box{
      margin-left: 355px;
      margin-top: -260px;
    } 
    .mega{
    width: 200px;
    margin-top: -300px;
    // margin-left:-140px;
    margin-left:-130px;
    margin-right: 60px;
    justify-self: center;
    align-self: center;
    }

    .mega1{
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    height: 80px;
    align-items: center;
    margin-left: -75px;
    margin-top: -220px;
    }

    .mega2{
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    height: 80px;
    align-items: center;
    margin-left: -172px;
    margin-right: 60px;
    margin-top: -220px;
    }

    .evolution-moves{
      margin-left: 350px;
      margin-right: 0px;
      margin-top: 10px;
    }
    
    .moves-evolution{
      margin-left: 380px;
      margin-right:0px;
      margin-top: 10px;
    }

    // .evolution-moves.exception{
    //   margin-left: 350px;
    //   margin-right: 0px;
    //   margin-top: 10px;
    // }

    // .moves-evolution.exception{
    //   margin-left: 380px;
    //   margin-right:0px;
    //   margin-top: 10px;
    // }

    .emptydiv{
      width:200px;
      margin-left: 5px;
    }
    
    .emptydiv.box{
      width:200px;
      margin-right: 30px;
    }
    .emptydiv.box2{
      width:200px;
      margin-right: 0px;
    }
    
    
  }

  @media screen and (min-width: 320px) and (max-width: 425px) {
    max-width: 90vw;
    margin-left: 10px;

    h4{
    font-size: 1.5rem;
    }

    .mega{
    margin-top: -485px;
    margin-left:-255px;
    
    }

    .mega1{
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 80px;
    // margin-top: -285px;
    margin-top: -282px;
    margin-right: 0px;
    margin-left: -208px
    
    
    }

    // MEXER AQUI
    .evolution-moves{
      width: 144px;
      margin-left: 25px
    }

    .moves-evolution{
      flex-wrap: wrap;
      align-content: flex-end;
      width: 82px;
      margin-left: 80px;
      
    }

    .emptydiv{
      // margin-left: -205px;
      margin-left: -205px;
    }

    .emptydiv.box{
      margin-left: -252px;
    }

    .emptydiv.box2{
      width:200px;
      margin-left: -400px;
    }

    .moves{
      margin-top: -10px
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
  max-height: 115px;
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
      width: 470px;
      height: 100px;
      margin-left: -220px;
      margin-top: -80px;
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
      max-height: 100px;
    
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
    margin-left: 160px;
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
    margin-top: -88px;
      
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

const MegaExceptions = styled.div`

width: 100vw;
height: 170px;
display:flex;
position: absolute;
align-content: center;
justify-content: center;

margin-top: 5px;

h4{ 
text-align: center;
width: 180px;
}

.stagesgifexceptions{
  align-self:center;
  justify-self: center;
    
  .mega-y{
    height:130px;
    width:158px;
  }
}

@media screen and (min-width: 320px) and (max-width: 425px) {
  width: 100vw;
  margin-top: 15px;
}

@media screen and (min-width: 320px) and (max-width: 425px) and (max-height: 700px){
  margin-top: 6px;

}

@media screen and (orientation: landscape) and (max-height: 400px) {

width: 332px;
height: 133px;
margin-top: 22px;
margin-left: 24px;
h4{
    margin-top: 10px;
    width: 140px;
  }

.mega-y{
  margin-top: -10px;
  height:143px;

  h4{
    margin-top: 20px;
  }
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

    @media screen and (min-width: 320px) and (max-width: 425px) {
      width: 100vw;
      gap: 2px;
      margin-top: -10px;

      .seta{
      width: 25px;
      margin-top: -10px;
      }

      h4{
      font-size: 11px;
      }

      .links{
        width: 100px;
        justify-self: center;
        align-self: center;
      }

      // #stage1pokemon{
      //   width: 100px
      // }

      .stagesgif{
      
        img{
        max-width: 90px;
        }
      }    

      .swiper-wrapper {
      height: 150px;
        // margin-top: 10.5px;
        margin-top: 20px;
        h4{
        margin-top: 0px;
        }

      }

      .noEvolutionInfo{
      margin-top: 30px;
      }

  
      .swiper-button-prev, .swiper-rtl .swiper-button-next {
        left: var(--swiper-navigation-sides-offset, 5px);
        right: var(--swiper-navigation-sides-offset, 5px);
      }

      // .swiper-button-prev, .swiper-rtl .swiper-button-next {
      //   left: var(--swiper-navigation-sides-offset, 45px);
      //   right: var(--swiper-navigation-sides-offset, auto);
      // }
      //   .swiper-button-next, .swiper-rtl .swiper-button-prev{
      //   left: var(--swiper-navigation-sides-offset, 160px);
      //   right: var(--swiper-navigation-sides-offset, auto);
      // }

      .MegaExceptions{
        display: flex;
        align-content: center;
        justify-content: center;
        width: 50vw;
        }

    }

    @media screen and (min-width: 320px) and (max-width: 425px) and (max-height: 675px) {
      .swiper-wrapper {
        margin-top: 22px;
      }
    }

    @media screen and (min-width: 320px) and (max-width: 425px) and (min-height: 676px) and (max-height: 685px) {
      .swiper-wrapper {
        margin-top: 2px;
      }
    }
    
    @media screen and (min-width: 320px) and (max-width: 425px) and (min-height: 686px) and (max-height: 695px) {
      .swiper-wrapper {
        margin-top: 6px;
      }
    }

    @media screen and (min-width: 320px) and (max-width: 425px) and (min-height: 696px) and (max-height: 700px) {
      .swiper-wrapper {
        margin-top: 9px;
      }
    }

    @media screen and (min-width: 320px) and (max-width: 425px) and (min-height: 701px) and (max-height: 710px) {
      .swiper-wrapper {
        margin-top: 12px;
      }
    }

    @media screen and (min-width: 320px) and (max-width: 425px) and (min-height: 711px) and (max-height: 720px) {
      .swiper-wrapper {
        margin-top: 15px; 
      }
    }

    @media screen and (min-width: 320px) and (max-width: 425px) and (min-height: 721px) and (max-height: 730px) {
      .swiper-wrapper {
        margin-top: 20px; 
      }
    }

    @media screen and (min-width: 320px) and (max-width: 425px) and (min-height: 731px) and (max-height: 800px) {
      .swiper-wrapper {
        margin-top: 25px; 
      }
    }

    @media screen and (min-width: 320px) and (max-width: 425px) and (min-height: 801px){
      .swiper-wrapper {
        margin-top: 25px; 
      }
    }

    @media screen and (orientation: landscape) and (max-height: 400px) {
      margin-top: -245px;
      width: 330px;
      height: 160px;
      margin-left: -120px;
      display: flex;
      z-index: 1;
      
      gap: 2px;
      
      .swiper-slide.swiper-slide-active, .swiper-slide.swiper-slide-next, .swiper-slide.swiper-slide-prev {
        height: 140px;
      }

      .seta{
      width: 27px;
      margin-top: -15px;
      }

      h4{
      font-size: 10px;
      }

      .links{
        width: 90px;
        justify-self: center;
        align-self: center;
      }

      // #stage1pokemon{
      //   width: 100px
      // }

      .stagesgif{
      
        img{
        max-width: 88px;
        }
      }    

      .swiper-wrapper {
      height: 140px;
      margin-top: 10px;
        h4{
        margin-top: 0px;
        }

      }

      .swiper-button-prev, .swiper-rtl .swiper-button-next {
        left: var(--swiper-navigation-sides-offset, 5px);
        right: var(--swiper-navigation-sides-offset, 5px);
      }

      .MegaExceptions{
        display: flex;
        align-content: center;
        justify-content: center;
        width: 25vw;
        }

      .noEvolutionInfo{
      margin-top: 20px;
      }
      .stagesgif{
      display: grid;
      width: 90px;
      height: 70px;  
      align-content: flex-end; 
      justify-items: center;     
      }
      .qtd{
        display:none;
      }
         
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
    min-width: 90px;
    min-height: 80px; 
    align-content: flex-end; 
    justify-items: center;     
  }

  .links{
    text-decoration: none;
  }

  .qtd{
    margin-top: 10px;
  }

`

const Stage1 = styled.div`

  display: flex;
  flex-direction: column;
  width: 150px;
  height:  164px;
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
    }

    @media screen and (orientation: landscape) and (max-height: 400px) {
      width: 90px;
      height: 140px;
      #stage1pokemon{
        height:50px;
      }
    }

    @media screen and (min-width: 320px) and (max-width: 425px) {
      width: 100px;
      height: 150px;
    }
`

const Stage2 = styled.div`

  display: flex;
  flex-direction: column;
  width: 150px;
  height: 164px;
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
  }

  @media screen and (orientation: landscape) and (max-height: 400px) {
    width: 90px;
    height: 140px;

    #stage2pokemon, #stage2pokemon1, #stage2pokemon2, #stage2pokemon3, #stage2pokemon4, #stage2pokemon5, #stage2pokemon6, #stage2pokemon7{
      height:50px;
    }    

  }
  @media screen and (min-width: 320px) and (max-width: 425px) {
    width: 100px;
    height: 150px;
    // margin-top: 10.5px;
    .qtd{
        display: none;
      }
  }

`

const Stage3 = styled.div`

  display: flex;
  flex-direction: column;
  width: 150px;
  height: 164px;
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
  }

  @media screen and (orientation: landscape) and (max-height: 400px) {
    width: 90px;
    height: 140px;

    #stage3pokemon{
      height:50px;
    }
    #stage3pokemon2{
      height:50px;
    }
  }
  @media screen and (min-width: 320px) and (max-width: 425px) {
      width: 100px;
      height: 150px;
      .qtd{
        display: none;
      }
  }

`

const StageMega = styled.div`

  display: flex;
  flex-direction: column;
  width: 170px;
  height: 140px;
  justify-content: space-between;
  position: relative;
  z-index: 0;
  text-transform: uppercase;
  margin-left: 62.5px;
  margin-right: 62.5px;
  

    h4{
      font-family: "Orbitron", sans-serif;
      align-self: center;
    }

    img{
      // width: 60px;
      // height: 60px;
      align-self: center;
      justify-self: center;
      opacity: 1;
      animation-name: fadeInOpacity;
      animation-iteration-count: 1;
      animation-timing-function: ease-in;
      animation-duration: 1s;
    }

  @media screen and (min-width: 320px) and (max-width: 425px) {
      width: 50vw;
      margin: 0;
  }

  @media screen and (min-width: 320px) and (max-width: 425px) {
      width: 50vw;
  }

`