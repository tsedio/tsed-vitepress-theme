<script setup lang="ts">
import Tab from "../../../molecules/tabs/Tab.vue";
import Tabs from "../../../molecules/tabs/Tabs.vue";
</script>
<template>
  <Tabs name="oCQs_" class="w-full">
    <Tab class="language-sh h-[120px] sm:h-[150px]" title="npm" active>
      <button title="Copy Code" class="copy"></button>
      <span class="lang">sh</span>
      <slot name="npm" />
    </Tab>
    <Tab class="language-sh h-[120px] sm:h-[150px]" title="yarn">
      <button title="Copy Code" class="copy"></button>
      <span class="lang">sh</span>
      <slot name="yarn" />
    </Tab>
    <Tab class="language-sh h-[120px] sm:h-[150px]" title="pnpm">
      <button title="Copy Code" class="copy"></button>
      <span class="lang">sh</span>
      <slot name="pnpm" />
    </Tab>
    <Tab class="language-sh h-[120px] sm:h-[150px]" title="bun">
      <button title="Copy Code" class="copy"></button>
      <span class="lang">sh</span>
      <slot name="bun" />
    </Tab>
  </Tabs>
</template>
<style>

@media (max-width: 960px) {
  .VPHero .main {
    order: 0 !important;

  }

  .VPHero .image {
    @apply my-10;

    .image-container {
      height: auto;
    }
  }
}
</style>
