import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}", "./build/index.html"],

  theme: {
    extend: {}
  },

  darkMode: "class",

  plugins: []
} as Config;
