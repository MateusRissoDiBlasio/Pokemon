const baseUrl = 'https://pokeapi.co/api/v2/';

async function getPokemons(limit, offset) {
    const response = await fetch(`${baseUrl}pokemon?limit=${limit}&offset=${offset}`)
    const data = await response.json([])
    const { results } = data

    console.log(data)

    const pokemonsNames = results.map((pokemon) => {
        return pokemon.name
    })
    
    const pokemonList = pokemonsNames.map(async (pokemon) => await getPokemonData(pokemon)
    );
    return await Promise.all(pokemonList);
}

async function getPokemonData(name) {
    const response = await fetch([`${baseUrl}pokemon/${name}`]);
    return await response.json([]);
}


// async function getPokemons2() {
//     const response = await fetch(`${baseUrl}pokemon?limit=100&offset=342`)  
//     // offset443
//     const data2 = await response.json([{}])
//     const { results } = data2

//     const pokemonsNames2 = results.map((pokemon) => {
//         return pokemon.name
//     })

//     // console.log(data2)

//     const pokemonList = pokemonsNames2.map(async (pokemon) => await getPokemonData(pokemon)
// );
//     return await Promise.all(pokemonList);

//     async function getPokemonData(name) {
//         const response = await fetch([`${baseUrl}pokemon/${name}`]);
//         return await response.json([]);
//     }
// }


export { getPokemons }
// export { getPokemons2 }
