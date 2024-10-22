import {waitFor, screen, render} from "@testing-library/vue";
import {userEvent} from "@testing-library/user-event";
import FilterBy from "./FilterBy.vue";

describe("<FilterBy />", () => {
  it("should render component", async () => {
    let value = "official";
    const choices = [
      {
        label: "All",
        value: ""
      },
      {
        label: "Official",
        value: "official"
      },
      {
        label: "Premium",
        value: "premium"
      },
      {
        label: "Community",
        value: "community"
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

    const wrapper = render(FilterBy, {
      props: {
        label: "Filter by type",
        modelValue: value,
        choices,
        "onUpdate:modelValue": onChange
      }
    });

    const buttonFilter = screen.getByRole("button", {name: /change filter/i});

    expect(buttonFilter).toHaveTextContent("Official");

    await userEvent.click(buttonFilter);

    const buttonPremium = screen.getByRole("button", {name: /Premium/i});

    await userEvent.click(buttonPremium);

    await waitFor(() => {
      expect(buttonFilter).toHaveTextContent("Premium");
    });
  });
});
