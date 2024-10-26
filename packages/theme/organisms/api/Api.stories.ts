import type {Meta, StoryObj} from "@storybook/vue3";
import {expect, userEvent, waitFor, within} from "@storybook/test";
import Api from "./Api.vue";

/**
 * Use to display api references.
 */
const meta = {
  title: "Api",
  component: Api,
  parameters: {
    layout: "centered"
  },
  argTypes: {}
} satisfies Meta<typeof Api>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  async play({canvasElement}) {
    const screen = within(canvasElement);

    await waitFor(() => expect(screen.getByText("@tsed/core")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("@tsed/di")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("AnyToPromise")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("AnyToPromiseResponseTypes")).toBeInTheDocument());

    const searchInput = screen.getByRole("searchbox");

    await expect(searchInput).toBeInTheDocument();

    await userEvent.type(searchInput, "AnyToPromise", {delay: 100});

    screen.getByText("@tsed/core").scrollIntoView();
    searchInput.scrollIntoView();

    await expect(screen.queryByText("@tsed/di")).not.toBeInTheDocument();

    const classCheckbox = screen.getByRole("checkbox", {name: "Class"});

    await userEvent.click(classCheckbox, {delay: 500});

    await waitFor(() => expect(screen.queryByText("AnyToPromiseResponseTypes")).not.toBeInTheDocument());

    await userEvent.click(classCheckbox, {delay: 500});
    await userEvent.clear(searchInput);

    await waitFor(() => expect(screen.getByText("@tsed/di")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("AnyToPromise")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("AnyToPromiseResponseTypes")).toBeInTheDocument());
  }
};
