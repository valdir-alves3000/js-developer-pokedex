async function createEvolution(pokemon) {
  const evolution = document.querySelector("#evolution");
  evolution.innerHTML = "";
  evolution.classList.add("hidden");
  evolution.classList.add("evolution");

  const id = Math.ceil(pokemon.id / 3);
  const pokemonChain = await pokeApi.getPokemonEvolution(id);
  const urlImg =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";

  evolution.innerHTML = `
            <li>                         
            <div class="evolution">
                <div class="img-group">
                  <div class="img">
                    <img src="${urlImg}/${id * 3 - 2}.svg" alt="">
                  </div>
                  <p>${pokemonChain.chain.species.name}</p>
                </div>
              <i class="fa fa-arrow-right"></i>

              <div class="img-group">
                <div class="img" >
                  <img src="${urlImg}/${id * 3 - 1}.svg" alt="">
                </div>
                <p>${pokemonChain.chain.evolves_to[0].species.name}</p>
              </div>
              <i class="fa fa-arrow-right"></i>

              <div class="img-group">
                <div class="img">
                  <img src="${urlImg}/${id * 3}.svg" alt="">
                </div>
                <p>${
                  pokemonChain.chain.evolves_to[0].evolves_to[0].species.name
                }</p>
              </div>
            </div>
            </li>
  `;
}
