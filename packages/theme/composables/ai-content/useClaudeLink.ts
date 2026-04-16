import {computed, ref, type Ref} from "vue";

function toAbsoluteUrl(url: string, origin: string) {
  if (!url || url.startsWith("http")) {
    return url;
  }

  if (!origin) {
    return url;
  }

  return new URL(url, origin).toString();
}

export function useClaudeLink(markdownUrl: Ref<string>) {
  const origin = ref(typeof window !== "undefined" ? window.location.origin : "");

  return computed(() => {
    const absoluteMarkdownUrl = toAbsoluteUrl(markdownUrl.value, origin.value);
    const prompt = `Please answer using this markdown source: ${absoluteMarkdownUrl}`;

    return `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;
  });
}
