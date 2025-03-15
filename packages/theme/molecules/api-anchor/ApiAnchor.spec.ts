import ApiAnchor from "./ApiAnchor.vue";
import {render, screen} from "@testing-library/vue";

describe("<ApiAnchor>", () => {
  it("should render the ApiAnchor with default value", () => {
    const item = {
      path: "/path",
      symbolName: "Symbol name",
      symbolType: "class",
      status: ["public"],
      description: "description",
      tags: ["tag1"]
    };
    render(ApiAnchor, {
      props: item
    });

    expect(screen.getByText("Symbol name")).toBeTruthy();
    expect(screen.getByText("Symbol name")).not.toHaveClass();
    expect(screen.getByRole("link")).toHaveAttribute("href", "https://api-docs.tsed.dev/path.html");
    expect(screen.getByRole("link")).toHaveAttribute("class", "reset-link -bubble");
    expect(screen.getByRole("link")).toHaveAttribute("title", "Symbol name");
  });
  it("should render the ApiAnchor with deprecated state", () => {
    const item = {
      path: "/path",
      symbolName: "Symbol name",
      symbolType: "class",
      status: ["deprecated"],
      description: "description",
      tags: ["tag1"]
    };

    render(ApiAnchor, {
      props: item
    });

    expect(screen.getByText("Symbol name")).toBeTruthy();
    expect(screen.getByText("Symbol name")).toHaveClass("line-through");
    expect(screen.getByRole("link")).toHaveAttribute("href", "https://api-docs.tsed.dev/path.html");
    expect(screen.getByRole("link")).toHaveClass("reset-link -bubble");
  });
});
