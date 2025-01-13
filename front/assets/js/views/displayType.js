import { pokemonCardTemplate } from "../templates.js";
import { getType } from "../api/get.js";
import { container, addToContainer } from "../utils.js";

// Function to display type details
export async function displayType(id) {
  const typeDetails = await getType(id);

  if (!typeDetails) {
    return;
  }

  // Create a fragment
  const fragment = document.createDocumentFragment();

  // h1 title
  const typeNameHeader = document.querySelector("#main-h1");
  typeNameHeader.textContent = `Pokémons de type ${typeDetails.typeName}`;

  // Check if there are no pokemons for this type
  if (!typeDetails.pokemons || typeDetails.pokemons.length === 0) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = `Aucun Pokémon trouvé pour le type ${typeDetails.typeName}`;
    fragment.appendChild(errorMessage);
  } else {
    // Loop through pokemons and display their cards
    typeDetails.pokemons.forEach((pokemon) => {
      // Clone template
      const clone = pokemonCardTemplate.content.cloneNode(true);

      // Edit cloned template with pokemon info
      clone.querySelector(".card").dataset.target = "modal";
      clone.querySelector(".card").dataset.id = pokemon.id;
      clone.querySelector(".pkm_img").src = `./assets/img/${pokemon.id}.webp`;
      clone.querySelector(".pkm_img").alt = pokemon.name;
      clone.querySelector(".card-content p").textContent = pokemon.name;

      // Append each pokemon card to the fragment
      fragment.appendChild(clone);
    });
  }

  // Inject fragment into DOM
  addToContainer(fragment);

  // Modify container flex alignment
  container.classList.add("is-justify-content-space-between");
}