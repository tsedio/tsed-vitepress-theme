<script setup lang="ts">
import ButtonBanner from "./ButtonBanner.vue";
import {useStargazers} from "../../composables/api/useStargazers";
import {useThemeConfig} from "../../composables/config/useThemeConfig";
import {formatNumber} from "../../utils/format";

const theme = useThemeConfig();
const {
  githubProxyUrl,
  stargazerUrl,
  defaultStargazerValue = 2800,
  coveragePercentage = 98,
  repo
} = theme.value;

const {data} = useStargazers(stargazerUrl || githubProxyUrl);
const repoHref = `https://github.com/${repo}`;

</script>
<template>
  <div class="vp-doc m-auto w-[90%] sm:w-full lg:w-[75%] mt-10">
    <slot/>

    <div class="flex justify-between space-x-2 -mx-[24px] md:mx-0">
      <ButtonBanner :href="repoHref + '/stargazers'" title="stars">{{
          data?.formattedStargazers || formatNumber(defaultStargazerValue)
        }}
      </ButtonBanner>
      <ButtonBanner :href="repoHref" title="Coverage">{{coveragePercentage}}%</ButtonBanner>
      <ButtonBanner :href="repoHref + '/blob/production/LICENSE'" title="License">
        <template #title>License</template>
        MIT
      </ButtonBanner>
    </div>
  </div>
</template>
