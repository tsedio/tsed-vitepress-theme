<script setup lang="ts">
import {computed, useSlots} from "vue";
import {useApiContent} from "../../composables/api/useApiContent";
import {useFilter} from "../../composables/filters/useFilter";
import type {ApiSymbol} from "../../composables/api/interfaces/Api";
import {SymbolTypes} from "../../composables/api/SymbolTypes";
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
  const name = props.name || String(slots.default!()[0].children).trim();

  if (name.includes(":")) {
    return name.split(":")[1].trim();
  }

  return name;
});

const code = computed(() => {
  let code = props.name || String(slots.default!()[0].children).trim();

  if (code.includes(":")) {
    return code.split(":")[0].trim();
  }

  return "";
});

const filter = useFilter<ApiSymbol>(`symbolName === "${name.value}"`);

const item = computed(() => {
  if (isFetching.value || error.value || !data.value) {
    return {symbolName: name.value} as ApiSymbol;
  }

  const symbols = Object.values(data.value.modules).flatMap(item => {
    return item.symbols
  });

  const value = filter(symbols)[0];

  if (value) {
    return value;
  }

  const type = SymbolTypes.find(({value}) => value === code.value);

  return {
    name: name.value,
    type: code.value,
    status: [],
    module: "",
    symbolName: name.value,
    symbolLabel: type?.label,
    symbolCode: type?.code,
    symbolType: type?.value
  } as ApiSymbol;
});
defineExpose({name, code});
</script>
<template>
  <ApiAnchor v-bind="item"/>
</template>
