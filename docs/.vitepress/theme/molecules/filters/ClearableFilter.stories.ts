import type {Meta, StoryObj} from "@storybook/vue3";
import ClearableFilter from "./ClearableFilter.vue";
import {ref} from "vue";
import {within, expect, waitFor} from "@storybook/test";

function delay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

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

    expect(clearButton).toBeInTheDocument();
    expect(canvas.getByText("0 plugin found")).toBeInTheDocument();
    expect(canvas.getByText("All, Official, Community")).toBeInTheDocument();

    await delay();

    clearButton.click();

    await waitFor(() => {
      expect(canvas.getByText("100 plugins found")).toBeInTheDocument();
    });

    expect(clearButton).not.toBeInTheDocument();
    expect(canvas.queryByText("All, Official, Community")).not.toBeInTheDocument();

    await delay();

    resetButton.click();

    await waitFor(() => {
      expect(canvas.getByText("0 plugin found")).toBeInTheDocument();
    });
  }
};
