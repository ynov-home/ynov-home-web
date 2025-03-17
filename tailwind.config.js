/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // ✅ Active Tailwind pour tous les fichiers React
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6", // Bleu électrique
        accent: "#9333EA", // Violet néon
        background: "#111827", // Noir futuriste
        card: "#1F2937", // Gris foncé
        text: "#F9FAFB", // Blanc pur
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // ✅ Police moderne
      },
    },
  },
  plugins: [],
};
