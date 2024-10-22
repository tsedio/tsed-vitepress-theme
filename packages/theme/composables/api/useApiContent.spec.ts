import {beforeEach} from "vitest";
import {useFetch} from "@vueuse/core";
import {useApiContent} from "./useApiContent";

vi.mock("@vueuse/core");

describe("useApiContent", () => {
  beforeEach(() => {
    vi.mocked(useFetch).mockReturnValue({
      get: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnValue({
        data: {
          value: {
            apiRedirectUrl: "https://api-docs.tsed.io",
            apiUrl: "https://tsed.io/api.json"
          }
        }
      })
    } as any);
  });
  it("should fetch the Api.json content", () => {
    const result = useApiContent();

    expect(result).toEqual({
      data: {
        value: {
          apiRedirectUrl: "https://api-docs.tsed.io",
          apiUrl: "https://tsed.io/api.json"
        }
      }
    });
    expect(useFetch).toHaveBeenCalledWith("https://tsed.io/api.json");
  });
});
