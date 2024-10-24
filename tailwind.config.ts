import type {Config} from "tailwindcss";
import {tailwindPreset} from "./packages/theme/tailwind.preset.js";

const config = {
  presets: [tailwindPreset as unknown as Config],
  darkMode: "class",
  content: [
    "./docs/.vitepress/**/*.{js,ts,vue}",
    "./docs/.vitepress/themes/**/*.{js,ts,vue}",
    "./packages/theme/**/*.{js,ts,vue}",
    "./docs/**/*.md"
  ],
  safelist: [
    {pattern: /^bg-/},
    {pattern: /^text-/},
    {pattern: /^m-/},
    {pattern: /^mx-/},
    {pattern: /^p-/},
    {pattern: /^px-/},
    {pattern: /^gap-/},
    {pattern: /^shadow-/}
  ]
} satisfies Config;

export default config;
