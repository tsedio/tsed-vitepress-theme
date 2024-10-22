<script setup lang="ts">
import {type ButtonBadgeProps} from "../../molecules/button-badge/ButtonBadge.vue";
import {computed} from "vue";
import {useFrontMatter} from "../../composables/config/useFrontMatter";
import ButtonBadges from "../../molecules/button-badge/ButtonBadges.vue";

interface Project {
  title: string;
  src: string;
  href: string;
}

export interface ProjectsProps extends ButtonBadgeProps {
  type?: string;
  innerPadding?: number;
}

const props = withDefaults(defineProps<ProjectsProps>(), {
  width: 65,
  bgColor: "white",
  textSize: "xxs",
  blur: 0,
  padding: 5,
  innerPadding: 0,
  type: "projects"
});

const frontmatter = useFrontMatter();

const projects = computed<Project[]>(() => {
  return frontmatter.value[props.type || "projects"] || [];
});
</script>

<template>
  <div class="bg-gray-100 rounded-md my-5 p-5">
    <ButtonBadges v-bind="props" :items="projects" show-title />
  </div>
</template>
