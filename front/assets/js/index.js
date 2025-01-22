import { displayPokemons } from "./views/displayPokemons.js";
import { displayTypes } from "./views/displayTypes.js";
import { displayType } from "./views/displayType.js";
import { displayTeams } from "./views/displayTeams.js";
import { pokemonModal } from "./views/modals/pokemonModal.js";
import { teamModal } from "./views/modals/teamModal.js";
import { addTeamModal } from "./views/modals/addTeamModal.js";

const container = document.getElementById("app");

document.addEventListener("DOMContentLoaded", () => {
    // Display Pokemons on load
    displayPokemons();

    // Display Pokemons on home nav link click
    document.getElementById("nav-item-home").addEventListener("click", (event) => {
      displayPokemons();
    });
  
    // Display Pokemons on types nav link click
    document.getElementById("nav-item-type").addEventListener("click", (event) => {
      displayTypes();
    });

    // Display teams on nav link click
    document.getElementById("nav-item-team").addEventListener("click", (event) => {
      displayTeams();
    });

    // Display add team modol on nav link click
    document.getElementById("nav-item-add-team").addEventListener("click", (event) => {
      addTeamModal();
    });
  
    // Handle Pokemon's modal creation
    container.addEventListener("click", (event) => {
      const card = event.target.closest(".pkm-card"); // Find clicked card
      if (card) {
        const pokemonId = card.dataset.id; // Get Pokemon id from dataset
        pokemonModal(pokemonId); // Create modal
      }
    });
  
    // Display type's details on type button click
    container.addEventListener("click", (event) => {
      const typeButton = event.target.closest(".pkm_type_button"); // Find clicked Pokemon type button
      if (typeButton) {
        const typeButtonId = typeButton.dataset.id; // Get type button id from dataset
        displayType(typeButtonId);
      }
    });

    // Handle team's modal management creation
    container.addEventListener("click", (event) => {
      const btnModalTeam = event.target.closest(".btnModalTeam"); // Find clicked card
      if (btnModalTeam) {
        const teamId = btnModalTeam.dataset.id; // Get Pokemon id from dataset
        teamModal(teamId); // Create modal
      }
    });
    
});