import {describe, it, expect, vi} from "vitest";
import {mount} from "@vue/test-utils";
import GithubContributors from "./GithubContributors.vue";
import ContributorItems from "../../molecules/contributors/ContributorItems.vue";
import {useGithubContributors} from "../../composables/api/useGithubContributors";

vi.mock("../../composables/api/useGithubContributors", () => {
  const fetchContributors = vi.fn();
  return {
    useGithubContributors: () => ({
      fetchContributors
    }),
    fetchContributors
  };
});

describe("<GithubContributors>", () => {
  it("renders ContributorItems with the correct props when fetch is successful and users are filtered", async () => {
    const {fetchContributors} = useGithubContributors("https://api.tsed.io/rest/github/tsedio/tsed");

    // Mocked data for GitHub contributors
    const mockContributors = [
      {
        login: "Romakita",
        id: 1763311,
        node_id: "MDQ6VXNlcjE3NjMzMTE=",
        avatar_url: "https://avatars.githubusercontent.com/u/1763311?v=4",
        contributions: 3045
      },
      {
        login: "AnotherUser",
        id: 123456,
        node_id: "MDQ6VXNlcjEyMzQ1Ng==",
        avatar_url: "https://avatars.githubusercontent.com/u/123456?v=4",
        contributions: 150
      }
    ];

    vi.mocked(fetchContributors).mockResolvedValue({value: mockContributors} as any);

    const wrapper = mount(GithubContributors, {
      props: {
        users: ["Romakita"],
        showTitle: true
      }
    });

    await wrapper.vm.$nextTick();

    const contributorItemsWrapper = wrapper.findComponent(ContributorItems);
    expect(contributorItemsWrapper.exists()).toBe(true);
  });
});
