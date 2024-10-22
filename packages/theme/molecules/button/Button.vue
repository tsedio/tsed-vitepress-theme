<script setup lang="ts">
import {computed, useSlots} from "vue";

export interface ButtonProps {
  tag?: string;
  size?: "medium" | "big";
  theme?: "brand" | "alt" | "sponsor";
  href?: string;
  target?: string;
  rel?: string;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  size: "medium",
  theme: "brand"
});

const slots = useSlots();
const text = computed(() => {
  return String(slots.default!()[0].children).trim();
});
</script>
<template>
  <VPButton v-bind="props" :text="text" />
</template>
