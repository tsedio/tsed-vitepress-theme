import {waitFor, screen, render} from "@testing-library/vue";
import {userEvent} from "@testing-library/user-event";
import SortBy, {type SortByProps} from "./SortBy.vue";

describe("<SortBy />", () => {
  it("should render component", async () => {
    let value: SortByProps["modelValue"] = {value: "downloads", order: "asc"};
    const choices = [
      {
        label: "Downloads",
        value: "downloads"
      },
      {
        label: "Stars",
        value: "stars"
      }
    ];

    const onChange = (v: any) => {
      value = v;
      wrapper.rerender({
        modelValue: value,
        choices,
        "onUpdate:modelValue": onChange
      });
    };

    const wrapper = render(SortBy, {
      props: {
        modelValue: value,
        choices,
        "onUpdate:modelValue": onChange
      }
    });

    const buttonSort = screen.getByRole("button", {name: /change sort/i});
    const buttonSortOrder = screen.getByTestId("button-sort-order");

    expect(buttonSort).toHaveTextContent("Downloads");
    expect(buttonSortOrder).toHaveAttribute("aria-checked", "true");

    await userEvent.click(buttonSort);

    await waitFor(() => {
      expect(screen.getByRole("button", {name: /Stars/i})).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole("button", {name: /Stars/i}));

    await waitFor(() => {
      expect(buttonSort).toHaveTextContent("Stars");
    });

    await userEvent.click(buttonSortOrder);

    await waitFor(() => {
      expect(buttonSortOrder).toHaveAttribute("aria-checked", "false");
    });

    await userEvent.click(buttonSortOrder);

    await waitFor(() => {
      expect(buttonSortOrder).toHaveAttribute("aria-checked", "true");
    });
  });
});
