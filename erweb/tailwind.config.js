/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primarygray: "#f8f8f8",
        qblack: "#222222",
        qgreen: "#2D6F6D",
        qred: "#EF262C",
        qgray: "#797979",
        qblacktext: "#1D1D1D",
        qgraytwo: "#8E8E8E",
        "qgray-border": "#EFEFEF",
        "qblue-white": "#CBECFF",
        "qh5-bwhite": "#95D7DE",
        "qh3-blue": "#1868D5",
      },
      scale: {
        60: "0.6",
      },
    },
  },
  plugins: [],
});
