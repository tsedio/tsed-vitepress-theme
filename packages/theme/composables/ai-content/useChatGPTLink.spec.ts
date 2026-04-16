import {ref} from "vue";
import {describe, expect, it} from "vitest";
import {useChatGPTLink} from "./useChatGPTLink";

describe("useChatGPTLink", () => {
  it("should build a link with absolute markdown URL from a relative path", () => {
    const markdownUrl = ref("/ai/docs/controllers.md");
    const prompt = `Please answer using this markdown source: ${window.location.origin}/ai/docs/controllers.md`;

    expect(useChatGPTLink(markdownUrl).value).toBe(`https://chatgpt.com/?q=${encodeURIComponent(prompt)}`);
  });

  it("should keep absolute markdown URL unchanged", () => {
    const markdownUrl = ref("https://cdn.example.com/ai/docs/controllers.md");
    const prompt = "Please answer using this markdown source: https://cdn.example.com/ai/docs/controllers.md";

    expect(useChatGPTLink(markdownUrl).value).toBe(`https://chatgpt.com/?q=${encodeURIComponent(prompt)}`);
  });
});
