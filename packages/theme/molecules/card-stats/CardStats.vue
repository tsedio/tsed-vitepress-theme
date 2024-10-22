<script setup lang="ts">
import {computed, withDefaults} from "vue";
import {formatNumber} from "../../utils/format";

export interface WarehouseStatsProps {
  items: {label: string; value: number}[];
  id?: string;
}

const props = withDefaults(defineProps<WarehouseStatsProps>(), {
  id: "card-stats-item",
  items: () => []
});

const items = computed(() => {
  return props.items.map((item) => {
    return {
      label: item.label,
      value: item.value ? formatNumber(item.value) : "-"
    };
  });
});
</script>
<template>
  <dl class="bg-white dark:bg-[#444e60] rounded-lg shadow-lg sm:grid" :class="`sm:grid-cols-${items.length}`">
    <div
      v-for="(item, index) in items"
      :key="item.label"
      class="flex justify-center p-4 text-center border-t border-b border-gray-lighter sm:flex-col sm:p-6 sm:border-0 border-gray-lighter dark:border-gray-800"
      :class="{
        'sm:border-l': index > 0,
        'sm:border-r': index < items.length - 1
      }"
    >
      <dt
        :id="`${props.id}-${index}`"
        class="order-2 ml-2 font-medium leading-6 text-gray-darker sm:mt-2 sm:ml-0 sm:text-md sm:capitalize"
      >
        {{ item.label }}
      </dt>
      <dd
        :aria-describedby="`${props.id}-${index}`"
        :data-testid="`${props.id}-${index}`"
        class="order-1 text-2xl font-extrabold leading-none text-blue-active dark:text-primary sm:text-4xl"
      >
        {{ item.value }}
      </dd>
    </div>
  </dl>
</template>
