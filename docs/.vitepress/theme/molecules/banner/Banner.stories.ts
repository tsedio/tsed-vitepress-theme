import Banner from "./Banner.vue";
import type {Meta, StoryObj} from "@storybook/vue3";

const meta = {
  title: "Banner",
  component: Banner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    bgColor: {
      control: "select",
      options: ["gray-lighter", "gray-light", "gray", "gray-dark", "gray-darker", "gray-darkest"],
      default: "gray-lighter"
    },
    src: {
      control: "text"
    },
    href: {
      control: "text"
    },
    height: {
      control: "number",
      default: 150
    },
    padding: {
      control: "number",
      default: 0
    },
    class: {
      control: "text"
    }
  }
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    bgColor: "gray-lighter",
    src: "https://via.placeholder.com/150",
    href: "https://google.com"
  }
};

export const WithClass: Story = {
  args: {
    bgColor: "gray-lighter",
    src: "https://via.placeholder.com/150",
    href: "https://google.com",
    class: "shadow-lg",
    padding: 0
  }
};
