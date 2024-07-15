<script setup lang="ts">
import ButtonBadge from "../../molecules/button-badge/ButtonBadge.vue";
import {FILTER_BLURS, TEXT_SIZES} from "../../atoms/tailwind.constants";
import {computed} from "vue";
import {useFrontMatter} from "../../composables/config/useFrontMatter";

interface Project {
  title: string;
  src: string;
  href: string;
}

export interface ProjectsProps {
  width?: string | number;
  bgColor?: string;
  blur?: keyof typeof FILTER_BLURS;
  textSize?: keyof typeof TEXT_SIZES;
  padding?: number;
  type?: string;
}

const props = withDefaults(defineProps<ProjectsProps>(), {
  width: 65,
  bgColor: "white",
  textSize: "xxs",
  blur: 0,
  padding: 3,
  type: "projects"
});

const frontmatter = useFrontMatter();

const projects = computed<Project[]>(() => {
  return frontmatter.value[props.type || "projects"] || [];
});
</script>

<template>
  <div class="bg-gray-100 rounded-md my-5 p-5">
    <div :class="`-m-${props.padding}`">
      <ul class="reset-list flex flex-wrap items-center">
        <li v-for="project in projects" :key="project.title" :class="`p-${props.padding}`">
          <ButtonBadge
            :title="project.title"
            :src="project.src"
            :href="project.href"
            :bg-color="props.bgColor"
            :text-size="props.textSize"
            :blur="props.blur"
            :width="props.width"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
