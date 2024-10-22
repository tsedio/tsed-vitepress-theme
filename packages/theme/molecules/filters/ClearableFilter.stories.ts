import type {Meta, StoryObj} from "@storybook/vue3";
import ClearableFilter from "./ClearableFilter.vue";
import {ref} from "vue";
import {within, expect, waitFor, userEvent} from "@storybook/test";

const meta = {
  title: "ClearableFilter",
  component: ClearableFilter,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {},
  render: (args) => ({
    components: {ClearableFilter},
    setup() {
      const keywords = ref(args.keywords);
      const count = ref(args.count);

      const onClear = () => {
        keywords.value = [];
        count.value = 100;
      };

      const reset = () => {
        keywords.value = args.keywords;
        count.value = args.count;
      };

      return {args, onClear, count, keywords, reset};
    },
    template:
      '<ClearableFilter v-bind="args" :count="count" :keywords="keywords" @clear="onClear" /><br /><button @click="reset()">Reset</button>'
  })
} satisfies Meta<typeof ClearableFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    keywords: ["All", "Official", "Community"],
    count: 0,
    label: "plugin"
  },
  async play({canvasElement}) {
    const canvas = within(canvasElement);

    const resetButton = canvas.getByText("Reset");
    const clearButton = canvas.getByText("clear filters");

    await expect(clearButton).toBeInTheDocument();
    await expect(canvas.getByText("0 plugin found")).toBeInTheDocument();
    await expect(canvas.getByText("All, Official, Community")).toBeInTheDocument();

    await userEvent.click(clearButton, {delay: 500});

    await waitFor(() => {
      expect(canvas.getByText("100 plugins found")).toBeInTheDocument();
    });

    await expect(clearButton).not.toBeInTheDocument();
    await expect(canvas.queryByText("All, Official, Community")).not.toBeInTheDocument();

    await userEvent.click(resetButton, {delay: 500});

    await waitFor(() => {
      expect(canvas.getByText("0 plugin found")).toBeInTheDocument();
    });
  }
};
