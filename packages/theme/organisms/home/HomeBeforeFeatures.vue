<script setup lang="ts">
import HomePartners from "./HomePartners.vue";
import {useFrontMatter} from "../../composables/config/useFrontMatter";
import HomeContainer from "./HomeContainer.vue";
import {useRoute} from "vitepress";
import {computed} from "vue";

const route = useRoute();

const isHome = computed(() => {
  return route.path === "/" || route.path === "";
});

const frontmatter = useFrontMatter();

const testimonial = computed(() => {
  return frontmatter.value.testimonial as { title: string, description: string };
});

</script>
<template>
  <HomePartners class="mb-20" />

  <HomeContainer v-if="testimonial && isHome">
    <main class="flex flex-col items-center space-y-8 mt-4 mb-8">
      <h1 class="font-bold clip text-xl sm:text-3xl" v-html="testimonial.title">
      </h1>
      <blockquote class="text-center w-[70%] text-gray-600 dark:text-gray-400 italic -top-16 relative">
        <svg class="w-8 h-8 text-gray-400 dark:text-gray-600 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
          <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
        </svg>
        <p v-html="testimonial.description"></p>
      </blockquote>
    </main>
  </HomeContainer>
</template>

<style scoped>
.clip {
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: var(--vp-home-hero-name-color);
}
</style>
