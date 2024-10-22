import {useData} from "vitepress/client";
import type {DefaultTheme} from "vitepress";
import type {CustomThemeConfig} from "./interfaces/CustomThemeConfig";

export function useThemeConfig() {
  const {theme} = useData<DefaultTheme.Config & CustomThemeConfig>();

  return theme;
}
