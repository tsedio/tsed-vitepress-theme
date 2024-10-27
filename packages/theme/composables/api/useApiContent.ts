import {useFetch, type UseFetchReturn} from "@vueuse/core";
import type {ApiResponse} from "./interfaces/Api";
import {useThemeConfig} from "../config/useThemeConfig";
import {mapApiReferences} from "./mappers/mapApiReferences.js";

let cache: UseFetchReturn<ApiResponse> | null = null;

export function useApiContent() {
  const theme = useThemeConfig();
  const apiUrl = theme.value.apiUrl;

  return cache || (cache = useFetch<ApiResponse>(apiUrl, {
    afterFetch(ctx) {

      ctx.data = mapApiReferences(ctx.data);

      return ctx;
    }
  }).get().json<ApiResponse>());
}
