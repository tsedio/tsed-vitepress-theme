import {render, screen} from "@testing-library/vue";
import ButtonBadge from "./ButtonBadge.vue";

describe("<ButtonBadge>", () => {
  it("should render the ButtonBadge with default properties and verify presence of elements and attributes", () => {
    const item = {
      href: "http://example.com",
      login: "user123",
      src: "http://example.com/image.jpg"
    };
    render(ButtonBadge, {
      props: {
        item: item,
        showTitle: true,
        width: 60,
        bgColor: "gray-lighter",
        color: "blue",
        blur: 0,
        textSize: "xxs",
        shadow: "",
        padding: 5,
        fontWeight: "400"
      }
    });

    expect(screen.getByText("user123")).toBeTruthy();
    expect(screen.getByRole("img")).toHaveAttribute("data-url", "http://example.com/image.jpg");
    expect(screen.getByRole("link")).toHaveAttribute("href", "http://example.com");
    expect(screen.getByRole("link")).toHaveClass("reset-link");
  });

  it("should not display title when showTitle is false", () => {
    const item = {
      href: "http://example.com",
      login: "user123",
      src: "http://example.com/image.jpg"
    };
    render(ButtonBadge, {
      props: {
        item: item,
        showTitle: false,
        width: 60,
        bgColor: "gray-lighter",
        color: "blue",
        blur: 0,
        textSize: "xxs",
        shadow: "",
        padding: 5,
        fontWeight: "400"
      }
    });

    expect(screen.queryByText("user123")).not.toBeVisible();
  });

  it("should apply blur effect when blur is greater than zero", () => {
    const item = {
      href: "http://example.com",
      login: "user123",
      src: "http://example.com/image.jpg"
    };
    render(ButtonBadge, {
      props: {
        item: item,
        showTitle: true,
        width: 60,
        bgColor: "gray-lighter",
        color: "blue",
        blur: 5,
        textSize: "xxs",
        shadow: "",
        padding: 5,
        fontWeight: "400"
      }
    });

    const blurredElement = screen.getByTestId("blurred-overlay");
    expect(blurredElement).toHaveClass(`filter-blur-5`);
  });
});
