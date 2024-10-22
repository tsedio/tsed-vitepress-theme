import {useData} from "vitepress/client";
import type {DefaultTheme} from "vitepress";
import type {CustomThemeConfig} from "./interfaces/CustomThemeConfig";

export function useFrontMatter() {
  const {frontmatter} = useData<DefaultTheme.Config & CustomThemeConfig>();

  return frontmatter;
}
