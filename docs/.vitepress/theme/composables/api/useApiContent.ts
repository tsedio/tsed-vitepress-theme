import {useFetch} from "@vueuse/core";
import type {ApiResponse} from "./interfaces/Api";
import {useApiConfig} from "./useApiConfig.js";

export function useApiContent() {
  const theme = useApiConfig();

  const apiUrl = theme.value.apiUrl;

  return useFetch<ApiResponse>(apiUrl).get().json();
}
