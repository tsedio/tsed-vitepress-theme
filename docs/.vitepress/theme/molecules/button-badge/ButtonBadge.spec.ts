import {render, screen} from "@testing-library/vue";
import ButtonBadge from "./ButtonBadge.vue";

describe("<ButtonBadge>", () => {
  it("should render the ButtonBadge with default properties and verify presence of elements and attributes", () => {
    render(ButtonBadge, {
      props: {
        src: "http://example.com/image.jpg",
        href: "http://example.com",
        title: "user123",
        showTitle: true,
        width: 60,
        bgColor: "gray-lighter",
        blur: 0,
        textSize: "xxs",
        padding: 5
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

    expect(screen.getByText("user123")).toBeTruthy();
    expect(screen.getByRole("img")).toHaveAttribute("data-url", "http://example.com/image.jpg");
    expect(screen.getByRole("link")).toHaveAttribute("href", "http://example.com");
    expect(screen.getByRole("link")).toHaveClass("reset-link");
  });

  it("should not display title when showTitle is false", () => {
    render(ButtonBadge, {
      props: {
        href: "http://example.com",
        title: "user123",
        src: "http://example.com/image.jpg",
        showTitle: false,
        width: 60,
        bgColor: "gray-lighter",
        blur: 0,
        textSize: "xxs",
        padding: 5
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

    expect(screen.queryByText("user123")).not.toBeVisible();
  });

  it("should apply blur effect when blur is greater than zero", () => {
    render(ButtonBadge, {
      props: {
        href: "http://example.com",
        title: "user123",
        src: "http://example.com/image.jpg",
        showTitle: true,
        width: 60,
        bgColor: "gray-lighter",
        blur: 5,
        textSize: "xxs",
        padding: 5
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

    const blurredElement = screen.getByTestId("blurred-overlay");
    expect(blurredElement).toHaveClass(`filter-blur-5`);
  });
});
