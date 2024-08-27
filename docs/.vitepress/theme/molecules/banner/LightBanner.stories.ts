import type {Meta, StoryObj} from "@storybook/vue3";
import LightBanner from "./LightBanner.vue";
import {expect, within} from "@storybook/test";

const meta = {
  title: "LightBanner",
  component: LightBanner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {},
  render: (args) => ({
    components: {LightBanner},
    setup() {
      return {args};
    },
    template:
      '<div class="w-[800px]">' +
      '<LightBanner v-bind="args">' +
      "Discover our list of plugins to extend your Ts.ED project.\n" +
      "Created by the Ts.ED team and community." +
      "</LightBanner></div>"
  }),
  play: ({canvasElement}) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText("Explore plugins")).toBeInTheDocument();
    expect(
      canvas.getByText(
        "Discover our list of plugins to extend your Ts.ED project. Created by the Ts.ED team and community."
      )
    ).toBeInTheDocument();
  }
} satisfies Meta<typeof LightBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Explore plugins"
  }
};
