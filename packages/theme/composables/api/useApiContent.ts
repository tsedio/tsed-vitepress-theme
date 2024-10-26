import {useFetch} from "@vueuse/core";
import type {ApiResponse} from "./interfaces/Api";
import {useThemeConfig} from "../config/useThemeConfig";

export function mapSymbol(symbol: any) {
  return {
    ...symbol,
    // additional properties for the Api search tools
    name: symbol.symbolName,
    type: symbol.symbolType,
    tags: symbol.status.join(","),
    labels: symbol.status
  };
}

export function useApiContent() {
  const theme = useThemeConfig();
  const apiUrl = theme.value.apiUrl;

  return useFetch<ApiResponse>(apiUrl, {
    afterFetch(ctx) {
      ctx.data.modules = Object.fromEntries(Object.entries(ctx.data.modules)
        .map(([key, item]: [string, any]) => {

          const symbols = new Map();

          item.symbols.forEach((symbol: any) => {
            symbol = mapSymbol(symbol);
            symbols.set(symbol.symbolName, symbol);
          });

          item.symbols = [...symbols.values()];

          return [key, item];
        }));

      return ctx;
    }
  }).get().json<ApiResponse>();
}
