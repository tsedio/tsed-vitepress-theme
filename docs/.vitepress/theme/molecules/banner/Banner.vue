<script setup lang="ts">
interface BannerProps {
  src: string;
  href?: string;
  height?: number | string;
  bgColor?: string;
  padding?: number;
  class?: string;
}

const props = withDefaults(defineProps<BannerProps>(), {
  src: "",
  href: "",
  height: 100,
  bgColor: "",
  padding: 5,
  class: ""
});
</script>

<template>
  <div class="flex justify-center items-center">
    <component
      :is="props.href ? 'a' : 'div'"
      class="block m-auto rounded-lg overflow-hidden"
      :class="[props.padding && `p-${props.padding}`, props.bgColor && `bg-${props.bgColor}`, props.class]"
      :style="{width: `${props.height}px`, height: `${props.height}px`}"
      :href="href"
    >
      <div
        data-testid="banner-bg-container"
        class="h-full w-full bg-contain bg-no-repeat bg-center"
        :style="{backgroundImage: `url(${props.src})`}"
      ></div>
      <img class="hidden" :src="props.src" :height="props.height" />
    </component>
  </div>
</template>
