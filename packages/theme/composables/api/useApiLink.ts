import type {ApiSymbol} from "./interfaces/Api";
import {useThemeConfig} from "../config/useThemeConfig";

export function useApiLink() {
  const theme = useThemeConfig();
  const url = theme.value.apiRedirectUrl || theme.value.apiUrl;

  return (item: ApiSymbol) => (item.path ? `${url}${item.path.replace(/\/\//gi, "/")}.html` : "");
}
