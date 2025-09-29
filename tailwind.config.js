/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        base: {
          100: "#A8B5DB",
          200: "#D6C7FF",
          300: "#AB8BFF",
          400: "#221F3D",
          500: "#0F0D23",
          600: "#030014",
          text: "#9CA4AB",
        },
      },
    },
  },
  plugins: [],
};
