import { pokemonModalTemplate } from "../../templates.js";
import { getPokemon, getTeams } from "../../api/get.js";
import { putPokemonInTeam } from "../../api/put.js";
import { modalDisplay } from "./modalEvents.js";

export const pokemonModal = async function (id) {
  const pokemon = await getPokemon(id);

  if (!pokemon) {
    return;
  }

  // Clone template
  const clone = pokemonModalTemplate.content.cloneNode(true);

  // Edit cloned template with pokemon infos
  clone.querySelector(".pkm_name").textContent = pokemon.name;
  clone.querySelector(".pkm_img_modal").src = `assets/img/${pokemon.id}.webp`;
  clone.querySelector(".pkm_img_modal").alt = pokemon.name;
  clone.querySelector(".pkm_stats_modal .pkm_hp progress").value = pokemon.hp;
  clone.querySelector(".pkm_stats_modal .pkm_atk progress").value = pokemon.atk;
  clone.querySelector(".pkm_stats_modal .pkm_def progress").value = pokemon.def;
  clone.querySelector(".pkm_stats_modal .pkm_atk_spe progress").value = pokemon.atk_spe;
  clone.querySelector(".pkm_stats_modal .pkm_def_spe progress").value = pokemon.def_spe;
  clone.querySelector(".pkm_stats_modal .pkm_speed progress").value = pokemon.speed;

  const teamSelectElement = clone.querySelector(".select");

  const teamFragment = document.createDocumentFragment();

  // Get all teams
  const teams = await getTeams();

  teams.forEach((team) => {
    const option = document.createElement("option");
    option.textContent = team.name;
    option.value = team.id;
    teamFragment.appendChild(option);
  });

  teamSelectElement.appendChild(teamFragment);

  document.body.appendChild(clone);

  modalDisplay();

  const modal = document.querySelector("#pkm_detail");

  const addPokemonToTeamForm = modal.querySelector("#form_add_pkm_team");
  const modalFooter = modal.querySelector(".modal-card-foot");

  // Function to add Pokemon to a team
  const handleAddPokemonToTeam = async (e) => {
    e.preventDefault();

    // Get selected team name and id
    const selectElement = modal.querySelector(".select");
    const teamName = selectElement.options[selectElement.selectedIndex].text;
    const teamId = selectElement.value;
    
    // Remove any existing status message
    const existingMessage = modalFooter.querySelector("p");
    if (existingMessage) {
      existingMessage.remove();
    }

    try {
      // Add Pokemon to team
      const addToTeam = await putPokemonInTeam(teamId, pokemon.id);

      // Create new status message
      const messageElement = document.createElement("p");
      if (addToTeam && addToTeam.id) {
        messageElement.className = "has-text-success has-text-weight-semibold";
        messageElement.textContent = `${pokemon.name} a bien été ajouté à la liste ${teamName}.`;
      } else {
        messageElement.className = "has-text-danger has-text-weight-semibold";
        messageElement.textContent = `Erreur : ${addToTeam}`;
      }
      modalFooter.appendChild(messageElement);
    } catch (error) {
      const errorMessage = document.createElement("p");
      errorMessage.className = "has-text-danger has-text-weight-semibold";
      errorMessage.textContent = `Error: ${error.message}`;
      modalFooter.appendChild(errorMessage);
    }
  };

  // Remove any existing event listeners and add the new one
  addPokemonToTeamForm.removeEventListener("submit", handleAddPokemonToTeam);

  // Add event listner on addPokemonToTeamForm
  addPokemonToTeamForm.addEventListener("submit", handleAddPokemonToTeam);
};