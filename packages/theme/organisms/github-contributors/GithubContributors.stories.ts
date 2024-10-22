import {COLORS_LIST} from "../../utils/colors";

import GithubContributors from "./GithubContributors.vue";
import type {Meta, StoryObj} from "@storybook/vue3";
/**
 * Use to display a basic ***github contributors*** from API.
 */
const meta = {
  title: "GithubContributors",
  component: GithubContributors,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    bgColor: {
      control: "select",
      options: COLORS_LIST,
      default: "gray-lighter"
    },
    color: {
      control: "select",
      options: COLORS_LIST,
      default: "platinium"
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
    fontWeight: {
      control: "select",
      options: ["hairline", "thin", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      default: "bold"
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
} satisfies Meta<typeof GithubContributors>;

export default meta;

type Story = StoryObj<typeof meta>;
/**
 * Use to display a basic ***github contributors*** from API.
 */
export const Default: Story = {
  args: {
    users: []
  }
};
/**
 * Use to display a basic ***github contributors*** from API. Add users props to filter list.
 */
export const WithFilteredUsers: Story = {
  args: {
    users: ["Romakita", "LorianeE"]
  }
};
