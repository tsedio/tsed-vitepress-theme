import {ref} from "vue";
import {beforeEach, describe, expect, it, vi} from "vitest";
import {useCopyPage} from "./useCopyPage";

describe("useCopyPage", () => {
  beforeEach(() => {
    vi.useFakeTimers();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve("# Markdown content")
      })
    );

    Object.defineProperty(window.navigator, "clipboard", {
      value: {
        writeText: vi.fn().mockResolvedValue(undefined)
      },
      configurable: true
    });
  });

  it("should do nothing when markdown URL is empty", async () => {
    const markdownUrl = ref("");
    const {copyPage, copyStatus, copyLabel} = useCopyPage(markdownUrl);

    await copyPage();

    expect(fetch).not.toHaveBeenCalled();
    expect(copyStatus.value).toBe("idle");
    expect(copyLabel.value).toBe("Copy Page");
  });

  it("should fetch markdown and copy it to clipboard", async () => {
    const markdownUrl = ref("/ai/docs/controllers.md");
    const {copyPage, copyStatus, copyLabel} = useCopyPage(markdownUrl);

    await copyPage();

    expect(fetch).toHaveBeenCalledWith("/ai/docs/controllers.md");
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("# Markdown content");
    expect(copyStatus.value).toBe("copied");
    expect(copyLabel.value).toBe("Copied");

    vi.advanceTimersByTime(1800);
    expect(copyStatus.value).toBe("idle");
  });

  it("should set error status when fetch fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        text: () => Promise.resolve("")
      })
    );
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const markdownUrl = ref("/ai/docs/controllers.md");
    const {copyPage, copyStatus, copyLabel} = useCopyPage(markdownUrl);

    await copyPage();

    expect(copyStatus.value).toBe("error");
    expect(copyLabel.value).toBe("Copy failed");
    expect(navigator.clipboard.writeText).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1800);
    expect(copyStatus.value).toBe("idle");

    consoleSpy.mockRestore();
  });
});
