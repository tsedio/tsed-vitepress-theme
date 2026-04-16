<script setup lang="ts">
import AIContentDropdown from "./AIContentDropdown.vue";
import PageNavigationButtons from "./PageNavigationButtons.vue";
</script>

<template>
  <div class="wrapper-vp-content-actions">
    <div class="vp-content-actions">
      <AIContentDropdown />
      <PageNavigationButtons />
    </div>
  </div>
</template>

<style scoped>
.wrapper-vp-content-actions {
  position: relative;
  z-index: 1;
}

.vp-content-actions {
  position: absolute;
  top: 5px;
  right: 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.vp-content-actions :deep(.vp-ai-content-actions) {
  margin: 0;
  display: flex;
  align-items: center;
}

.vp-content-actions :deep(.vp-ai-content-menu > summary) {
  min-height: 28px;
  box-sizing: border-box;
}

@media (max-width: 960px) {
  .vp-content-actions {
    position: static;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
