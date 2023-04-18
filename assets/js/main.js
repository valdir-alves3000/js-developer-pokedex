const content = document.querySelector("#content");
const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const pokemonCard = document.querySelector("#pokemonCard");
const currentPokemon = document.querySelector("#currentPokemon div");

const maxRecords = 250;
const limit = 10;
let offset = 0;

function handlePokemon(pokemon) {
  content.classList.add("hidden");
  pokemonCard.classList.remove("hidden");
  updatePokemon(pokemon);
}

function convertPokemonToLi(pokemon) {
  const li = document.createElement("li");
  li.classList.add("pokemon", pokemon.type);
  const pokemonHtml = `
            <span class="number">#${pokemon.id}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>`;

  li.innerHTML = pokemonHtml;
  li.addEventListener("click", () => handlePokemon(pokemon));

  return li;
}

async function loadPokemonItens(offset, limit) {
  await pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newElements = pokemons.map(convertPokemonToLi);
    newElements.forEach((pokemon) => pokemonList.appendChild(pokemon));
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
