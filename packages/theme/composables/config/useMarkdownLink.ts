import {computed} from "vue";
import {useData, withBase} from "vitepress/client";

export function useMarkdownLink() {
  const {page} = useData();

  return computed(() => {
    const text = "View as markdown";
    const relativePath = page.value.relativePath;

    if (relativePath) {
      return {
        url: withBase(`/ai/${relativePath}`),
        text
      };
    }

    const routePath = ((page.value as {path?: string}).path || "").replace(/^\//, "");
    const fallbackPath = routePath || page.value.filePath || relativePath || "";
    const markdownPath = routePath
      .replace(/index\.html$/, "index.md")
      .replace(/\.html$/, ".md");
    const normalizedMarkdownPath = markdownPath || fallbackPath;

    return {
      url: withBase(`/ai/${normalizedMarkdownPath}`),
      text
    };
  });
}
