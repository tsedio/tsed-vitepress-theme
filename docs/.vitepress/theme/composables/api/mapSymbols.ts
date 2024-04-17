import type {ApiResponse} from "./interfaces/Api";

export const SymbolTypes = [
  {
    value: "decorator",
    label: "Decorator",
    code: "@"
  },
  {
    value: "class",
    label: "Class",
    code: "C"
  },
  {
    value: "enum",
    label: "Enum",
    code: "E"
  },
  {
    value: "function",
    label: "Function",
    code: "F"
  },
  {
    value: "interface",
    label: "Interface",
    code: "I"
  },
  {
    value: "const",
    label: "Constant",
    code: "K"
  },
  {
    value: "service",
    label: "Service",
    code: "S"
  },
  {
    value: "type",
    label: "Type alias",
    code: "T"
  }
];

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
