import type {Meta, StoryObj} from "@storybook/vue3";
import Button from "./Button.vue";

const meta: Meta<any> = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    size: {
      control: {type: "select"},
      options: ["medium", "big"],
      default: "medium"
    },
    theme: {
      control: {type: "select"},
      options: ["brand", "alt", "sponsor"],
      default: "brand"
    },
    text: {
      control: {type: "text"},
      default: "Default"
    }
  },
  render: (args) => ({
    components: {Button},
    setup() {
      return {args};
    },
    template: '<Button v-bind="args">{{args.text}}</Button>'
  })
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "medium",
    theme: "brand",
    text: "Default"
  }
};
