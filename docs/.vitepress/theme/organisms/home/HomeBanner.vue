<script setup lang="ts">
import Tabs from "../../molecules/tabs/Tabs.vue";
import Tab from "../../molecules/tabs/Tab.vue";
import ButtonBanner from "./ButtonBanner.vue";
import {useStargazers} from "../../composables/api/useStargazers";
import {useThemeConfig} from "../../composables/config/__mocks__/useThemeConfig";

const theme = useThemeConfig();
const {githubProxyUrl} = theme.value;

const {formattedStargazers, fetchStargazers} = useStargazers(githubProxyUrl, 2800);

fetchStargazers();
</script>
<template>
  <div class="vp-doc w-[75%]">
    <Tabs name="oCQs_" class="w-full">
      <Tab class="language-sh h-[150px]" title="npm" active>
        <button title="Copy Code" class="copy"></button>
        <span class="lang">sh</span>
        <pre
          class="shiki shiki-themes github-light github-dark vp-code"
          tabindex="0"
        ><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npx</span><span
            style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span
            style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @tsed/cli</span><span
            style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tsed</span><span
            style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> init</span><span
            style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> .</span></span></code></pre>
      </Tab>
      <Tab class="language-sh h-[150px]" title="yarn">
        <button title="Copy Code" class="copy"></button>
        <span class="lang">sh</span>
        <pre
          class="shiki shiki-themes github-light github-dark vp-code"
          tabindex="0"
        ><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span
            style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> set</span><span
            style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> version</span><span
            style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> berry</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span
    style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dlx</span><span
    style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span
    style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @tsed/cli</span><span
    style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tsed</span><span
    style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> init</span><span
    style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> .</span></span></code></pre>
      </Tab>
      <Tab class="language-sh h-[150px]" title="pnpm">
        <button title="Copy Code" class="copy"></button>
        <span class="lang">sh</span>
        <pre
          class="shiki shiki-themes github-light github-dark vp-code"
          tabindex="0"
        ><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpx</span><span
            style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span
            style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @tsed/cli</span><span
            style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tsed</span><span
            style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> init</span><span
            style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> .</span></span></code></pre>
      </Tab>
      <Tab class="language-sh h-[150px]" title="bun">
        <button title="Copy Code" class="copy"></button>
        <span class="lang">sh</span>
        <pre
          class="shiki shiki-themes github-light github-dark vp-code"
          tabindex="0"
        ><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">bunx</span><span
            style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span
            style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @tsed/cli</span><span
            style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tsed</span><span
            style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> init</span><span
            style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> .</span></span></code></pre>
      </Tab>
    </Tabs>

    <div class="flex justify-between space-x-2">
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
