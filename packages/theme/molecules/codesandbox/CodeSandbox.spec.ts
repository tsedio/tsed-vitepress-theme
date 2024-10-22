import CodeSandbox from "./CodeSandbox.vue";
import {render, screen} from "@testing-library/vue";
import VPButton from "../../../../.storybook/mock/VPButton.vue";
import {expect, waitFor} from "@storybook/test";

describe("<CodeSandbox />", () => {
  it("should render CodeSandbox component", async () => {
    render(CodeSandbox, {
      props: {
        sandboxId: "abc123"
      },
      global: {
        stubs: {
          VPButton: VPButton
        }
      }
    });

    expect(screen.getByRole("button")).toHaveTextContent("Start sandbox");

    screen.getByRole("button").click();

    const iframe = await waitFor(() => {
      return screen.getByTestId("iframe-sandbox");
    });

    await expect(iframe).toHaveAttribute("src", expect.stringContaining("sandbox"));
  });
  it("should render CodeSandbox component with all props", async () => {
    render(CodeSandbox, {
      props: {
        sandboxId: "abc123",
        fontSize: 12,
        hideNavigation: 0,
        theme: "light"
      },
      global: {
        stubs: {
          VPButton: VPButton
        }
      }
    });

    expect(screen.getByRole("button")).toHaveTextContent("Start sandbox");

    screen.getByRole("button").click();

    const iframe = await waitFor(() => {
      return screen.getByTestId("iframe-sandbox");
    });

    await expect(iframe).toHaveAttribute(
      "src",
      "https://codesandbox.io/embed/abc123?fontsize=12&hidenavigation=0&theme=light"
    );
  });
});
