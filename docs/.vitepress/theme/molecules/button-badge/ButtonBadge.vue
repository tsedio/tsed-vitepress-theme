<script setup lang="ts">
import Link from "../link/ExternalLink.vue";
import {computed} from "vue";
import {FILTER_BLURS, FONT_WEIGHT, TEXT_SIZES} from "../../atoms/tailwind.constants";

export interface ButtonBadgeProps {
  showTitle?: boolean;
  width?: string | number;
  bgColor?: string;
  blur?: keyof typeof FILTER_BLURS;
  textSize?: keyof typeof TEXT_SIZES;
  shadow?:
    | "none"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "inner"
    | "outline"
    | "dark-lg"
    | "dark-xl"
    | "dark-2xl"
    | "dark-inner"
    | "dark-outline"
    | "dark-none"
    | "dark-sm"
    | "dark-md";
  padding?: number;
  fontWeight?: keyof typeof FONT_WEIGHT;
}

export interface Props extends ButtonBadgeProps {
  title?: string;
  src?: string;
  href?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showTitle: true,
  width: 60,
  bgColor: "gray-lighter",
  blur: 0,
  textSize: "xxs",
  shadow: "none",
  padding: 0,
  fontWeight: "normal",
  title: "",
  src: "",
  href: ""
});

const imageContainerStyle = computed(() => ({
  width: `${props.width}px`,
  height: `${props.width}px`
}));

const overlayStyle = computed(() => ({
  width: `${props.width}px`,
  top: "5px",
  height: `${props.width}px`
}));

const initial = (text = "") => {
  return text
    .split(" ")
    .map((text) => text.slice(0, 1))
    .join("");
};
const overflow = (text = "") => {
  return text.slice(0, 12) + (text.length > 12 ? "..." : "");
};
</script>

<template>
  <Link :href="href" outbound="false" :title="title" class="button-badge block reset-link">
    <span
      data-testid="button-badge-content"
      class="flex flex-col transition-all relative no-underline"
      :class="[textSize && `text-${textSize}`]"
    >
      <figure
        v-lazyload-observer
        class="flex items-center justify-center relative z-2 rounded-2xl overflow-hidden mb-2"
        :class="[bgColor && `bg-${bgColor}`, shadow && `shadow-${shadow}`, padding && `p-${padding}`]"
        :style="imageContainerStyle"
      >
        <img v-if="src" :data-url="src" class="w-full opacity-0 rounded-2xl transition-all no-shadow" />
        <span v-else class="flex items-center justify-center font-bold uppercase text-2xl h-full">{{
          initial(title)
        }}</span>
      </figure>
      <span
        v-if="blur > 0 && src"
        v-lazyload-observer
        class="overflow-hidden z-1 rounded-2xl absolute left-0 opacity-50"
        :class="FILTER_BLURS[blur]"
        :style="overlayStyle"
        data-testid="blurred-overlay"
      >
        <img :data-url="src" :alt="initial(title)" class="w-full opacity-0 transition-all" />
      </span>
      <span
        v-show="showTitle"
        class="flex items-center justify-center whitespace-pre"
        :class="FONT_WEIGHT[fontWeight]"
        :style="{width: `${width}px`}"
      >
        {{ overflow(title) }}
      </span>
    </span>
  </Link>
</template>
<style>
.vp-doc a.button-badge {
  @apply transition-all scale-100 hover:scale-110 focus:scale-110;
  outline: none;
}
.vp-doc a.button-badge:focus-visible {
  outline: none !important;
}
</style>
