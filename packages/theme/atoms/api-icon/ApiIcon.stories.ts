import type {Meta, StoryObj} from "@storybook/vue3";
import ApiIcon from "./ApiIcon.vue";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "ApiIcon",
  component: ApiIcon,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    type: {
      control: "select",
      options: ["interface", "decorator", "class", "type", "enum", "const", "function", "service"]
    }
  },
  args: {
    type: "class"
  } // default value,
} satisfies Meta<typeof ApiIcon>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {}
};
