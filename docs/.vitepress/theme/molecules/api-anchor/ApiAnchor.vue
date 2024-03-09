<script setup lang="ts">
import {computed} from "vue";
import {useApiLink} from "../../composables/api/useApiLink.js";
import type {ApiSymbol} from "../../composables/api/interfaces/Api";
import "./ApiAnchor.css";
import ApiIcon from "../../atoms/api-icon/ApiIcon.vue";

interface Props extends ApiSymbol {
  theme?: "bubble" | "list";
}

const props = withDefaults(defineProps<Props>(), {
  status: () => [],
  theme: "bubble"
});

const deprecated = computed(() => {
  return props.status?.find((status) => status === "deprecated");
});

const resolver = useApiLink();
const link = computed(() => {
  return resolver(props);
});
</script>
<template>
  <a
    :href="link"
    data-name="ApiAnchor"
    :class="`reset-link -${theme} ${deprecated ? 'opacity-50' : ''}`"
    :title="props.symbolName"
  >
    <span><ApiIcon :type="props.symbolType" /></span>
    <span :class="`${deprecated ? 'line-through' : ''}`">
      {{ props.symbolName }}
    </span>
  </a>
</template>
