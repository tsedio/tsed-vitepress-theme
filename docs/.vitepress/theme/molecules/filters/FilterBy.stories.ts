import type {Meta, StoryObj} from "@storybook/vue3";
import FilterBy from "./FilterBy.vue";
import {ref, watch} from "vue";
import {within, expect, waitFor, userEvent} from "@storybook/test";

function delay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

const meta = {
  title: "FilterBy",
  component: FilterBy,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {},
  render: (args) => ({
    components: {FilterBy},
    setup() {
      const model = ref(args.modelValue);

      // Optional: Keeps v-model in sync with storybook args
      watch(
        () => args.modelValue,
        (val) => {
          model.value = val;
        }
      );

      return {args, model};
    },
    template: '<FilterBy v-bind="args" v-model="model" label="Filter by type" />'
  })
} satisfies Meta<typeof FilterBy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: "",
    label: "Filter by type",
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
        label: "Premium",
        value: "premium"
      },
      {
        label: "Community",
        value: "community"
      }
    ]
  },
  async play({canvasElement}) {
    const canvas = within(canvasElement);

    const buttonFilter = canvas.getByRole("button", {name: /change filter/i});

    await expect(buttonFilter).toHaveTextContent("All");

    await userEvent.click(buttonFilter, {delay: 500});

    const buttonPremium = canvas.getByRole("button", {name: /Premium/i});

    await userEvent.click(buttonPremium, {delay: 500});

    await waitFor(() => {
      expect(buttonFilter).toHaveTextContent("Premium");
    });
  }
};
