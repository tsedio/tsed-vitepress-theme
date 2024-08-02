<script setup lang="ts">
import ButtonBadge, {type ButtonBadgeProps} from "../../molecules/button-badge/ButtonBadge.vue";
import {useInterval} from "@vueuse/core";
import {useFrontMatter} from "../../composables/config/useFrontMatter";
import {ref, watch} from "vue";

interface Framework {
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
  delay: 1500
});

const frontmatter = useFrontMatter();

function getFrameworks() {
  return (frontmatter.value.frameworks as Framework[]).map(({title, src, href}, index) => {
    return {
      id: index,
      title,
      src,
      href
    };
  });
}

const counter = useInterval(props.delay, {});
const randomItems = ref<Framework[]>([]);
const shuffledItems = ref<Framework[]>([]);
const lastChangedIndex = ref<number>(-1);
const getRandomIndex = (arrayLength: number) => {
  return Math.floor(Math.random() * arrayLength);
};

const updateRandomItems = () => {
  const items = getFrameworks();

  if (items.length > 0) {
    // Si randomItems est vide, remplir initialement avec 10 éléments aléatoires
    if (randomItems.value.length === 0) {
      shuffledItems.value = items.sort(() => 0.5 - Math.random());

      randomItems.value = shuffledItems.value.slice(0, props.maxItems);
    } else {
      const currentList = [...randomItems.value];

      // Remplacer partiellement les éléments existants
      for (let i = 0; i < props.numberToChange; i++) {
        let randomItemIndex = getRandomIndex(currentList.length);

        while (lastChangedIndex.value === randomItemIndex) {
          randomItemIndex = getRandomIndex(currentList.length);
        }

        lastChangedIndex.value = randomItemIndex;

        const item = shuffledItems.value.pop()!;

        shuffledItems.value.unshift(currentList[randomItemIndex]);

        currentList[randomItemIndex] = item;
      }

      randomItems.value = currentList;
    }
  }
};

watch(counter, () => {
  updateRandomItems();
});

updateRandomItems();

function beforeLeave(el: any) {
  const {marginLeft, marginTop, width, height} = window.getComputedStyle(el);
  el.style.left = `${el.offsetLeft - parseFloat(marginLeft)}px`;
  el.style.top = `${el.offsetTop - parseFloat(marginTop)}px`;
  el.style.width = width;
  el.style.height = height;
}
</script>
<template>
  <div class="flex pt-20 gap-10">
    <div class="text-5xl flex items-center line-">
      <slot />
    </div>
    <transition-group
      name="list"
      tag="ul"
      class="mb-5 reset-list flex flex-wrap items-center gap-5"
      @before-leave="beforeLeave"
    >
      <li v-for="item in randomItems" :key="item.id" class="w-1/5 sm:w-auto relative">
        <ButtonBadge
          v-bind="props"
          :title="item.title"
          :href="item.href"
          :src="item.src"
          :padding="innerPadding"
          show-title
        />
      </li>
    </transition-group>
  </div>
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
