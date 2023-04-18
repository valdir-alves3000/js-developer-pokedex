const infoPokemon = document.querySelector("#infoPokemon");
const arrowLeft = document.querySelector("#arrow-left");
const navegation = document.querySelectorAll("nav h2");

arrowLeft.addEventListener("click", resetPokemonCard);

navegation.forEach((element, index) => {
  element.addEventListener("click", () => isActive(index));
});

async function updatePokemon(pokemon) {
  classesPokemonCard(pokemon.type);
  currentPokemon.innerHTML = `
          <span class="name">${pokemon.name}</span>
          <span class="number">#${pokemon.id}</span>

          <div class="detail">
            <ol class="types">
              <span class="type ${pokemon.type}">${pokemon.type}</span>
              <span class="type ${pokemon.type}">poison</span>
            </ol>

            <img
              src="${pokemon.photo}"
              alt="${pokemon.name}"
          </div>
`;

  createAbout(pokemon);
  createBaseState(pokemon);
  await createEvolution(pokemon);
  await createMoves(pokemon);
}

function classesPokemonCard(className) {
  currentPokemon.parentElement.classList.forEach((classNameActive) => {
    currentPokemon.parentElement.classList.remove(classNameActive);
  });
  currentPokemon.parentElement.classList.add("pokemon");
  currentPokemon.parentElement.classList.add(`${className}`);
}

function resetPokemonCard() {
  // const about = document.querySelector("#about");
  resetActive();
  content.classList.remove("hidden");
  pokemonCard.classList.add("hidden");
  navegation[0].classList.add("active");
  // about.classList.remove("hidden");
}

function isActive(index) {
  const ols = infoPokemon.querySelectorAll("ol");

  resetActive();
  navegation[index].classList.add("active");

  index === 0 && ols[index].classList.remove("hidden");
  index === 1 && ols[index].classList.remove("hidden");
  index === 2 && ols[index].classList.remove("hidden");
  index === 3 && ols[index].classList.remove("hidden");
}

function resetActive() {
  const ols = infoPokemon.querySelectorAll("ol");

  for (let i = 0; i < navegation.length; i++) {
    navegation[i].classList =
      "active" && navegation[i].classList.remove("active");
    ols[i].classList.add("hidden");
  }
}
