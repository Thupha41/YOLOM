/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily:{
        spartan: "League+Spartan",
      },

      colors: {
        primary: "#fea928",
        secondary: "#ed8900",
        banner: "#F0E5DA",
        upperNavbar: "#2B3C45",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
    },
  },
  plugins: [],
};