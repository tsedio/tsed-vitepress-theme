<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import {computed, useSlots} from "vue";
import AIContentDropdown from "../molecules/ai-content/AIContentDropdown.vue";

const slots = useSlots();

const forwardedSlots = computed(() => {
  return Object.keys(slots).filter((name) => name !== "doc-before");
});
</script>

<template>
  <component :is="DefaultTheme.Layout">
    <template v-for="name in forwardedSlots" :key="name" v-slot:[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>

    <template #doc-before>
      <slot name="doc-before" />
      <div class="wrapper-vp-content-actions">
        <div class="vp-content-actions">
          <AIContentDropdown />
        </div>
      </div>
    </template>
  </component>
</template>

<style>
.wrapper-vp-content-actions {
  position: relative;
  z-index: 1
}

.vp-content-actions {
  position: absolute;
  top: 5px;
  right: 0;
}

@media (max-width: 960px) {
  .vp-content-actions {
    position: static;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
