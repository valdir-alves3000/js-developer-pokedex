function createAbout(pokemon) {
  const about = document.querySelector("#about");
  about.innerHTML = "";
  about.classList.remove("hidden");

  about.innerHTML = `     
            <li>
              <span>Species</span>
              <strong>${pokemon.name}</strong>
            </li>

            <li>
              <span>Height</span>
              <strong>${pokemon.height} cm</strong>
            </li>

            <li>
              <span>Weight</span>
              <strong>${pokemon.weight / 10} kg</strong>
            </li>

            <li>
              <span>Abilities</span>
              <strong>
               ${pokemon.abilities.map((ability) => `${ability}`).join(", ")}
              </strong>
            </li>         
  `;
}
