import type {ApiResponse} from "./interfaces/Api";

export function mapSymbols(items: ApiResponse) {
  return Object.values(items.modules).reduce((symbols: any[], current) => {
    return [
      ...symbols,
      ...current.symbols.map((symbol) => {
        return {
          ...symbol,
          // additional properties for the Api search tools
          name: symbol.symbolName,
          type: symbol.symbolType,
          tags: symbol.status.join(","),
          labels: symbol.status
        };
      })
    ];
  }, []);
}
