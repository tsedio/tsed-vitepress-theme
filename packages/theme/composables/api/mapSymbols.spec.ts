import {mapSymbols} from "./mapSymbols";
import type {ApiResponse} from "./interfaces/Api";

describe("Map Symbols", () => {
  it("should map symbols", () => {
    const data = {
      modules: {
        "@tsed/core": {
          symbols: [
            {
              path: "/api/core/types/decorators/Configurable",
              symbolName: "Configurable",
              module: "@tsed/core",
              symbolType: "decorator",
              symbolLabel: "Decorator",
              symbolCode: "@",
              status: ["stable"]
            }
          ]
        }
      }
    } satisfies ApiResponse;

    const result = mapSymbols(data);

    expect(result).toMatchInlineSnapshot(`
      [
        {
          "labels": [
            "stable",
          ],
          "module": "@tsed/core",
          "name": "Configurable",
          "path": "/api/core/types/decorators/Configurable",
          "status": [
            "stable",
          ],
          "symbolCode": "@",
          "symbolLabel": "Decorator",
          "symbolName": "Configurable",
          "symbolType": "decorator",
          "tags": "stable",
          "type": "decorator",
        },
      ]
    `);
  });
});
