<script setup lang="ts">
import ButtonBadge, {type ButtonBadgeProps} from "./ButtonBadge.vue";
import type {GitHubUser} from "../../composables/api/interfaces/GithubUser";

interface Props extends ButtonBadgeProps {
  items: GitHubUser[];
  innerPadding?: number;
  liClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  innerPadding: 0,
  liClass: "",
  showTitle: true,
  width: 60,
  bgColor: "gray-lighter",
  color: "blue",
  blur: 0,
  textSize: "xxs",
  shadow: "",
  padding: 5,
  fontWeight: "400"
});

const {padding, liClass, items} = props;
</script>

<template>
  <div :class="`-m-${padding} mb-5`">
    <ul class="reset-list flex flex-wrap items-center">
      <li v-for="item in items" :key="item.login" :class="['px-' + padding, liClass]">
        <ButtonBadge v-bind="props" :item="item" />
      </li>
    </ul>
  </div>
</template>
