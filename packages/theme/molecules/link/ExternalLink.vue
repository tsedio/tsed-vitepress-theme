<script setup lang="ts">
interface Props {
  href?: string;
}

const props = withDefaults(defineProps<Props>(), {
  href: ""
});
</script>
<template>
  <a :href="props.href"><slot /></a>
</template>
