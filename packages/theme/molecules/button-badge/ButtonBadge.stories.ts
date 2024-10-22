import type {Meta, StoryObj} from "@storybook/vue3";
import {COLORS_LIST} from "../../utils/colors";
import ButtonBadge from "./ButtonBadge.vue";

const meta = {
  title: "ButtonBadge",
  component: ButtonBadge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    title: {
      control: "text"
    },
    src: {
      control: "text"
    },
    href: {
      control: "text"
    },
    bgColor: {
      control: "select",
      options: COLORS_LIST,
      default: "gray-lighter"
    },
    width: {
      control: "number",
      default: 60
    },
    textSize: {
      control: "select",
      options: ["micro", "xxs", "xs", "sm", "base", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "7xl", "11xl"],
      default: "xxs"
    },
    blur: {
      control: "number",
      default: 0
    },
    fontWeight: {
      control: "select",
      options: ["hairline", "thin", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      default: "normal"
    },
    padding: {
      control: "number",
      default: 0
    },
    shadow: {
      control: "select",
      options: ["default", "sm", "strong", "md", "lg", "top", "inner", "outline", "none"],
      default: "normal"
    }
  }
} satisfies Meta<typeof ButtonBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    title: "Romakita",
    src: "https://avatars3.githubusercontent.com/u/1763311?v=4",
    href: "https://api.github.com/users/Romakita"
  }
};
