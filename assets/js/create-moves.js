function createMoves(pokemon) {
  const moves = document.querySelector("#moves");
  moves.innerHTML = "";
  moves.classList.add("hidden");
  moves.classList.add("moves");

  for (let i = 0; i < 12; i++) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const text = document.createTextNode(pokemon.moves[i]);

    span.appendChild(text);
    li.appendChild(span);

    moves.appendChild(li);
  }
}
