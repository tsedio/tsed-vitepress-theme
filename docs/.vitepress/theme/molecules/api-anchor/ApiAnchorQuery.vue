<script setup lang="ts">
import {computed, useSlots} from "vue";
import {useApiContent} from "../../composables/api/useApiContent.js";
import {useFilter} from "../../composables/filters/useFilter.js";
import type {ApiSymbol} from "../../composables/api/interfaces/Api";
import {mapSymbols} from "../../composables/api/mapSymbols.js";
import ApiAnchor from "./ApiAnchor.vue";

interface Props {
  name?: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: ""
});

const slots = useSlots();
const {data, error, isFetching} = useApiContent();

const name = computed(() => {
  return props.name || String(slots.default!()[0].children).trim();
});

const filter = useFilter<ApiSymbol>(`symbolName === "${name.value}"`);

const item = computed(() => {
  if (isFetching.value || error.value || !data.value) {
    return {symbolName: name.value} as ApiSymbol;
  }

  return (filter(mapSymbols(data.value))[0] || {symbolName: name}) as ApiSymbol;
});
</script>
<template>
  <ApiAnchor v-bind="item" />
</template>
