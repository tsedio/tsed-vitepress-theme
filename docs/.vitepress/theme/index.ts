// https://vitepress.dev/guide/custom-theme
import {DefaultTheme} from "@tsed/vitepress-theme";
import type {Theme} from "vitepress";

export default {
  extends: DefaultTheme,
  enhanceApp() {}
} satisfies Theme;
