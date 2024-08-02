const baseUrl = 'https://pokeapi.co/api/v2/'

async function getPokemonTypes() {
    const response = await fetch(`${baseUrl}type`)
    const data = await response.json()
    const { results } = data

    const pokemonTypesNames = results.map((type) => {
        return type.name
    })

    const filteredTypes = pokemonTypesNames.filter((type) => type !== 'unknown' && type !== 'stellar')
    
    const pokemonListByType = filteredTypes.map(async (pokemonType) => await fetchPokemonByType(pokemonType))
    
    return await Promise.all(pokemonListByType)
    
}


async function fetchPokemonByType(type) {
    const response = await fetch(`${baseUrl}type/${type}`)
    return await response.json()
}

export { getPokemonTypes }




