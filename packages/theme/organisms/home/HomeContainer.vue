<script setup lang="ts">
import {defineProps, ref, watch, withDefaults} from "vue";
import {useElementVisibility} from "@vueuse/core";

interface HomeContainerProps {
  animate?: boolean;
}

const props = withDefaults(defineProps<HomeContainerProps>(), {
  animate: false
});
const target = ref(null);
const targetIsVisible = useElementVisibility(target, {
  threshold: 0.3
});
const show = ref(!props.animate);

watch(targetIsVisible, () => {
  show.value = show.value || targetIsVisible.value;
});
</script>
<template>
  <div class="w-full" :class="{'max-w-[100vw] overflow-x-hidden overflow-y-visible': animate}">
    <div
        ref="target"
        class="VPContainer"
        :class="{
      'opacity-0 scale-105 translate-y-6': !show,
      'opacity-1 scale-100 translate-y-0': show,
      'transition-all ease-in-out delay-200 duration-1000': props.animate
    }"
    >
      <div class="container">
        <slot/>
      </div>
    </div>
  </div>
</template>
<style scoped>
.VPContainer {
  position: relative;
  padding: 0 24px;
}

@media (min-width: 640px) {
  .VPContainer {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .VPContainer {
    padding: 0 64px;
  }
}

.container {
  @apply mx-auto;
  margin: 0 auto;
  max-width: 1152px;
}
</style>
