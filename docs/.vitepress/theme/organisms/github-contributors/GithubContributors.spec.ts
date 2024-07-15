import {describe, expect, it, vi} from "vitest";
import GithubContributors from "./GithubContributors.vue";
import {render, screen} from "@testing-library/vue";

vi.mock("../../composables/api/useGithubContributors", () => {
  const fetchContributors = vi.fn().mockResolvedValue({
    value: [
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
    ]
  });

  return {
    useGithubContributors: () => ({
      fetchContributors
    }),
    fetchContributors
  };
});

describe("<GithubContributors>", () => {
  it("renders ContributorItems with the correct props when fetch is successful and users are filtered", async () => {
    const {container} = render(GithubContributors, {
      props: {
        users: ["Romakita"],
        showTitle: true
      },
      global: {
        directives: {
          lazyloadObserver: {
            mounted() {},
            updated() {}
          }
        }
      }
    });

    await vi.waitFor(() => {
      return expect(screen.queryAllByRole("img")).toHaveLength(1);
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <ul
          class="mb-5 reset-list flex flex-wrap items-center gap-2"
        >
          
          <li
            class=""
          >
            <a
              class="button-badge block reset-link"
              href=""
              innerpadding="0"
              liclass=""
              outbound="false"
              title="Romakita"
            >
              
              <span
                class="flex flex-col transition-all relative no-underline text-xxs"
                data-testid="button-badge-content"
              >
                <figure
                  class="flex items-center justify-center relative z-2 rounded-2xl overflow-hidden mb-2 bg-gray-lighter shadow-none"
                  style="width: 45px; height: 45px;"
                >
                  <img
                    class="w-full opacity-0 rounded-2xl transition-all no-shadow"
                    data-url="https://avatars.githubusercontent.com/u/1763311?v=4"
                  />
                </figure>
                <!--v-if-->
                <span
                  class="flex items-center justify-center whitespace-pre"
                  style="width: 45px;"
                >
                  Romakita
                </span>
              </span>
              
            </a>
          </li>
          
        </ul>
      </div>
    `);
  });
});
