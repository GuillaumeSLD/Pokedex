import { typeTemplate } from "../templates.js";
import { getTypes } from "../api/get.js";
import { container, h1, addToContainer } from "../utils.js";

// Function to display types
export async function displayTypes() {
  const types = await getTypes();

  if (!types) {
    return;
  }

  // Create a fragment
  const fragment = document.createDocumentFragment();

  // h1 title
  h1.textContent = "Les types";

  // Loop through types
  types.forEach((type) => {
    // Clone template
    const clone = typeTemplate.content.cloneNode(true);

    // Get Pokemon type button
    const pokemonTypeButton = clone.querySelector(".pkm_type_button");

    // Edit cloned template with type infos
    pokemonTypeButton.textContent = type.name;
    pokemonTypeButton.style.backgroundColor = `#${type.color}`;
    pokemonTypeButton.dataset.id = type.id;

    // Append types
    fragment.appendChild(clone);
  });

  // Inject fragment into DOM
  addToContainer(fragment);

  // Modify container flex alignment
  container.classList.remove("is-justify-content-space-between");
}