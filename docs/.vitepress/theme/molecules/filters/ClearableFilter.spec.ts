import {render, screen} from "@testing-library/vue";
import ClearableFilter from "./ClearableFilter.vue";
import {userEvent} from "@testing-library/user-event";

describe("<ClearableFilter />", () => {
  it("should render component", async () => {
    const onClear = vi.fn();

    render(ClearableFilter, {
      props: {
        keywords: ["All", "Official", "Community"],
        count: 0,
        label: "plugin",
        onClear
      }
    });

    const clearButton = screen.getByText("clear filters");

    expect(clearButton).toBeInTheDocument();
    expect(screen.getByText("0 plugin found")).toBeInTheDocument();
    expect(screen.getByText("All, Official, Community")).toBeInTheDocument();

    await userEvent.click(clearButton);

    expect(onClear).toHaveBeenCalled();
  });
  it("should render component with empty keywords and 100 plugins", async () => {
    const onClear = vi.fn();

    render(ClearableFilter, {
      props: {
        keywords: [],
        count: 100,
        label: "plugin",
        onClear
      }
    });

    expect(screen.queryByText("clear filters")).not.toBeInTheDocument();
    expect(screen.getByText("100 plugins found")).toBeInTheDocument();
    expect(screen.queryByText("All, Official, Community")).not.toBeInTheDocument();
  });
});
