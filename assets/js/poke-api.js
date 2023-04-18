const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.id = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;
  pokemon.types = types;
  pokemon.type = type;

  const abilities = pokeDetail.abilities.map((ability) => ability.ability.name);
  pokemon.abilities = abilities;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  pokemon.height = pokeDetail.height;
  pokemon.weight = pokeDetail.weight;
  pokemon.speciesUrl = pokeDetail.species.url;

  const hpStat = pokeDetail.stats.find((stat) => stat.stat.name === "hp");
  pokemon.hp = hpStat.base_stat;

  const attackStat = pokeDetail.stats.find(
    (stat) => stat.stat.name === "attack"
  );
  pokemon.attack = attackStat.base_stat;

  const defenseStat = pokeDetail.stats.find(
    (stat) => stat.stat.name === "defense"
  );
  pokemon.defense = defenseStat.base_stat;

  const specialAttackStat = pokeDetail.stats.find(
    (stat) => stat.stat.name === "special-attack"
  );
  pokemon.specialAttack = specialAttackStat.base_stat;

  const specialDefenseStat = pokeDetail.stats.find(
    (stat) => stat.stat.name === "special-defense"
  );
  pokemon.specialDefense = specialDefenseStat.base_stat;

  const speedStat = pokeDetail.stats.find((stat) => stat.stat.name === "speed");
  pokemon.speed = speedStat.base_stat;

  const moves = pokeDetail.moves.map((move) => move.move.name);
  pokemon.moves = moves;

  return pokemon;
}

pokeApi.getPokemonEvolution = (id) => {
  const url = `https://pokeapi.co/api/v2/evolution-chain/${id}`;
  return fetch(url).then((response) => response.json());
};

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
};
