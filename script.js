const sprite = document.getElementById("sprite");
const hpElement = document.getElementById("hp");
const attackElement = document.getElementById("attack");
const defenseElement = document.getElementById("defense");
const spattackElement = document.getElementById("special-attack");
const spdefenseElement = document.getElementById("special-defense");
const speedElement = document.getElementById("speed");
const typesElement = document.getElementById("types");
const weightElement = document.getElementById("weight");
const heightElement = document.getElementById("height");
const nameElement = document.getElementById("pokemon-name");
const pidElement = document.getElementById("pokemon-id");

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", () => {
  const userInput = document.getElementById("search-input").value.toLowerCase();
  if (userInput === "red") {
    alert("Pokémon not found");
  } else {
    getChar(userInput);
  }
});

async function getChar(user) {
  try {
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${user}`
    );
    if (!response.ok) {
      throw new Error("Pokémon not found");
    }
    const pokemonData = await response.json();

    // Update DOM elements with Pokémon data
    sprite.src = pokemonData.sprites.front_default;
    pidElement.textContent = `#${pokemonData.id}`;
    nameElement.textContent = pokemonData.name.toUpperCase();
    weightElement.textContent = `Weight: ${pokemonData.weight}`;
    heightElement.textContent = `Height: ${pokemonData.height}`;

    hpElement.textContent = pokemonData.stats.find(
      (stat) => stat.stat.name === "hp"
    ).base_stat;
    attackElement.textContent = pokemonData.stats.find(
      (stat) => stat.stat.name === "attack"
    ).base_stat;
    defenseElement.textContent = pokemonData.stats.find(
      (stat) => stat.stat.name === "defense"
    ).base_stat;
    spattackElement.textContent = pokemonData.stats.find(
      (stat) => stat.stat.name === "special-attack"
    ).base_stat;
    spdefenseElement.textContent = pokemonData.stats.find(
      (stat) => stat.stat.name === "special-defense"
    ).base_stat;
    speedElement.textContent = pokemonData.stats.find(
      (stat) => stat.stat.name === "speed"
    ).base_stat;

    // Update types
    typesElement.innerHTML = ""; // Clear previous types
    pokemonData.types.forEach((typeInfo) => {
      const typeElement = document.createElement("span");
      typeElement.textContent = typeInfo.type.name.toUpperCase();
      typesElement.appendChild(typeElement);
    });
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    alert("Pokémon not found");
  }
}
