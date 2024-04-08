import axios from "axios";
import {useGithubContributors} from "./useGithubContributors";
import {describe, it, expect, vi} from "vitest";

vi.mock("axios");

describe("useGithubContributors", () => {
  it("should fetch the Github contributors successfully", async () => {
    const mockData = [
      {login: "user1", avatar_url: "http://example.com/avatar1", html_url: "http://example.com/profile1"}
    ];
    vi.mocked(axios.get).mockResolvedValue({data: mockData});

    const {fetchContributors, contributors} = useGithubContributors("tsedio/tsed");
    await fetchContributors();

    expect(contributors.value).toHaveLength(1);
    expect(contributors.value[0].login).toEqual("user1");
  });

  it("should handle errors when fetching Github contributors", async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error("Network Error"));

    const {fetchContributors, contributors} = useGithubContributors("tsedio/tsed");
    await fetchContributors();

    expect(contributors.value).toHaveLength(0);
  });
});
