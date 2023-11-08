/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    { pattern: /bg-/ },
    "sticky",
    "hidden",
    "lg:inline",
    "lg:max-w-[200px]",
    // { pattern: /max-w/, variants: ["lg", "hover", "lg:hover"] },
    { pattern: /rounded/ },
  ],
  theme: {
    extend: {
      fontFamily: {
        yantramanav: ["var(--font-yantramanav)"],
        archivo_black: ["var(--font-archivo_black)"],
      },
      colors: {
        offWhite: "#F5F3FA",
        trueGray: "#B7A9C6",
        lightGray: "#9D98AD",
        lightBlue: "#3415F4",
        purple: "#6B53C6",
        orange: "#F9562C",
        text: "#765359",
        gold: "#ffd200",
        //----------------------------------------------------------------
        primary: "#3C7240",
        secondary: "#D0D3CF",
        background: "#E7FEDC",
        accent: "#5D5874",
        darkBlue: "#0064a4",
        //----------------------------------------------------------------
      },
      backgroundImage: {},
    },
  },
  plugins: [require("daisyui")],
};
