import {computed, ref, type Ref} from "vue";

export function useCopyPage(markdownUrl: Ref<string>) {
  const copyStatus = ref<"idle" | "copying" | "copied" | "error">("idle");

  const copyLabel = computed(() => {
    if (copyStatus.value === "copying") return "Copying...";
    if (copyStatus.value === "copied") return "Copied";
    if (copyStatus.value === "error") return "Copy failed";

    return "Copy Page";
  });

  async function copyPage() {
    if (!markdownUrl.value) {
      return;
    }

    copyStatus.value = "copying";

    try {
      const response = await fetch(markdownUrl.value);

      if (!response.ok) {
        throw new Error(`Unable to fetch markdown content from ${markdownUrl.value}`);
      }

      const markdownContent = await response.text();
      await navigator.clipboard.writeText(markdownContent);
      copyStatus.value = "copied";
    } catch (er) {
      copyStatus.value = "error";
      console.error(er);
    } finally {
      window.setTimeout(() => {
        copyStatus.value = "idle";
      }, 1800);
    }
  }

  return {
    copyStatus,
    copyLabel,
    copyPage
  };
}
