const baseUrl = 'https://pokeapi.co/api/v2/'

async function getPokemons(limit, offset) {
    const response = await fetch(`${baseUrl}pokemon?limit=${limit}&offset=${offset}`)
    const data = await response.json([])
    const { results } = data

    const pokemonsNames = results.map((pokemon) => {
        return pokemon.name
    })
    
    const pokemonList = pokemonsNames.map(async (pokemon) => await getPokemonData(pokemon)
    );
    return await Promise.all(pokemonList)
}

async function getPokemonData(name) {
    const response = await fetch([`${baseUrl}pokemon/${name}`])
    return await response.json([])
}

export { getPokemons }