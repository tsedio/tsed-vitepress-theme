import {COLORS_LIST} from "../../utils/colors";

import Projects from "./Projects.vue";
import type {Meta, StoryObj} from "@storybook/vue3";

const meta = {
  title: "Projects",
  component: Projects,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    bgColor: {
      control: "select",
      options: COLORS_LIST,
      default: "gray-lighter"
    },
    width: {
      control: "number",
      default: 80
    },
    textSize: {
      control: "select",
      options: ["micro", "xxs", "xs", "sm", "base", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "7xl", "11xl"],
      default: "sm"
    },
    blur: {
      control: "number",
      default: 0
    },
    padding: {
      control: "number",
      default: 0
    },
    innerPadding: {
      control: "number",
      default: 5
    },
    shadow: {
      control: "select",
      options: ["default", "sm", "strong", "md", "lg", "top", "inner", "outline", "none"],
      default: "lg"
    },
    showTitle: {}
  }
} satisfies Meta<typeof Projects>;

export default meta;

type Story = StoryObj<typeof meta>;
/**
 * Use to display a basic ***projects*** from frontmatter metadata.
 */
export const Default: Story = {
  args: {}
};
