import type {ApiSymbol} from "./interfaces/Api.js";
import {useApiConfig} from "./useApiConfig.js";

export function useApiLink() {
  const theme = useApiConfig();
  const url = theme.value.apiRedirectUrl || theme.value.apiUrl;

  return (item: ApiSymbol) => (item.path ? `${url}${item.path.replace(/\/\//gi, "/")}.html` : "");
}
