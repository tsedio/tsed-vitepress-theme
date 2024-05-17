import type {Meta, StoryObj} from "@storybook/vue3";

import ApiAnchor from "./ApiAnchor.vue";
import type {ApiSymbol} from "../../composables/api/interfaces/Api.js";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "ApiAnchor",
  component: ApiAnchor,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {
    path: {
      control: "text"
    },
    symbolName: {
      control: "text"
    },
    symbolType: {
      control: "select",
      options: ["interface", "decorator", "class", "type", "enum", "const", "function", "service"]
    },
    status: {
      control: "multi-select",
      options: ["stable", "deprecated", "experimental", "private", "public"]
    },
    theme: {
      control: "radio",
      options: ["bubble", "list"],
      default: "bubble"
    }
  },
  args: {
    path: "/path",
    symbolName: "Symbol name",
    symbolType: "class",
    status: ["public"],
    theme: "bubble"
  } // default value,
} satisfies Meta<ApiSymbol & {theme?: string}>;

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
