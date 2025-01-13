/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ["./*.html", "./assets/js/*.js"],
  daisyui: {
    themes: [
      {
        custom: {
          "primary": "#3D7DCA", // Changez la couleur primaire
          "secondary": "#004581", // Changez la couleur secondaire si nécessaire
          "accent": "#F59E0B", // Vous pouvez aussi changer la couleur d'accent
          "neutral": "#1F2937", // Couleur neutre
          "base-100": "#ffffff", // Couleur de fond de base
          "base-200": "#F0F4F8", // Couleur de fond secondaire
          "text": "#333333", // Changer ici pour la couleur du texte par défaut (comme `text-gray-800`)
          // Ajoutez d'autres personnalisations selon vos besoins
        },
      },
    ],
  },
  plugins: [
    require("daisyui")
  ],
};
