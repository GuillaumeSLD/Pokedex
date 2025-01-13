// Get container element
export const container = document.getElementById("main-content");

// Get h1 title element
export const h1 = document.querySelector("#main-h1");

// Function to inject content into container element
export const addToContainer = function (fragment) {
  container.innerHTML = "";
  container.appendChild(fragment);
};