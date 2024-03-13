import type {ApiSymbol} from "./interfaces/Api.js";
import {useThemeConfig} from "../config/useThemeConfig.js";

export function useApiLink() {
  const theme = useThemeConfig();
  const url = theme.value.apiRedirectUrl || theme.value.apiUrl;

  return (item: ApiSymbol) => (item.path ? `${url}${item.path.replace(/\/\//gi, "/")}.html` : "");
}
