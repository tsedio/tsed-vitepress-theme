import type {Config} from "tailwindcss";
import colors from "tailwindcss/colors";

const primary = "hsla(208, 100%, 43%, 1)";

export const tailwindPreset: Partial<Config> = {
  theme: {
    colors: {
      ...colors,

      blue: {
        DEFAULT: primary,
        default: primary,
        50: "hsla(208, 100%, 91%, 1)",
        100: "hsla(208, 100%, 83%, 1)",
        200: "hsla(208, 100%, 75%, 1)",
        300: "hsla(208, 100%, 67%, 1)",
        400: "hsla(208, 100%, 59%, 1)",
        500: "hsla(208, 100%, 51%, 1)",
        600: primary,
        700: "hsla(208, 100%, 35%, 1)",
        800: "hsla(208, 100%, 27%, 1)",
        900: "hsla(208, 100%, 19%, 1)",
        active: "hsla(190, 81%, 42%, 1)"
      },
      // white: "hsla(0, 100%, 100%, 1)", // #ffffff
      // "white-active": "hsla(190, 81%, 42%, 1)",
      // "white-button": "hsla(0, 100%, 100%, 1)", // #ffffff
      // "white-button-active": "hsla(0, 100%, 100%, 1)",

      // code: "hsla(245, 17%, 29%, 1)",
      // "code-active": "hsla(246, 17%, 25%, 1)",

      // api
      "api-default": "#507192"
      // "gray-xxl": "#2c3e50",
      // "line-even": "hsla(195, 22%, 96%, 1)",
    },
    extend: {
      fontSize: {
        micro: ".5rem", // 8px
        xxs: ".625rem", // 10px
        xs: ".75rem" // 12px
      },
      borderRadius: {
        xs: ".15rem", // 5px
        md: "1rem"
      },
      fontFamily: {
        brand: ["Source Sans Pro", "sans-serif"],
        sans: ["Source Sans Pro", "sans-serif"],
        serif: ["Source Sans Pro", "sans-serif"],
        inconsolata: ["Inconsolata"],
        source: ["source-code-pro", "Menlo", "Monaco", "Consolas", "Courier New", "monospace"]
      }
    }
  }
};
