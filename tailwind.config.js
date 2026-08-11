/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // colore principale: verde scuro (prima era blu navy)
        ink: {
          DEFAULT: "#0F2818",
          light: "#1B3C26",
          dark: "#081A0F",
        },
        // sfondo chiaro
        parchment: "#F3F1E8",
        // colore accento: verde chiaro/lime (prima era oro)
        gold: {
          DEFAULT: "#7FB069",
          light: "#A3D08F",
          dark: "#5C8A47",
        },
        // colori per le "costine" dei libri, tutte varianti di verde
        spine: {
          rust: "#4E7A51",
          moss: "#5C7A5C",
          plum: "#3D6B4F",
          teal: "#2F6B5E",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
