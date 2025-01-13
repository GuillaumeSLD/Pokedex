export const modalDisplay = () => {
  const modal = document.getElementById("pkm_detail") || document.getElementById("team_modal") || document.getElementById("add_team_modal");
  if (modal) {
    // Check if modal is already opened
    if (modal.classList.contains("modal-open")) {
      return;
    }

    // Open modal
    modal.classList.add("modal-open");

    // Function to close modal
    const closeModal = () => {
      modal.classList.remove("modal-open");
      modal.remove();

      // Remove onModalClick event listener
      modal.removeEventListener("click", onModalClick);
    };

    // Event listener for clicks on modal
    const onModalClick = (event) => {
      const target = event.target;

      // Close modal on .close clicks
      if (target.closest(".close")) {
        closeModal();
      }

      // Close modal on any click outside the modal
      if (!target.closest(".modal-card") && !target.closest(".modal-content")) {
        closeModal();
      }
    };

    // Add onModalClick event listener on modal
    modal.addEventListener("click", onModalClick);
  }
};