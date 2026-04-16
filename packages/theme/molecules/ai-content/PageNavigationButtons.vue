<script setup lang="ts">
import {ArrowLeft, ArrowRight} from "lucide-vue-next";

function goPrevious() {
  if (typeof window === "undefined") {
    return;
  }

  window.history.back();
}

function goNext() {
  if (typeof window === "undefined") {
    return;
  }

  window.history.forward();
}
</script>

<template>
  <button type="button" class="vp-content-nav-button" aria-label="Go to previous page" @click="goPrevious">
    <ArrowLeft :size="14" />
  </button>
  <button type="button" class="vp-content-nav-button" aria-label="Go to next page" @click="goNext">
    <ArrowRight :size="14" />
  </button>
</template>

<style scoped>
.vp-content-nav-button {
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.vp-content-nav-button:hover {
  background: var(--vp-c-bg-mute);
}
</style>
