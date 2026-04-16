import {fireEvent, render, screen, waitFor} from "@testing-library/vue";
import {beforeEach, describe, expect, it, vi} from "vitest";
import AIContentDropdown from "./AIContentDropdown.vue";

const mocks = vi.hoisted(() => {
  return {
    theme: {__v_isRef: true, value: {enableAIContent: true}},
    frontmatter: {__v_isRef: true, value: {} as Record<string, unknown>},
    editLink: {
      __v_isRef: true,
      value: {url: "https://github.com/tsedio/tsed/edit/main/docs/controllers.md", text: "Edit this page"}
    },
    markdownLink: {__v_isRef: true, value: {url: "/ai/docs/controllers.md", text: "View as markdown"}}
  };
});

vi.mock("vitepress/client", () => {
  return {
    useData: () => ({
      theme: mocks.theme,
      frontmatter: mocks.frontmatter
    })
  };
});

vi.mock("../../composables/config/useEditLink", () => {
  return {
    useEditLink: () => mocks.editLink
  };
});

vi.mock("../../composables/config/useMarkdownLink", () => {
  return {
    useMarkdownLink: () => mocks.markdownLink
  };
});

describe("AIContentDropdown", () => {
  beforeEach(() => {
    mocks.theme.value = {enableAIContent: true};
    mocks.frontmatter.value = {};
    mocks.editLink.value = {url: "https://github.com/tsedio/tsed/edit/main/docs/controllers.md", text: "Edit this page"};
    mocks.markdownLink.value = {url: "/ai/docs/controllers.md", text: "View as markdown"};

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve("# Controllers markdown")
      })
    );

    Object.defineProperty(window.navigator, "clipboard", {
      value: {
        writeText: vi.fn().mockResolvedValue(undefined)
      },
      configurable: true
    });
  });

  it("should not render when AI content is disabled", () => {
    mocks.theme.value = {enableAIContent: false};

    render(AIContentDropdown);

    expect(screen.queryByRole("button", {name: "Copy Page"})).not.toBeInTheDocument();
  });

  it("should copy markdown content to clipboard when clicking Copy Page", async () => {
    const {container} = render(AIContentDropdown);
    const copyButton = screen.getByRole("button", {name: "Copy Page"});

    await fireEvent.click(copyButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/ai/docs/controllers.md");
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("# Controllers markdown");
    });

    const details = container.querySelector("details") as HTMLDetailsElement;
    expect(details.open).toBe(false);
  });

  it("should open menu only when clicking the arrow button and close on outside click", async () => {
    const {container} = render(AIContentDropdown);
    const details = container.querySelector("details") as HTMLDetailsElement;
    const menuButton = screen.getByRole("button", {name: "Toggle actions menu"});
    const copyButton = screen.getByRole("button", {name: "Copy Page"});

    await fireEvent.click(copyButton);
    expect(details.open).toBe(false);

    await fireEvent.click(menuButton);
    expect(details.open).toBe(true);

    await fireEvent.click(document.body);
    expect(details.open).toBe(false);
  });

  it("should generate ChatGPT and Claude links with absolute markdown URL", async () => {
    render(AIContentDropdown);

    const menuButton = screen.getByRole("button", {name: "Toggle actions menu"});
    await fireEvent.click(menuButton);

    const markdownAbsoluteUrl = `${window.location.origin}/ai/docs/controllers.md`;
    const encodedPrompt = encodeURIComponent(`Please answer using this markdown source: ${markdownAbsoluteUrl}`);

    expect(screen.getByRole("link", {name: "Open in ChatGPT"})).toHaveAttribute(
      "href",
      `https://chatgpt.com/?q=${encodedPrompt}`
    );
    expect(screen.getByRole("link", {name: "Open in Claude"})).toHaveAttribute("href", `https://claude.ai/new?q=${encodedPrompt}`);
  });
});
