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
        lightBlue: "#6aa2b8",
        darkBlue: "#0064a4",
        gold: "#ffd200",
        lightGray: "#c6beb5",
        darkGray: "#555759",
        purple: "#1b3d6d",
        trueGray: "#ecedf0",
        offWhite: "#f6f2eb",
        text: "#443e36",
      },
      backgroundImage: {},
    },
  },
  plugins: [require("daisyui")],
};
