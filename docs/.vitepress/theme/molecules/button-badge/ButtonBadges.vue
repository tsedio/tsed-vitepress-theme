<script setup lang="ts">
import ButtonBadge, {type ButtonBadgeProps} from "./ButtonBadge.vue";

interface Props extends ButtonBadgeProps {
  items: {title?: string; href?: string; src?: string}[];
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
  shadow: "none",
  padding: 5,
  fontWeight: "normal"
});

const {items, ...otherProps} = props;
const {padding, liClass} = props;
</script>

<template>
  <ul class="mb-5 reset-list flex flex-wrap items-center" :class="[padding && `gap-${padding}`]">
    <li v-for="item in items" :key="item.title" :class="[liClass]">
      <ButtonBadge v-bind="otherProps" :title="item.title" :href="item.href" :src="item.src" :padding="innerPadding" />
    </li>
  </ul>
</template>
