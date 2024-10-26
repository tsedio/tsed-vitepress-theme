import ButtonBoxes from "./ButtonBoxes.vue";
import {render, screen} from "@testing-library/vue";
import {userEvent} from "@testing-library/user-event";

describe("ButtonBoxes", () => {
  it("should render", async () => {
    const items = [
      {
        label: "All",
        value: ""
      },
      {
        label: "Official",
        value: "official"
      },
      {
        label: "Community",
        value: "community"
      }
    ];
    let value = "";
    const onChange = (v: any) => {
      value = v;
      wrapper.rerender({
        modelValue: value,
        choices: items,
        "onUpdate:modelValue": onChange
      });
    };

    const wrapper = render(ButtonBoxes, {
      props: {
        modelValue: value,
        choices: items,
        "onUpdate:modelValue": onChange
      }
    });

    const officialButton = screen.getByRole("checkbox", {name: "Official"});
    const AllButton = screen.getByRole("checkbox", {name: "All"});

    expect(screen.getAllByRole("checkbox")).toHaveLength(3);
    expect(AllButton).toBeInTheDocument();
    expect(AllButton).toHaveAttribute("aria-checked", "true");
    expect(officialButton).toBeInTheDocument();
    expect(officialButton).toHaveAttribute("aria-checked", "false");
    expect(screen.getByRole("checkbox", {name: "Community"})).toBeInTheDocument();

    await userEvent.click(screen.getByRole("checkbox", {name: "Official"}));

    expect(value).toEqual("official");
    expect(AllButton).toHaveAttribute("aria-checked", "false");
    expect(officialButton).toHaveAttribute("aria-checked", "true");

    // it should unselect button
    await userEvent.click(officialButton);

    expect(AllButton).toHaveAttribute("aria-checked", "true");
    expect(officialButton).toHaveAttribute("aria-checked", "false");
  });
});
