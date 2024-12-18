import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts,scss,css}", "./build/index.html"],

  theme: {
    extend: {}
  },

  darkMode: "class",

  plugins: []
} as Config;
