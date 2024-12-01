import {useData, withBase} from "vitepress/client";
import type {DefaultTheme} from "vitepress";
import type {CustomThemeConfig} from "./interfaces/CustomThemeConfig";

export function useThemeConfig() {
  const {theme} = useData<DefaultTheme.Config & CustomThemeConfig>();

  if (theme.value?.apiUrl.startsWith("/")) {
    theme.value.apiUrl = withBase(theme.value?.apiUrl);
  }

  return theme;
}
