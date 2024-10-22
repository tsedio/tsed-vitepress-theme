import {render, screen} from "@testing-library/vue";
import LightBanner from "./LightBanner.vue";

describe("<LightBanner>", () => {
  it("should render the LightBanner with content and title", () => {
    render(LightBanner, {
      props: {
        title: "Explore plugins"
      },
      slots: {
        default: "Discover our list of plugins to extend your Ts.ED project.\nCreated by the Ts.ED team and community."
      }
    });

    expect(screen.getByText("Explore plugins")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Discover our list of plugins to extend your Ts.ED project. Created by the Ts.ED team and community."
      )
    ).toBeInTheDocument();
  });
});
