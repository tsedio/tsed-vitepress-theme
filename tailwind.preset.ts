import type {Config} from "tailwindcss";
import colors from "tailwindcss/colors";

const primary = "var(--vp-button-brand-bg)";

export const tailwindPreset: Partial<Config> = {
  theme: {
    colors: {
      ...colors,
      blue: {
        DEFAULT: primary,
        default: primary,
        50: "hsla(226, 54.3%, 91%, 1)",
        100: "hsla(226, 54.3%, 83%, 1)",
        200: "hsla(226, 54.3%, 75%, 1)",
        300: "hsla(226, 54.3%, 67%, 1)",
        400: "hsla(226, 54.3%, 59%, 1)",
        500: "hsla(226, 54.3%, 61%, 1)",
        600: primary,
        700: "hsla(226, 54.3%, 31%, 1)",
        800: "hsla(226, 54.3%, 25%, 1)",
        900: "hsla(226, 54.3%, 14%, 1)",
        active: "var(--vp-button-brand-hover-bg)"
      },
      algoliaSearch: {
        white: "rgb(243 244 246 / 1)",
        dark: "rgb(28 30 33 / 1)"
      },
      "api-default": "#507192"
    },
    extend: {
      fontSize: {
        micro: ".5rem", // 8px
        xxs: ".625rem", // 10px
        xs: ".75rem" // 12px
      },
      borderRadius: {
        xs: ".15rem" // 5px
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
