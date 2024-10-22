<script setup lang="ts">
import ButtonBadge, {type ButtonBadgeProps} from "../button-badge/ButtonBadge.vue";
import {useInterval} from "@vueuse/core";
import {watch} from "vue";
import {useRandomItems} from "../../composables/randomize/useRandom";

export interface Framework {
  id: number;
  title: string;
  href: string;
  src: string;
}

export interface FrameworksProps extends ButtonBadgeProps {
  innerPadding?: number;
  maxItems?: number;
  numberToChange?: number;
  delay?: number;
  items?: Framework[];
}

const props = withDefaults(defineProps<FrameworksProps>(), {
  width: 80,
  bgColor: "purple-50 dark:bg-api-default",
  textSize: "sm",
  blur: 0,
  shadow: "none",
  innerPadding: 4,
  maxItems: 15,
  numberToChange: 1,
  delay: 1500,
  items: () => []
});

const counter = useInterval(props.delay, {});
const {items, update} = useRandomItems({
  maxItems: props.maxItems,
  numberToChange: props.numberToChange,
  initItems: props.items
});

watch(counter, () => {
  update();
});

update();

function beforeLeave(el: any) {
  const {marginLeft, marginTop, width, height} = window.getComputedStyle(el);
  el.style.left = `${el.offsetLeft - parseFloat(marginLeft)}px`;
  el.style.top = `${el.offsetTop - parseFloat(marginTop)}px`;
  el.style.width = width;
  el.style.height = height;
}
</script>
<template>
  <ul name="list" tag="ul" class="mb-5 reset-list flex flex-wrap items-center gap-5" @before-leave="beforeLeave">
    <li v-for="item in items" :key="item.id" class="w-1/5 sm:w-auto relative">
      <ButtonBadge
        v-bind="props"
        :title="item.title"
        :href="item.href"
        :src="item.src"
        :padding="innerPadding"
        show-title
      />
    </li>
  </ul>
</template>
<style scoped>
.list-item {
  transition: all 1.5s ease;
}

.list-enter-active,
.list-leave-active {
  transition:
    opacity 1.5s,
    transform 1.5s;
}

.list-leave-active {
  position: absolute;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
