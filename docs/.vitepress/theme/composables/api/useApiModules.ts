import {useApiContent} from "./useApiContent.js";

export interface UseApiModulesOptions {
  currentType?: string;
  currentStatus?: string;
  keyword?: string;
}

export function useApiModules({currentType, currentStatus, keyword}: UseApiModulesOptions) {
  const {data} = useApiContent();

  if (!data.value.modules) {
    return {};
  }

  const modules = data.value.modules;

  return Object.keys(modules)
    .sort((a, b) => (a < b ? -1 : 1))
    .reduce((acc, key) => {
      const symbols = modules[key].symbols.filter((symbol) => {
        if (currentType && symbol.symbolType !== currentType) {
          return false;
        }

        if (currentStatus && symbol.status.indexOf(currentStatus)) {
          return false;
        }

        if (keyword) {
          return symbol.symbolName.toLowerCase().indexOf(keyword.toLocaleLowerCase()) > -1;
        }

        return true;
      });

      acc[key] = {...modules[key], symbols};

      return acc;
    }, {});
}
