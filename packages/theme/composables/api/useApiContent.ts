import {useFetch} from "@vueuse/core";
import type {ApiResponse} from "./interfaces/Api";
import {useThemeConfig} from "../config/useThemeConfig";

export function useApiContent() {
  const theme = useThemeConfig();

  const apiUrl = theme.value.apiUrl;

  return useFetch<ApiResponse>(apiUrl).get().json();
}
