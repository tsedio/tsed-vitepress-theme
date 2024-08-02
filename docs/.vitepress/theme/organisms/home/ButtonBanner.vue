<script setup lang="ts">
interface ButtonBannerProps {
  href: string;
  title: string;
}

const props = withDefaults(defineProps<ButtonBannerProps>(), {});
</script>
<template>
  <a
    :href="props.href"
    class="cursor-pointer h-10 max-w-[130px] flex-1 relative rounded-lg overflow-hidden border border-black/10 dark:border-white/20"
    style="color: inherit"
    rel="noreferrer noopener"
    target="_blank"
  >
    <div class="absolute flex z-0 p-[6px] h-full w-full">
      <div class="flex-1 bg-white/60 dark:bg-black/40 flex items-center w-full h-full rounded-md">
        <span class="font-medium text-[13px] px-2 opacity-80 w-full text-center">{{ props.title }}</span>
      </div>
      <div class="flex items-center h-full px-2">
        <span class="font-medium text-[15px] text-center w-full text-black dark:text-white">
          <slot name="default" />
        </span>
      </div>
    </div>
    <div class="absolute left-0 right-0 top-0 bottom-0 bg-black/5 dark:bg-white/10 z-[-1]" />
    <div class="absolute left-0 right-0 top-0 bottom-0 backdrop-blur-[2px] backdrop-filter z-[-1]" />
  </a>
</template>
