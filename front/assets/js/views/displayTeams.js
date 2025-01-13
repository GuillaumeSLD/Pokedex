import { teamsTemplate } from "../templates.js";
import { getTeams } from "../api/get.js";
import { h1, addToContainer } from "../utils.js";

// Function to display teams
export async function displayTeams() {
  const teams = await getTeams();

  if (!teams) {
    return;
  }

  // Create a main fragment
  const mainFragment = document.createDocumentFragment();

  // h1 title
  h1.textContent = "Les équipes";

  // Loop through teams
  teams.forEach((team) => {
    // Clone template
    const clone = teamsTemplate.content.cloneNode(true);

    // Edit cloned template with team's infos
    clone.querySelector(".team-name").textContent = team.name;
    clone.querySelector(".team-description").textContent = team.description;
    clone.querySelector(".btnModalTeam").dataset.target = "modal";
    clone.querySelector(".btnModalTeam").dataset.id = team.id;

    const pokemonsImgContainer = clone.querySelector(".imgContainer");

    const pokemonFragment = document.createDocumentFragment();

    team.Pokemons.forEach((pokemon) => {
      // Create figure element for the pokemon
      const pokemonImgElement = document.createElement("figure");
      pokemonImgElement.classList.add("image", "is-64x64", "mx-2");

      // Create img element for the pokemon
      const img = document.createElement("img");
      img.src = `assets/img/${pokemon.id}.webp`;
      img.alt = pokemon.name;
      img.classList.add("is-rounded");
    
      // Add img to figure
      pokemonImgElement.appendChild(img);
    
      // Add figure to Pokemon's fragment
      pokemonFragment.appendChild(pokemonImgElement);
    });
    
    // Add Pokemon's fragment to Pokemon's img container
    pokemonsImgContainer.appendChild(pokemonFragment);    
    
    // Add cloned and modified template to main fragment
    mainFragment.appendChild(clone);
  });

  // Inject main fragment into DOM
  addToContainer(mainFragment);
}