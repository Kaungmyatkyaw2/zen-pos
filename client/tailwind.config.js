/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Barlow",
      },
      colors: {
        dark: "#1F1D2B",
        softdark: "#252836",
        softestdark: "#393C49",
        primary: "#EA7C69",
        secondary: "#9288E0",
        orange: "#FFB572",
      },
      boxShadow: {
        custom: "0px 8px 24px rgba(234, 124, 105, 0.32)",
        dark: "0px 8px 24px rgba(119, 117, 116, 0.32)",
      },
    },
  },
  plugins: [],
};
