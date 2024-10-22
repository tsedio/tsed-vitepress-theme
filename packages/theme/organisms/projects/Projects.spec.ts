import {vi} from "vitest";
import {render, screen} from "@testing-library/vue";
import Projects from "./Projects.vue";
import {within} from "@storybook/test";

vi.mock("../../composables/config/useFrontMatter", () => {
  return {
    useFrontMatter: () => ({
      value: {
        projects: [
          {
            title: "title",
            src: "src",
            href: "href"
          },
          {
            title: "title2",
            src: "src",
            href: "href"
          }
        ],
        others: [
          {
            title: "title other",
            src: "src",
            href: "href"
          },
          {
            title: "title other2",
            src: "src",
            href: "href"
          }
        ]
      }
    })
  };
});

describe("Projects", () => {
  it("renders the projects with default props", () => {
    render(Projects, {
      props: {},
      global: {
        directives: {
          lazyloadObserver: {
            mounted() {},
            updated() {}
          }
        }
      }
    });

    const links = screen.queryAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "href");
    expect(links[0]).toHaveTextContent("title");
    expect(within(links[0]).getByRole("img")).toHaveAttribute("data-url", "src");
  });
  it("renders the projects with custom props", () => {
    render(Projects, {
      props: {
        width: 65,
        bgColor: "white",
        textSize: "xxs",
        blur: 1,
        padding: 5,
        type: "others"
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

    const links = screen.queryAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "href");
    expect(links[0]).toHaveTextContent("title other");
    expect(within(links[0]).getAllByRole("img")[0]).toHaveAttribute("data-url", "src");
  });
});
