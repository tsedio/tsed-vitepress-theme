<script setup lang="ts">
import ButtonBanner from "./ButtonBanner.vue";
import {useStargazers} from "../../composables/api/useStargazers";
import {useThemeConfig} from "../../composables/config/useThemeConfig";

const theme = useThemeConfig();
const {githubProxyUrl} = theme.value;

const {formattedStargazers, fetchStargazers} = useStargazers(githubProxyUrl, 2800);

fetchStargazers();
</script>
<template>
  <div class="vp-doc m-auto w-[90%] sm:w-full lg:w-[75%] mt-10">
    <slot />

    <div class="flex justify-between space-x-2 -mx-[24px] md:mx-0">
      <ButtonBanner href="https://github.com/tsedio/tsed/stargazers" title="stars">{{
        formattedStargazers
      }}</ButtonBanner>
      <ButtonBanner href="https://github.com/tsedio/tsed" title="Coverage">98%</ButtonBanner>
      <ButtonBanner href="https://github.com/tsedio/tsed/blob/production/LICENSE" title="License">
        <template #title>License</template>
        MIT
      </ButtonBanner>
    </div>
  </div>
</template>
