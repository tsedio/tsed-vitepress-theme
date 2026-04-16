import {describe, expect, it, vi} from "vitest";
import {useMarkdownLink} from "./useMarkdownLink";

const mocks = vi.hoisted(() => {
  return {
    page: {__v_isRef: true, value: {relativePath: "docs/controllers.md", path: "/docs/controllers.html"}},
    withBase: vi.fn((url: string) => `/base${url}`)
  };
});

vi.mock("vitepress/client", () => {
  return {
    useData: () => ({
      page: mocks.page
    }),
    withBase: (url: string) => mocks.withBase(url)
  };
});

describe("useMarkdownLink", () => {
  it("should use relativePath when available", () => {
    mocks.page.value = {
      relativePath: "docs/controllers.md",
      path: "/docs/controllers.html"
    };

    expect(useMarkdownLink().value).toEqual({
      url: "/base/ai/docs/controllers.md",
      text: "View as markdown"
    });
    expect(mocks.withBase).toHaveBeenCalledWith("/ai/docs/controllers.md");
  });

  it("should fallback to page.path and convert .html to .md", () => {
    mocks.page.value = {
      relativePath: "",
      path: "/docs/controllers.html"
    };

    expect(useMarkdownLink().value).toEqual({
      url: "/base/ai/docs/controllers.md",
      text: "View as markdown"
    });
    expect(mocks.withBase).toHaveBeenCalledWith("/ai/docs/controllers.md");
  });

  it("should convert index.html to index.md in fallback mode", () => {
    mocks.page.value = {
      relativePath: "",
      path: "/docs/index.html"
    };

    expect(useMarkdownLink().value).toEqual({
      url: "/base/ai/docs/index.md",
      text: "View as markdown"
    });
    expect(mocks.withBase).toHaveBeenCalledWith("/ai/docs/index.md");
  });
});
