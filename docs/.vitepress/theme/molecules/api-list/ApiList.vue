<script setup lang="ts">
import ApiAnchor from "../api-anchor/ApiAnchor.vue";
import {useApiContent} from "../../composables/api/useApiContent.js";
import type {ApiSymbol} from "../../composables/api/interfaces/Api";
import {computed} from "vue";
import {useFilter} from "../../composables/filters/useFilter.js";
import {mapSymbols} from "../../composables/api/mapSymbols.js";

interface Props {
  items?: ApiSymbol[];
  query?: string;
}

const props = withDefaults(defineProps<Props>(), {
  items: undefined,
  query: ""
});

const {data, error, isFetching} = useApiContent();
const filter = useFilter<ApiSymbol>(props.query);

const symbols = computed(() => {
  if (props.items?.length) {
    return props.items;
  }

  if (isFetching.value || error.value || !data.value) {
    return [];
  }

  return filter(mapSymbols(data.value));
});
</script>

<template>
  <div class="bg-gray-100 dark:bg-gray-900 pb-4 p-5 mb-10 rounded-small">
    <div v-if="data && !isFetching" class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="item in symbols" :key="item.symbolName">
        <ApiAnchor class="w-full px-2 py-1" v-bind="item" theme="list" />
      </div>
    </div>
    <span v-else-if="error" class="w-full sm:w-1/3 lg:w-1/4 mb-2 px-2"> Error loading symbols </span>
    <span v-else class="w-full sm:w-1/3 lg:w-1/4 mb-2 px-2"> Loading in progress... </span>
  </div>
</template>
