import type {Meta, StoryObj} from "@storybook/vue3";
import ApiList from "./ApiList.vue";
/**
 * Display Api references by given a query to filter the list.
 */
const meta = {
  title: "ApiList",
  component: ApiList,
  parameters: {
    layout: "centered"
  },
  argTypes: {

  }
} satisfies Meta<typeof ApiList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    query: "status.includes('platform') && ['@tsed/common', '@tsed/platform-views', '@tsed/platform-params', '@tsed/platform-response-filter', '@tsed/platform-exceptions'].includes(module)"
  },
  play() {

  }
};
