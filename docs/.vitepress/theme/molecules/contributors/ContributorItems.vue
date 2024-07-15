<script setup lang="ts">
import type {GitHubUser} from "../../composables/api/interfaces/GithubUser";
import ButtonBadges from "../button-badge/ButtonBadges.vue";
import type {ButtonBadgeProps} from "../button-badge/ButtonBadge.vue";

interface Props extends ButtonBadgeProps {
  items: GitHubUser[];
  innerPadding?: number;
  liClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  showTitle: true,
  width: 60,
  bgColor: "gray-lighter",
  blur: 0,
  textSize: "xxs",
  padding: 5,
  innerPadding: 0,
  liClass: ""
});
</script>

<template>
  <ButtonBadges
    v-if="items.length"
    v-bind="props"
    :items="
      items.map((item) => ({
        ...item,
        href: item.html_url || item.href,
        src: item.avatar_url || item.src,
        title: item.login
      }))
    "
  />
</template>
