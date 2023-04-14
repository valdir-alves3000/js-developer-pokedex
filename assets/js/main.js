const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function handlePokemon(pokemon) {
  pokemonList.style.display = "flex";
  pokemonList.style.justifyContent = "center";
  pokemonList.innerHTML = "";

  const li = document.createElement("li");
  li.className = `pokemon ${pokemon.type}`;
  li.style.width = "50%";
  li.style.height = "600px";

  const pokemonHtml = `
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>

    <div class="detail">
      <ol class="types">
        ${pokemon.types
          .map((type) => `<li class="type ${type}">${type}</li>`)
          .join("")}
      </ol>

      <img src="${pokemon.photo}" alt="${pokemon.name}">
    </div>
  `;

  // Set the HTML for the new li element and add it to the list
  li.innerHTML = pokemonHtml;
  pokemonList.appendChild(li);
}

function convertPokemonToLi(pokemon) {
  const li = document.createElement("li");
  li.classList.add("pokemon", pokemon.type);
  const pokemonHtml = `
            <span class="number">#${pokemon.number}</span>
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

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
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
