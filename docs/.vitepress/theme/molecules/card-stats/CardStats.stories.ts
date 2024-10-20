import type {Meta, StoryObj} from "@storybook/vue3";
import CardStats from "./CardStats.vue";
import {within, expect} from "@storybook/test";
import {formatNumber} from "../../utils/format";

const meta = {
  title: "CardStats",
  component: CardStats,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {}
} satisfies Meta<typeof CardStats>;

export default meta;

export const Default: StoryObj<typeof CardStats> = {
  play({canvasElement}) {
    const canvas = within(canvasElement);

    // THEN
    expect(canvas.getByText("plugins")).toBeInTheDocument();
    expect(canvas.getByText("100")).toBeInTheDocument();
    expect(canvas.getByText("maintainers")).toBeInTheDocument();
    expect(canvas.getByText("7")).toBeInTheDocument();
    expect(canvas.getByText("downloads last 30 days")).toBeInTheDocument();

    expect(canvas.getByText(formatNumber(20000))).toBeInTheDocument();
  },
  args: {
    items: [
      {
        label: "plugins",
        value: 100
      },
      {
        label: "maintainers",
        value: 7
      },
      {
        label: " downloads last 30 days",
        value: 20000
      }
    ]
  }
};

export const WithEmptyStats: StoryObj<typeof CardStats> = {
  play({canvasElement}) {
    const canvas = within(canvasElement);

    // THEN
    expect(canvas.getByText("plugins")).toBeInTheDocument();
    expect(canvas.getByTestId("card-stats-item-0")).toHaveTextContent("-");
    expect(canvas.getByText("maintainers")).toBeInTheDocument();
    expect(canvas.getByTestId("card-stats-item-1")).toHaveTextContent("-");
    expect(canvas.getByText("downloads last 30 days")).toBeInTheDocument();
    expect(canvas.getByTestId("card-stats-item-2")).toHaveTextContent("-");
  },
  args: {
    items: [
      {
        label: "plugins",
        value: 0
      },
      {
        label: "maintainers",
        value: 0
      },
      {
        label: " downloads last 30 days",
        value: 0
      }
    ]
  }
};
