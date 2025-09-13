/** @type {import('tailwindcss').Config} */
const { COLORS } = require("./theme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,css}"],
  presets: [require("nativewind/preset")],
  theme: { colors: COLORS },
  plugins: [],
};
