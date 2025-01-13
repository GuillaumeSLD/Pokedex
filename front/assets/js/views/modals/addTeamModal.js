import { addTeamModalTemplate } from "../../templates.js";
import { addTeam } from "../../api/post.js";
import { displayTeams } from "../displayTeams.js";
import { modalDisplay } from "./modalEvents.js";

export const addTeamModal = async function () {
    // Clone template
    const clone = addTeamModalTemplate.content.cloneNode(true);
  
    // Add modal to DOM
    document.body.appendChild(clone);
  
    modalDisplay();

    // Get modal element
    const modal = document.querySelector("#add_team_modal");
  
    // Get modal form
    const modalForm = document.getElementById("form_team_modal");
  
    // Handle form submission
    modalForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("form-team-name").value;
      const description = document.getElementById("form-team-description").value;
      const data = { name, description };
      await addTeam(data);
      modal.classList.remove("modal-open");
      modal.remove();
      displayTeams();
    });
  };