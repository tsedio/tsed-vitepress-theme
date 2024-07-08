import type {Meta, StoryObj} from "@storybook/vue3";
import Button from "./Button.vue";

const meta = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {},
  render() {
    return {
      components: {Button},
      template: '<Button v-bind="args">Text</Button>'
    };
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
