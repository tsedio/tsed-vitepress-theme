import {computed, type Ref} from "vue";

function toAbsoluteUrl(url: string) {
  if (!url || url.startsWith("http") || typeof window === "undefined") {
    return url;
  }

  return new URL(url, window.location.origin).toString();
}

export function useChatGPTLink(markdownUrl: Ref<string>) {
  return computed(() => {
    const absoluteMarkdownUrl = toAbsoluteUrl(markdownUrl.value);
    const prompt = `Please answer using this markdown source: ${absoluteMarkdownUrl}`;

    return `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
  });
}
