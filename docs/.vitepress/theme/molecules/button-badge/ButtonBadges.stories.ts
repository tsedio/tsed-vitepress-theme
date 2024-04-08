import {COLORS_LIST} from "../../utils/colors";

import ButtonBadges from "./ButtonBadges.vue";
import type {Meta} from "@storybook/vue3";

const meta = {
  title: "ButtonBadges",
  component: ButtonBadges,
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
      default: 3
    },
    innerPadding: {
      control: "number",
      default: 5
    },
    shadow: {
      control: "select",
      options: ["default", "sm", "strong", "md", "lg", "top", "inner", "outline", "none"],
      default: "lg"
    }
  }
} satisfies Meta<typeof ButtonBadges>;

export default meta;

export const Default = {
  args: {}
};
