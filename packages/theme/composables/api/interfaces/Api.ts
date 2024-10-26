export type ApiSymbolType = "interface" | "decorator" | "class" | "type" | "enum" | "const" | "function" | "service";
export type ApiSymbolStatus = "stable" | "deprecated" | "experimental" | "private" | "public";

export interface ApiSymbol {
  path?: string;
  symbolName: string;
  symbolType: ApiSymbolType;
  status: ApiSymbolStatus[];
  module: string;
  symbolLabel: string;
  symbolCode: string;
}

export interface ApiResponse {
  symbolTypes: { label: string; value: string; }[];
  modules: Record<
    string,
    {
      name?: string;
      symbols: ApiSymbol[];
    }
  >;
}
