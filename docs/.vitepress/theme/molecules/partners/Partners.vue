<script setup lang="ts">
export interface Partner {
  href: string;
  title: string;
  src: string;
  style: string;
  class: string;
}

interface PartnerProps {
  items: Partner[];
}

const props = withDefaults(defineProps<PartnerProps>(), {
  items: () => []
});
</script>
<template>
  <div class="flex flex-wrap gap-12 justify-center items-stretch w-full">
    <div v-for="partner in props.items" :key="partner.href" :class="partner.class">
      <a
        :href="partner.href"
        :title="partner.title"
        target="_blank"
        rel="noopener noreferrer"
        class="link external partner-logo flex items-center h-full justify-center"
      >
        <img :src="partner.src" :style="partner.style" />
      </a>
    </div>
  </div>
</template>
<style>
.partner-logo {
  max-width: 150px;
}
.partner-logo img {
  transition: all ease-in-out 0.3s;
  filter: grayscale(1);
  opacity: 0.5;
  max-width: 100%;

  &:is(.dark *) {
    filter: contrast(0%);

    &:hover {
      filter: contrast(100%);
      opacity: 1;
    }
  }

  &:hover {
    filter: grayscale(0);
    opacity: 1;
  }
}
</style>
