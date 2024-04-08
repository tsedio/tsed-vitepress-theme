<script setup lang="ts">
import Link from "../link/ExternalLink.vue";
import type {GitHubUser} from "../../composables/api/interfaces/GithubUser";
import {computed} from "vue";

export interface ButtonBadgeProps {
  showTitle: boolean;
  width: string | number;
  bgColor: string;
  color: string;
  blur: number;
  textSize: string;
  shadow: string;
  padding: string | number;
  fontWeight: string;
}

const props = withDefaults(
  defineProps<{
    item: GitHubUser;
    showTitle: boolean;
    width: string | number;
    bgColor: string;
    color: string;
    blur: number;
    textSize: string;
    shadow: string;
    padding: string | number;
    fontWeight: string;
  }>(),
  {
    showTitle: true,
    width: 60,
    bgColor: "gray-lighter",
    color: "blue",
    blur: 0,
    textSize: "xxs",
    shadow: "",
    padding: 5,
    fontWeight: "400"
  }
);

const imageContainerStyle = computed(() => ({
  width: `${props.width}px`,
  height: `${props.width}px`
}));

const overlayStyle = computed(() => ({
  width: `${props.width}px`,
  top: "5px",
  height: `${props.width}px`
}));
</script>

<template>
  <Link
    :href="item?.href"
    outbound="false"
    :title="item?.login"
    class="flex flex-col reset-link transition-all duration-500 ease-in-out relative no-underline hover:scale-110"
    :class="[`text-${textSize}`, `text-${color}`, `hover:text-${color}-active`]"
  >
    <figure
      v-lazyload-observer
      class="flex items-center justify-center relative z-2 rounded-medium overflow-hidden mb-2"
      :class="[`bg-${bgColor}`, `shadow-${shadow}`, `p-${padding}`]"
      :style="imageContainerStyle"
    >
      <img v-if="item?.src" :data-url="item.src" class="w-full opacity-0 transition-all no-shadow" />
    </figure>
    <span
      v-if="blur > 0 && item?.src"
      v-lazyload-observer
      class="overflow-hidden z-1 rounded-medium absolute left-0 opacity-50"
      :class="`filter-blur-${blur}`"
      :style="overlayStyle"
      data-testid="blurred-overlay"
    >
      <img :data-url="item?.src" :alt="item?.login" class="w-full opacity-0 transition-all" />
    </span>
    <span
      v-show="showTitle"
      class="flex items-center justify-center whitespace-pre"
      :class="`font-${fontWeight}`"
      :style="{width: `${width}px`}"
    >
      {{ item?.login }}
    </span>
  </Link>
</template>
