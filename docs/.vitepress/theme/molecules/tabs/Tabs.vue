<script setup lang="ts">
import {onMounted, ref, useSlots} from "vue";

export interface TabsProps {
  name?: string;
}

const props = withDefaults(defineProps<TabsProps>(), {
  name: "code"
});
const tabs = ref<{title: string}[]>([]);
const slots = useSlots();

onMounted(() => {
  tabs.value = (slots.default?.() ?? [])
    .filter((child: any) => child.type.__name === "Tab")
    .map((tabComponent: any) => ({
      title: tabComponent.props.title
    }));
});
</script>
<template>
  <div class="vp-code-group vp-adaptive-theme">
    <div class="tabs">
      <template v-for="(item, index) in tabs" :key="item.title">
        <input :id="'tab-' + item.title" type="radio" :name="'group-' + props.name" :checked="index === 0" />
        <label :for="'tab-' + item.title">{{ item.title }}</label>
      </template>
    </div>
    <div class="blocks">
      <slot />
    </div>
  </div>
</template>
