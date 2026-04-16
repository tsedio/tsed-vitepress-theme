<script setup lang="ts">
import type {DefaultTheme as VitePressDefaultTheme} from "vitepress";
import {useData} from "vitepress/client";
import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import {ChevronDown, Copy, FilePenLine, FileText} from "lucide-vue-next";
import ChatGPTIcon from "../../atoms/svg/ChatGPTIcon.vue";
import ClaudeIcon from "../../atoms/svg/ClaudeIcon.vue";
import {useChatGPTLink} from "../../composables/ai-content/useChatGPTLink";
import {useClaudeLink} from "../../composables/ai-content/useClaudeLink";
import {useCopyPage} from "../../composables/ai-content/useCopyPage";
import type {CustomThemeConfig} from "../../composables/config/interfaces/CustomThemeConfig";
import {useEditLink} from "../../composables/config/useEditLink";
import {useMarkdownLink} from "../../composables/config/useMarkdownLink";

const editLink = useEditLink();
const markdownLink = useMarkdownLink();
const {theme, frontmatter} = useData<VitePressDefaultTheme.Config & CustomThemeConfig>();

const showMenu = computed(() => {
  return Boolean(theme.value.enableAIContent !== false && frontmatter.value.layout !== "home");
});
const markdownUrl = computed(() => markdownLink.value.url);
const siteUrl = computed(() => theme.value.siteUrl || "");
const hasSiteUrl = computed(() => Boolean(siteUrl.value));
const chatGPTLink = useChatGPTLink(markdownUrl, siteUrl);
const claudeLink = useClaudeLink(markdownUrl, siteUrl);
const {copyLabel, copyPage} = useCopyPage(markdownUrl);
const detailsRef = ref<HTMLDetailsElement | null>(null);
const isClient = ref(false);

function toggleMenu() {
  if (!detailsRef.value) {
    return;
  }

  detailsRef.value.open = !detailsRef.value.open;
}

function handleClickOutside(event: MouseEvent) {
  if (!detailsRef.value || !detailsRef.value.open) {
    return;
  }

  const target = event.target as Node | null;
  if (target && !detailsRef.value.contains(target)) {
    detailsRef.value.open = false;
  }
}

onMounted(() => {
  isClient.value = true;
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div v-if="showMenu" class="vp-ai-content-actions">
    <details ref="detailsRef" class="vp-ai-content-menu">
      <summary @click.prevent>
        <button type="button" class="vp-ai-copy-trigger" @click.prevent.stop="copyPage">
          <Copy :size="14" />
          {{ copyLabel }}
        </button>
        <span />
        <button
          type="button"
          class="vp-ai-menu-trigger"
          aria-label="Toggle actions menu"
          @click.prevent.stop="toggleMenu"
        >
          <ChevronDown :size="14" />
        </button>
      </summary>
      <ul>
        <li v-if="editLink.url">
          <a :href="editLink.url" target="_blank" rel="noreferrer">
            <FilePenLine :size="14" />
            <span>Edit content</span>
          </a>
        </li>
        <li v-if="markdownLink.url">
          <a :href="markdownLink.url" target="_blank" rel="noreferrer">
            <FileText :size="14" />
            <span>View as markdown</span>
          </a>
        </li>
        <li v-if="markdownLink.url && hasSiteUrl && isClient">
          <a :href="chatGPTLink" target="_blank" rel="noreferrer">
            <ChatGPTIcon class="vp-ai-brand-icon" />
            <span>Open in ChatGPT</span>
          </a>
        </li>
        <li v-if="markdownLink.url && hasSiteUrl && isClient">
          <a :href="claudeLink" target="_blank" rel="noreferrer">
            <ClaudeIcon class="vp-ai-brand-icon" />
            <span>Open in Claude</span>
          </a>
        </li>
      </ul>
    </details>
  </div>
</template>

<style scoped>
.vp-ai-content-menu {
  position: relative;
  display: inline-block;
}

.vp-ai-content-menu > summary {
  list-style: none;
  display: inline-flex;
  align-items: center;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  color: var(--vp-c-text-1);
  font-size: 14px;
  line-height: 1;
  user-select: none;
}

.vp-ai-content-menu > summary > span {
  border-right: 1px solid var(--vp-c-divider);
  display: block;
  height: 18px;
}

.vp-ai-copy-trigger,
.vp-ai-menu-trigger {
  height: 28px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: var(--vp-c-text-1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}
.vp-ai-copy-trigger {
  padding-left: 8px;
  padding-right: 8px;
  display: inline-flex;
  gap: 5px;
  border-radius: 0px 0px 0px 8px;
}

.vp-ai-menu-trigger {
  width: 28px;
  border-radius: 0px 8px 8px 0px;
}

.vp-ai-copy-trigger:hover,
.vp-ai-menu-trigger:hover,
.vp-ai-copy-trigger:focus-visible,
.vp-ai-menu-trigger:focus-visible {
  background: var(--vp-c-bg);
}

.vp-ai-copy-trigger:active,
.vp-ai-menu-trigger:active {
  background: var(--vp-c-bg-soft);
}

.vp-ai-content-menu > summary::-webkit-details-marker {
  display: none;
}

.vp-ai-content-menu > ul {
  display: flex;
  flex-direction: column;
  margin: 8px 0 0;
  padding: 6px;
  min-width: 220px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  box-shadow: var(--vp-shadow-3);
  position: absolute;
  left: 0;
  z-index: 20;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(-6px) scale(0.98);
  transform-origin: top left;
  transition:
    opacity 0.16s ease,
    transform 0.16s ease,
    visibility 0.16s step-end;
}

.vp-ai-content-menu[open] > ul {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateY(0) scale(1);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    visibility 0s step-start;
}

.vp-ai-content-menu li {
  list-style: none;
}

.vp-ai-content-menu li a {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 8px;
  color: var(--vp-c-text-1);
  font-size: 14px;
  text-decoration: none;
}

.vp-ai-content-menu li a:hover {
  background: var(--vp-c-bg-soft);
}

.vp-ai-brand-icon {
  width: 14px;
  height: 14px;
  display: inline-flex;
}
</style>
