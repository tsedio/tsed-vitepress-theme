import {render, screen} from "@testing-library/vue";
import CardStats from "./CardStats.vue";

describe("<CardStats>", () => {
  it("should render the CardStats with items", () => {
    // GIVEN
    const items = [
      {
        label: "plugins",
        value: 100
      },
      {
        label: "maintainers",
        value: 7
      },
      {
        label: " downloads last 30 days",
        value: 20000
      }
    ];

    // WHEN
    render(CardStats, {
      props: {
        items
      }
    });

    // THEN
    expect(screen.getByText("plugins")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("maintainers")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("downloads last 30 days")).toBeInTheDocument();
    expect(screen.getByText("20K")).toBeInTheDocument();
  });

  it("should render the CardStats with items and number at 0", () => {
    // GIVEN
    const items = [
      {
        label: "plugins",
        value: 0
      },
      {
        label: "maintainers",
        value: 0
      },
      {
        label: " downloads last 30 days",
        value: 0
      }
    ];

    // WHEN
    render(CardStats, {
      props: {
        items
      }
    });

    // THEN
    expect(screen.getByText("plugins")).toBeInTheDocument();
    expect(screen.getByTestId("card-stats-item-0")).toHaveTextContent("-");
    expect(screen.getByText("maintainers")).toBeInTheDocument();
    expect(screen.getByTestId("card-stats-item-1")).toHaveTextContent("-");
    expect(screen.getByText("downloads last 30 days")).toBeInTheDocument();
    expect(screen.getByTestId("card-stats-item-2")).toHaveTextContent("-");
  });
});
