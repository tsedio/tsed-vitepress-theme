import contributors from "./contributors.json";
import ContributorItems from "./ContributorItems.vue";
import type {Meta, StoryObj} from "@storybook/vue3";
import {COLORS_LIST} from "../../utils/colors";
import {expect, within} from "@storybook/test";

const meta = {
  title: "ContributorItems",
  component: ContributorItems,
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
} satisfies Meta<typeof ContributorItems>;

export default meta;
type Story = StoryObj<typeof meta>;

function delay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

export const Default: Story = {
  args: {
    showTitle: false,
    width: 60,
    items: contributors as any[],
    bgColor: "gray-lighter",
    textSize: "sm",
    blur: 0,
    padding: 5,
    innerPadding: 0,
    shadow: "lg"
  },
  async play({canvasElement}) {
    const canvas = within(canvasElement);
    const items = canvas.getAllByRole("listitem");

    await expect(items).toHaveLength(contributors.length);

    let button = within(items[0]).getByRole("link");

    await delay();

    button.focus();

    button = within(items[1]).getByRole("link");

    await delay();

    button.focus();

    await delay();

    button.blur();
  }
};
