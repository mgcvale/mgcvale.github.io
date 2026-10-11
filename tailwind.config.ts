import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts,scss,css}", "./build/index.html"],

  theme: {
    extend: {
      backdropBlur: {
        xxs: "1px",
        xs: "2px"
      },
      keyframes: {
        "menu-open": {
          from: { opacity: "0", transform: "scale(0)" },
          to: { opacity: "1", transform: "scale(1)" }
        }
      },
      animation: {
        "menu-open": "menu-open 200ms cubic-bezier(0.22, 1, 0.36, 1)"
      }
    }
  },

  darkMode: "class",

  plugins: []
} as Config;
