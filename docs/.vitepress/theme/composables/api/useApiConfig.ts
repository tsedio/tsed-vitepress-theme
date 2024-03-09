import {useData} from "vitepress/client";
import type {DefaultTheme} from "vitepress";
import type {ApiConfig} from "./interfaces/Api";

export function useApiConfig() {
  const {theme} = useData<DefaultTheme.Config & ApiConfig>();

  return theme;
}
