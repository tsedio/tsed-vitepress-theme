import type {Meta, StoryObj} from "@storybook/vue3";
import {expect, within} from "@storybook/test";
import CardPackage from "./CardPackage.vue";
import {formatNumber} from "../../utils/format";

const meta = {
  title: "CardPackage",
  component: CardPackage,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {}
} satisfies Meta<typeof CardPackage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Official: Story = {
  args: {
    name: "@tsed/platform-express",
    description: "A TypeScript Framework on top of Express",
    repository: "https://github.com/tsedio/tsed",
    npm: "https://www.npmjs.com/package/%40tsed%2Fplatform-express",
    icon: "https://tsed.dev/expressjs.svg",
    homepage: "https://github.com/tsedio/tsed/tree/production/packages/platform/platform-express",
    maintainers: [
      {
        username: "romakita",
        avatar: "https://www.gravatar.com/avatar/de3f2df14a0230b7cd6372ed50d93573"
      }
    ],
    downloads: 68482,
    stars: 2829,
    tags: ["platform"],
    type: "official",
    category: "framework"
  },
  async play({canvasElement}) {
    const screen = within(canvasElement);

    await expect(screen.getByText("@tsed/platform-express")).toBeInTheDocument();
    await expect(screen.getByText("A TypeScript Framework on top of Express")).toBeInTheDocument();
    await expect(screen.queryByText("PREMIUM")).not.toBeInTheDocument();

    await expect(screen.getByTestId("downloads-stats")).toHaveTextContent(formatNumber(68000));
    await expect(screen.getByTestId("stars-stats")).toHaveTextContent(formatNumber(2800) + " stars");
    await expect(screen.getByTestId("card-avatar")).toHaveAttribute(
      "src",
      "https://www.gravatar.com/avatar/de3f2df14a0230b7cd6372ed50d93573?s=48&d=mp"
    );
  }
};

export const Premium: Story = {
  args: {
    name: "@tsed/platform-express",
    description: "A TypeScript Framework on top of Express",
    repository: "https://github.com/tsedio/tsed",
    npm: "https://www.npmjs.com/package/%40tsed%2Fplatform-express",
    icon: "https://tsed.dev/expressjs.svg",
    homepage: "https://github.com/tsedio/tsed/tree/production/packages/platform/platform-express",
    maintainers: [
      {
        username: "romakita",
        avatar: "https://www.gravatar.com/avatar/de3f2df14a0230b7cd6372ed50d93573"
      }
    ],
    downloads: 68482,
    stars: 2829,
    tags: ["platform"],
    type: "premium",
    category: "framework"
  },
  async play({canvasElement}) {
    const screen = within(canvasElement);

    await expect(screen.getByText("@tsed/platform-express")).toBeInTheDocument();
    await expect(screen.getByText("A TypeScript Framework on top of Express")).toBeInTheDocument();
    await expect(screen.queryByText("PREMIUM")).toBeInTheDocument();

    await expect(screen.getByTestId("downloads-stats")).toHaveTextContent(formatNumber(68000));
    await expect(screen.getByTestId("stars-stats")).toHaveTextContent(formatNumber(2800) + " stars");
    await expect(screen.getByTestId("card-avatar")).toHaveAttribute(
      "src",
      "https://www.gravatar.com/avatar/de3f2df14a0230b7cd6372ed50d93573?s=48&d=mp"
    );
  }
};

export const Community: Story = {
  args: {
    name: "@tsed/platform-express",
    description: "A TypeScript Framework on top of Express",
    repository: "https://github.com/tsedio/tsed",
    npm: "https://www.npmjs.com/package/%40tsed%2Fplatform-express",
    icon: "https://tsed.dev/expressjs.svg",
    homepage: "https://github.com/tsedio/tsed/tree/production/packages/platform/platform-express",
    maintainers: [
      {
        username: "romakita",
        avatar: "https://www.gravatar.com/avatar/de3f2df14a0230b7cd6372ed50d93573"
      }
    ],
    downloads: 68482,
    stars: 2829,
    tags: ["platform"],
    type: "community",
    category: "framework"
  },
  async play({canvasElement}) {
    const screen = within(canvasElement);

    await expect(screen.getByText("@tsed/platform-express")).toBeInTheDocument();
    await expect(screen.getByText("A TypeScript Framework on top of Express")).toBeInTheDocument();
    await expect(screen.queryByText("PREMIUM")).not.toBeInTheDocument();

    await expect(screen.getByTestId("downloads-stats")).toHaveTextContent(formatNumber(68000));
    await expect(screen.getByTestId("stars-stats")).toHaveTextContent(formatNumber(2800) + " stars");
    await expect(screen.getByTestId("card-avatar")).toHaveAttribute(
      "src",
      "https://www.gravatar.com/avatar/de3f2df14a0230b7cd6372ed50d93573?s=48&d=mp"
    );
  }
};
