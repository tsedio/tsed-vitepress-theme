<script setup lang="ts">
import type {GitHubUser} from "../../composables/api/interfaces/GithubUser";
import ButtonBadges from "../button-badge/ButtonBadges.vue";

const props = withDefaults(defineProps<{items: GitHubUser[]; liClass: string}>(), {
  items: () => [],
  showTitle: true,
  width: 60,
  bgColor: "gray-lighter",
  color: "blue",
  blur: 0,
  textSize: "xxs",
  shadow: "",
  padding: 5,
  innerPadding: 0,
  fontWeight: "400",
  liClass: ""
});
</script>

<template>
  <ButtonBadges v-if="items.length" v-bind="props" :items="items" />
</template>
