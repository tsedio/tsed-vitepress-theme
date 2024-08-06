<script setup lang="ts">
import {useFrontMatter} from "../../composables/config/useFrontMatter";
import Frameworks, {type Framework} from "../../molecules/frameworks/Frameworks.vue";

const frontmatter = useFrontMatter();
const frameworks = (frontmatter.value.frameworks as Framework[]).map((item, index) => {
  return {
    ...item,
    id: index
  };
});
</script>
<template>
  <div class="flex flex-col sm:flex-row pt-10 sm:pt-20 gap-10">
    <div class="text-center sm:text-left text-2xl sm:text-5xl flex items-center">
      <div>
        <slot />
      </div>
    </div>
    <Frameworks :items="frameworks" />
  </div>
</template>
