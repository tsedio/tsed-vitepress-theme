<script setup lang="ts">
import {defineProps, withDefaults} from "vue";

interface TabProps {
  active?: boolean;
}

const props = withDefaults(defineProps<TabProps>(), {
  active: false
});
</script>
<template>
  <div :class="['vp-adaptive-theme', props.active ? 'active' : '']">
    <slot />
  </div>
</template>
