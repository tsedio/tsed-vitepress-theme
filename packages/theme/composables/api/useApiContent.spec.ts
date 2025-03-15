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
            apiRedirectUrl: "https://api-docs.tsed.dev",
            apiUrl: "https://tsed.dev/api.json"
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
          apiRedirectUrl: "https://api-docs.tsed.dev",
          apiUrl: "https://tsed.dev/api.json"
        }
      }
    });
    expect(useFetch).toHaveBeenCalledWith("https://tsed.dev/api.json",{
      afterFetch: expect.any(Function)
    });
  });
});
