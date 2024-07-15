import type {Meta, StoryObj} from "@storybook/vue3";
import Button from "./Button.vue";

const meta = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    size: {
      control: "select",
      options: ["medium", "big"],
      default: "medium"
    },
    theme: {
      control: "select",
      options: ["brand", "alt", "sponsor"],
      default: "brand"
    },
    text: {
      control: "text",
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
} satisfies Meta<typeof Button> & {argTypes: {text: any}};

export default meta;
type Story = StoryObj<typeof meta> & {args: {text: string}};

export const Default: Story = {
  args: {
    size: "medium",
    theme: "brand",
    text: "Default"
  }
};
