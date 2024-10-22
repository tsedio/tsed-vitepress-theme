import type {Meta, StoryObj} from "@storybook/vue3";
import SortBy from "./SortBy.vue";
import {ref, watch} from "vue";
import {expect, userEvent, waitFor, within} from "@storybook/test";

const meta = {
  title: "SortBy",
  component: SortBy,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {},
  render: (args) => ({
    components: {SortBy},
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
    template: '<SortBy v-bind="args" v-model="model" />'
  })
} satisfies Meta<typeof SortBy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: {value: "downloads", order: "asc"},
    choices: [
      {
        label: "Downloads",
        value: "downloads"
      },
      {
        label: "Stars",
        value: "stars"
      }
    ]
  },
  async play({canvasElement}) {
    const canvas = within(canvasElement);

    const buttonSort = canvas.getByRole("button", {name: /change sort/i});
    const buttonSortOrder = canvas.getByTestId("button-sort-order");

    await expect(buttonSort).toHaveTextContent("Downloads");
    await expect(buttonSortOrder).toHaveAttribute("aria-checked", "true");

    await userEvent.click(buttonSort, {delay: 500});

    const buttonStars = canvas.getByRole("button", {name: /Stars/i});

    await userEvent.click(buttonStars, {delay: 500});

    await waitFor(() => {
      expect(buttonSort).toHaveTextContent("Stars");
    });

    await userEvent.click(buttonSortOrder, {delay: 500});

    await waitFor(() => {
      expect(buttonSortOrder).toHaveAttribute("aria-checked", "false");
    });

    await userEvent.click(buttonSortOrder, {delay: 500});

    await waitFor(() => {
      expect(buttonSortOrder).toHaveAttribute("aria-checked", "true");
    });
  }
};
