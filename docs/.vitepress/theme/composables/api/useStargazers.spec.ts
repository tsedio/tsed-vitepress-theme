import axios from "axios";
import {describe, expect, it, vi} from "vitest";
import {useStargazers} from "./useStargazers";

vi.mock("axios");

describe("useStargazers", () => {
  it("should fetch the Github Stargazers successfully", async () => {
    const mockData = {
      id: "id",
      stargazers_count: 100
    };
    vi.mocked(axios.get).mockResolvedValue({data: mockData});

    const {stargazers, fetchStargazers} = useStargazers("tsedio/tsed");
    await fetchStargazers();

    expect(stargazers.value).toEqual(100);
    expect(axios.get).toHaveBeenCalledWith("https://repos/api.github.com/tsedio/tsed");
  });

  it("should handle errors when fetching Github Stargazers", async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error("Network Error"));

    const {stargazers, fetchStargazers} = useStargazers("tsedio/tsed", 200);
    await fetchStargazers();

    expect(stargazers.value).toEqual(200);
  });
});
