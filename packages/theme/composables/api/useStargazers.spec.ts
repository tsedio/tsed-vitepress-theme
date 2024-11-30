import {beforeEach, describe, expect, it, vi} from "vitest";
import {useFetch} from "@vueuse/core";
import {useStargazers} from "./useStargazers";
import {formatNumber} from "../../utils/format";

vi.mock("@vueuse/core");

describe("useStargazers", () => {
  beforeEach(() => {

  });

  it("should fetch the Github Stargazers successfully", async () => {
    const mock = {
      get: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnValue({
        data: {
          value: {
            stargazers_count: 65,
            formattedStargazers: formatNumber(65)
          }
        }
      })
    };

    vi.mocked(useFetch).mockReturnValue(mock as any);

    const result = useStargazers("tsedio/tsed");

    expect(result).toEqual({
      "data": {
        "value": {
          "stargazers_count": 65,
          "formattedStargazers": "65"
        }
      }
    });

    const mapped = (vi.mocked(useFetch).mock.calls[0][1] as any).afterFetch({
      data: {
        stargazers_count: 65
      }
    });

    expect(mapped).toEqual({
      data: {
        stargazers: 65,
        formattedStargazers: "65"
      }
    });
  });
});
