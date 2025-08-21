/** @type {import('tailwindcss').Config} */
export const content = ["./{app,component}/**/*.{js,jsx,ts,tsx}"];

export const presets = [require("nativewind/preset")];

export const theme = {
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
};

export const plugins = [];
