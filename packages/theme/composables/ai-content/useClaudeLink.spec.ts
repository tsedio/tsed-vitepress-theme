import {ref} from "vue";
import {describe, expect, it} from "vitest";
import {useClaudeLink} from "./useClaudeLink";

describe("useClaudeLink", () => {
  it("should use configured siteUrl to build absolute markdown URL", () => {
    const markdownUrl = ref("/ai/docs/controllers.md");
    const siteUrl = ref("https://tsed.dev");
    const prompt = "Please answer using this markdown source: https://tsed.dev/ai/docs/controllers.md";

    expect(useClaudeLink(markdownUrl, siteUrl).value).toBe(`https://claude.ai/new?q=${encodeURIComponent(prompt)}`);
  });

  it("should keep absolute markdown URL unchanged", () => {
    const markdownUrl = ref("https://cdn.example.com/ai/docs/controllers.md");
    const siteUrl = ref("https://tsed.dev");
    const prompt = "Please answer using this markdown source: https://cdn.example.com/ai/docs/controllers.md";

    expect(useClaudeLink(markdownUrl, siteUrl).value).toBe(`https://claude.ai/new?q=${encodeURIComponent(prompt)}`);
  });

  it("should keep relative markdown URL when siteUrl is missing", () => {
    const markdownUrl = ref("/ai/docs/controllers.md");
    const siteUrl = ref("");
    const prompt = "Please answer using this markdown source: /ai/docs/controllers.md";

    expect(useClaudeLink(markdownUrl, siteUrl).value).toBe(`https://claude.ai/new?q=${encodeURIComponent(prompt)}`);
  });
});
