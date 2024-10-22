import ApiIcon from "./ApiIcon.vue";
import {render, screen} from "@testing-library/vue";

describe("<ApiIcon />", () => {
  it("should render the component", () => {
    render(ApiIcon);

    expect(screen.getByTestId("ApiIcon")).toBeInTheDocument();
    expect(screen.getByTestId("ApiIcon")).toHaveAttribute("data-type", "class");
  });

  it("should render the component", () => {
    render(ApiIcon, {
      props: {
        type: "enum"
      }
    });

    expect(screen.getByTestId("ApiIcon")).toBeInTheDocument();
    expect(screen.getByTestId("ApiIcon")).toHaveAttribute("data-type", "enum");
  });
});
