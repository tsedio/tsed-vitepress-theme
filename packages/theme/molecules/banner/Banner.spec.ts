import {render, screen} from "@testing-library/vue";
import Banner from "./Banner.vue";

describe("<Banner>", () => {
  it("should render the Banner with given properties with default properties and verify presence of elements and attributes", () => {
    render(Banner, {
      props: {
        src: "https://image.com",
        href: "https://linkto.com",
        height: 120,
        padding: 4,
        class: "shadow-lg",
        bgColor: "white"
      }
    });

    expect(screen.getByRole("link")).toHaveClass("p-4");
    expect(screen.getByRole("link")).toHaveClass("bg-white");
    expect(screen.getByRole("link")).toHaveClass("shadow-lg");
    expect(screen.getByRole("link")).toHaveAttribute("href", "https://linkto.com");
    expect(screen.getByTestId("banner-bg-container")).toHaveStyle("backgroundImage: url(https://image.com)");
  });

  it("should render the Banner with default properties with default properties and verify presence of elements and attributes", () => {
    render(Banner, {
      props: {
        src: "https://image.com"
      }
    });

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByTestId("banner-bg-container")).toHaveStyle("backgroundImage: url(https://image.com)");
  });
});
