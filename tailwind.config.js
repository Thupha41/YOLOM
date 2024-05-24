/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        spartan: "League+Spartan",
        cursive: [
          "Cursive",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          '"Open Sans"',
          '"Helvetica Neue"',
          "sans-serif",
        ],
      },
      textShadow: {
        custom: "1px 1px 20px rgba(41, 41, 41, 0.5)",
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
