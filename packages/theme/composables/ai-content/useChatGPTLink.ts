import {computed, type Ref} from "vue";

function toAbsoluteUrl(url: string, origin: string) {
  if (!url || url.startsWith("http")) {
    return url;
  }

  if (!origin) {
    return url;
  }

  return new URL(url, origin).toString();
}

export function useChatGPTLink(markdownUrl: Ref<string>, siteUrl: Ref<string>) {
  return computed(() => {
    const absoluteMarkdownUrl = toAbsoluteUrl(markdownUrl.value, siteUrl.value);
    const prompt = `Please answer using this markdown source: ${absoluteMarkdownUrl}`;

    return `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
  });
}
