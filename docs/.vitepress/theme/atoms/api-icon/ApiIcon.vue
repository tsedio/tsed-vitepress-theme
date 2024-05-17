<script setup lang="ts">
import type {ApiSymbolType} from "../../composables/api/interfaces/Api.js";
import "./ApiIcon.css";

interface Props {
  type?: ApiSymbolType;
}

const props = withDefaults(defineProps<Props>(), {
  type: "class"
});
</script>
<template>
  <span data-name="ApiIcon" :data-type="props.type" data-testid="ApiIcon" />
</template>
