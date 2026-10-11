import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts,scss,css}", "./build/index.html"],

  theme: {
    extend: {
      backdropBlur: {
        xxs: "1px",
        xs: "2px"
      }
    }
  },

  darkMode: "class",

  plugins: []
} as Config;
