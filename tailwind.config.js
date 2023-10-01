/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: "#fec786",
        primary: "#3C7240",
        secondary: "#D0D3CF",
        background: "#E7FEDC",
        accent: "#5D5874",
        lightBlue: "#6aa2b8",
        darkBlue: "#0064a4",
        gold: "#ffd200",
        lightGray: "#c6beb5",
        darkGray: "#555759",
        purple: "#1b3d6d",
        trueGray: "#ecedf0",
        offWhite: "#E7FEDC",
        text: "#0C2301",
      },
      backgroundImage: {},
    },
  },
  plugins: [require("daisyui")],
};
