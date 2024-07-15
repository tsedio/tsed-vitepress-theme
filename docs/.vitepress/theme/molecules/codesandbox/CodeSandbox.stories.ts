import type {Meta, StoryObj} from "@storybook/vue3";
import CodeSandbox from "./CodeSandbox.vue";
import {expect, within, waitFor} from "@storybook/test";

const meta = {
  title: "CodeSandbox",
  component: CodeSandbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    sandboxId: {
      control: {
        type: "text"
      }
    },
    title: {
      control: {
        type: "text"
      }
    },
    fontSize: {
      control: {
        type: "number"
      }
    },
    hideNavigation: {
      control: {
        type: "number"
      }
    },
    theme: {
      control: {
        type: "select",
        options: ["light", "dark"]
      }
    }
  },
  render: (args) => ({
    components: {CodeSandbox},
    setup() {
      return {args};
    },
    template: '<div class="w-[800px]" ><CodeSandbox v-bind="args" /></div>'
  })
} satisfies Meta<typeof CodeSandbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sandboxId: "rough-frost-6bi81",
    title: "Multer example"
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole("button");

    await expect(button).toHaveTextContent("Start sandbox");

    await new Promise((r) => setTimeout(r, 2000));

    button.click();

    const iframe = await waitFor(() => {
      return canvas.getByTestId("iframe-sandbox");
    });

    await expect(iframe).toHaveAttribute("src", expect.stringContaining("sandbox"));
  }
};
