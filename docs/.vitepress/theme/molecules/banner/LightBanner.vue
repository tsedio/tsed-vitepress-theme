<script setup lang="ts">
import {defineProps, ref} from "vue";
import {withDefaults} from "vue";

interface LightBannerProps {
  title: string;
}

const props = withDefaults(defineProps<LightBannerProps>(), {
  title: ""
});
</script>
<template>
  <div class="pt-16 pb-16 bg-gray-100 dark:bg-gray-700 sm:pb-24">
    <div class="text-center px-4 pb-10 flex flex-col items-center sm:px-6 lg:px-8">
      <h1 class="mt-4 text-4xl font-extrabold leading-10 sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
        {{ props.title }}
      </h1>
      <p class="flex items-center justify-center max-w-xl mt-5 text-lg leading-7 sm:text-xl">
        <slot />
      </p>
    </div>
  </div>
</template>
