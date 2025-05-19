import type {Meta, StoryObj} from "@storybook/vue3";
import Warehouse from "./Warehouse.vue";
import {expect, userEvent, waitFor, within} from "@storybook/test";
import {formatNumber} from "../../utils/format";
import Button from "../../molecules/button/Button.vue";

const meta = {
  title: "Warehouse",
  component: Warehouse,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  },
  argTypes: {},
  render: (args) => ({
    components: {Warehouse},
    setup() {
      return {args};
    },
    template: '<Warehouse v-bind="args">{{args.text}}</Warehouse>'
  })
} satisfies Meta<typeof Warehouse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Discover our list of plugins to extend your Ts.ED project. Created by the Ts.ED team and community.'
  } as any,
  async play({canvasElement}) {
    const screen = within(canvasElement);

    await expect(screen.getByText("Explore plugins")).toBeInTheDocument();

    await expect(screen.getByText("plugins")).toBeInTheDocument();
    await expect(screen.getByText("maintainers")).toBeInTheDocument();
    await expect(screen.getByText("downloads last 30 days")).toBeInTheDocument();

    await waitFor(() => expect(screen.getByTestId("ClearableFilter")).toBeInTheDocument())

    const clearableFilter = screen.getByTestId("ClearableFilter");

    await expect(within(clearableFilter).getByText(/plugins/)).toHaveTextContent(/1\d{2} plugins found/);

    await expect(screen.getByText("@tsed/logger")).toBeInTheDocument();
    await expect(screen.getByText("@tsed/exceptions")).toBeInTheDocument();

    const searchInput = screen.getByRole("searchbox");

    await expect(searchInput).toBeInTheDocument();

    await userEvent.type(searchInput, "logger", {delay: 100});

    await expect(within(clearableFilter).getByText(/plugins/)).toHaveTextContent(/13 plugins found/);

    await expect(screen.queryByText("@tsed/exceptions")).not.toBeInTheDocument();

    await userEvent.clear(searchInput);

    const paymentCheckbox = screen.getByRole("checkbox", {name: "Payment"});

    await userEvent.click(paymentCheckbox, {delay: 500});

    await expect(screen.queryByText("@tsed/exceptions")).not.toBeInTheDocument();
    await expect(screen.queryByText("@tsed/stripe")).toBeInTheDocument();
    await expect(within(clearableFilter).getByText(/plugin/)).toHaveTextContent("1 plugin found");

    const clearFilter = screen.getByRole("button", {name: "Clear filters"});

    await userEvent.click(clearFilter, {delay: 500});

    await expect(within(clearableFilter).getByText(/plugins/)).toHaveTextContent(/1\d{2} plugins found/);
  }
};
