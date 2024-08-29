import type {Meta, StoryObj} from "@storybook/vue3";
import ButtonBoxes from "./ButtonBoxes.vue";
import {ref, watch} from "vue";
import {within, expect, waitFor} from "@storybook/test";

function delay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

const meta = {
  title: "ButtonBoxes",
  component: ButtonBoxes,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {},
  render: (args) => ({
    components: {ButtonBoxes},
    setup() {
      const model = ref(args.modelValue);

      // Optional: Keeps v-model in sync with storybook args
      watch(
        () => args.modelValue,
        (val: string) => {
          model.value = val;
        }
      );

      return {args, model};
    },
    template: '<ButtonBoxes v-bind="args" v-model="model" />'
  })
} satisfies Meta<typeof ButtonBoxes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: "",
    choices: [
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
    ]
  },
  async play({canvasElement}) {
    const canvas = within(canvasElement);

    const officialButton = canvas.getByRole("button", {name: "Official"});
    const AllButton = canvas.getByRole("button", {name: "All"});

    expect(canvas.getAllByRole("button")).toHaveLength(3);
    expect(AllButton).toBeInTheDocument();
    expect(AllButton).toHaveAttribute("aria-checked", "true");
    expect(officialButton).toBeInTheDocument();
    expect(officialButton).toHaveAttribute("aria-checked", "false");
    expect(canvas.getByRole("button", {name: "Community"})).toBeInTheDocument();

    await delay();

    officialButton.click();

    await waitFor(() => {
      expect(AllButton).toHaveAttribute("aria-checked", "false");
    });

    // expect(officialButton).toHaveAttribute("aria-checked", "true");

    await delay();
    // it should unselect button
    officialButton.click();

    await waitFor(() => {
      expect(AllButton).toHaveAttribute("aria-checked", "true");
    });
    // expect(officialButton).toHaveAttribute("aria-checked", "false");
  }
};
