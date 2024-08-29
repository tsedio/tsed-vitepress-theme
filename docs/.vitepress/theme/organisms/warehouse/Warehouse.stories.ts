import type {Meta, StoryObj} from "@storybook/vue3";
import Warehouse from "./Warehouse.vue";

const meta = {
  title: "Warehouse",
  component: Warehouse,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {}
} satisfies Meta<typeof Warehouse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
