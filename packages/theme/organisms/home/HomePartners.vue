<script setup lang="ts">
import Partners, {type Partner} from "../../molecules/partners/Partners.vue";
import {useFrontMatter} from "../../composables/config/useFrontMatter";
import HomeContainer from "./HomeContainer.vue";
import {useRoute} from "vitepress";
import {computed} from "vue";

const route = useRoute();

const isHome = computed(() => {
  return route.path === "/" || route.path === "";
});

const frontmatter = useFrontMatter();

const partners = computed(() => {
  return frontmatter.value.partners as Partner[];
});
</script>
<template>
  <HomeContainer v-if="isHome" class="mb-16">
    <Partners :items="partners" />
  </HomeContainer>
</template>
<style scoped>
.VPPartners {
  position: relative;
  padding: 0 24px;
}

@media (min-width: 640px) {
  .VPPartners {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .VPPartners {
    padding: 0 64px;
  }
}

.container {
  @apply mx-auto;
  margin: 0 auto;
  max-width: 1152px;
}
</style>
