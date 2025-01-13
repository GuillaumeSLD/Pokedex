import { pokemonCardTemplate } from "../templates.js";
import { getPokemons } from "../api/get.js";
import { container, h1, addToContainer } from "../utils.js";

// Function to display pokemons
export async function displayPokemons() {
  const pokemons = await getPokemons();

  if (!pokemons) {
    return;
  }

  // Create a fragment
  const fragment = document.createDocumentFragment();

  // h1 title
  h1.textContent = "Les Pokémons";

  // Loop through pokemons
  pokemons.forEach((pokemon) => {
    // Clone template
    const clone = pokemonCardTemplate.content.cloneNode(true);

    // Edit cloned template with pokemon infos
    clone.querySelector(".card").dataset.target = "modal";
    clone.querySelector(".card").dataset.id = pokemon.id;
    clone.querySelector(".pkm_img").src = `assets/img/${pokemon.id}.webp`;
    clone.querySelector(".pkm_img").alt = pokemon.name;
    clone.querySelector(".card-content p").textContent = pokemon.name;

    fragment.appendChild(clone);
  });

  // Inject fragment into DOM
  addToContainer(fragment);

  // Modify container flex alignment
  container.classList.add("is-justify-content-space-between");
}