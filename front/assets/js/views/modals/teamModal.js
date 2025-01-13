import { teamModalTemplate } from "../../templates.js";
import { getTeam } from "../../api/get.js";
import { updateTeam } from "../../api/patch.js";
import { displayTeams } from "../displayTeams.js";
import { deletePokemonInTeam, deleteTeam } from "../../api/delete.js";
import { modalDisplay } from "./modalEvents.js";

export const teamModal = async function (id) {
  const team = await getTeam(id);

  if (!team) {
    return;
  }

  // Clone template
  const clone = teamModalTemplate.content.cloneNode(true);

  // Edit cloned template with pokemon infos
  clone.querySelector(".team_name").textContent = team.name;
  clone.querySelector(".team_description").textContent = team.description;

  if (team.pokemons) {
    // Helper function to create td element with content
    function createTd(content) {
      const td = document.createElement("td");
      td.textContent = content;
      return td;
    }

    // Function to add a Pokemon row
    function pokemonRow(pokemon, index) {
      const tr = document.createElement("tr");

      // Create an array of Pokemon's attributes
      const pokemonAttributes = [ index, pokemon.name, pokemon.hp, pokemon.atk, pokemon.def, pokemon.atk_spe, pokemon.def_spe, pokemon.speed, pokemon.Types.map(type => type.name).join(", ") ];

      // Loop through Pokemon's attributes
      pokemonAttributes.forEach(pokemonAttribute => {

        // Create a td element for each attribute
        tr.appendChild(createTd(pokemonAttribute));
      });

      // Add a Pokemon's delete icon
      const tdOptions = document.createElement("td");
      const trashIcon = document.createElement("i");
      trashIcon.classList.add("fa", "fa-trash", "delete-pokemon");
      trashIcon.dataset.pokemonId = pokemon.id;
      tdOptions.appendChild(trashIcon);
      tr.appendChild(tdOptions);
      return tr;
    }
    
    // Get tbody element
    const tbody = clone.getElementById("tbody_team");

    // Create a Pokemons fragment
    const pokemonFragment = document.createDocumentFragment();

    // Loop through Pokemons
    team.pokemons.forEach((pokemon, index) => {

      // Create a tr element for each Pokemon
      const tr = pokemonRow(pokemon, index + 1);

      // Append tr element to Pokemon fragment
      pokemonFragment.appendChild(tr);

      // Append Pokemon fragment to tbody element
      tbody.appendChild(pokemonFragment);
    });
  } else {
    const table = clone.querySelector(".pkm-table");
    table.innerHTML = "";
    table.textContent = "Cette équipe est vide pour le moment.";
  }
  document.body.appendChild(clone);

  modalDisplay();

  const modal = document.querySelector("#team_modal");

  // Handle modal edit button
  const editButton = modal.querySelector(".edit");
  const teamEditForm = modal.querySelector("#team-edit-form");
  editButton.addEventListener("click", (event) => {
    teamEditForm.classList.remove("hidden");
  });

  // Set current value in form name input
  modal.querySelector(".input-team-name").value = team.name;

  // Handle edit team name
  teamEditForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = modal.querySelector(".input-team-name").value;
    const teamId = parseInt(team.id, 10);
    const data = { teamId, name };
    await updateTeam(data);
    modal.classList.remove("modal-open");
    modal.remove();
    displayTeams();
  });

  // Handle delete Pokemon from list
  modal.addEventListener("click", async (e) => {
    const deleteButton = e.target.closest(".delete-pokemon");

    if (deleteButton) {
      const pokemonId = deleteButton.dataset.pokemonId;

      const teamId = team.id;

      try {
        // Remove Pokemon
        const deletePokemon = await deletePokemonInTeam(teamId, pokemonId);
        if (!deletePokemon) {
          console.error("Echec de la suppression du Pokemon.");
          return;
        }

        // Remove Pokemon from table
        const pokemonTrElement = deleteButton.closest("tr");
        if (pokemonTrElement) {
          pokemonTrElement.remove();
        }

        // Refresh teams
        displayTeams();
      } catch (error) {
        console.error("Une erreur est survenur dans la suppression du Pokemon :", error);
      }
    }
  });

  // Handle delete team
  modal.addEventListener("click", async (e) => {
    const deleteButton = e.target.closest(".delete-team");

    if (deleteButton) {
      try {
        const destroyTeam = await deleteTeam(team.id);
        if (!destroyTeam) {
          console.error("Echec de la suppression de la liste.");
          return;
        }
        // Close modal
        modal.classList.remove("modal-open");

        // Remove modal
        modal.remove();

        // Refresh teams
        displayTeams();
      } catch (error) {
        console.error("Une erreur est survenur dans la suppression de la liste :", error);
      }
    }
  });
};