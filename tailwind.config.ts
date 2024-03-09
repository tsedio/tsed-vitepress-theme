import type {Config} from "tailwindcss";
import {tailwindPreset} from "./tailwind.preset.js";

const config = {
  presets: [tailwindPreset as unknown as Config],
  darkMode: "class",
  content: ["./docs/.vitepress/**/*.{js,ts,vue}", "./docs/**/*.md"]
} satisfies Config;

export default config;
