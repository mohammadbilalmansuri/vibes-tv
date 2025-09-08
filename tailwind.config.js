/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,css}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        default: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e8e8ea",
          300: "#dcdce0",
          400: "#d4d4d8",
          500: "#a1a1aa",
          600: "#46484e",
          700: "#383b43",
          800: "#2d3138",
          900: "#23262d",
          950: "#1c2027",
          accent: "#f3506c",
        },
      },
    },
  },
  plugins: [],
};
