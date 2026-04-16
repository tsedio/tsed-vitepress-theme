import {describe, expect, it, vi} from "vitest";
import {useEditLink} from "./useEditLink";

const mocks = vi.hoisted(() => {
  return {
    theme: {__v_isRef: true, value: {editLink: {pattern: "", text: ""}} as any},
    page: {__v_isRef: true, value: {filePath: "docs/controllers.md"}}
  };
});

vi.mock("vitepress/client", () => {
  return {
    useData: () => ({
      theme: mocks.theme,
      page: mocks.page
    })
  };
});

describe("useEditLink", () => {
  it("should resolve url from string pattern and keep custom text", () => {
    mocks.theme.value = {
      editLink: {
        pattern: "https://github.com/tsedio/tsed/edit/main/:path",
        text: "Edit content"
      }
    };
    mocks.page.value = {filePath: "docs/controllers.md"};

    expect(useEditLink().value).toEqual({
      url: "https://github.com/tsedio/tsed/edit/main/docs/controllers.md",
      text: "Edit content"
    });
  });

  it("should resolve url from pattern function", () => {
    mocks.theme.value = {
      editLink: {
        pattern: (page: {filePath: string}) => `https://example.dev/edit/${page.filePath}`
      }
    } as any;
    mocks.page.value = {filePath: "docs/services.md"};

    expect(useEditLink().value).toEqual({
      url: "https://example.dev/edit/docs/services.md",
      text: "Edit this page"
    });
  });

  it("should fallback to empty url and default text when config is missing", () => {
    mocks.theme.value = {} as any;
    mocks.page.value = {filePath: "docs/hooks.md"};

    expect(useEditLink().value).toEqual({
      url: "",
      text: "Edit this page"
    });
  });
});
