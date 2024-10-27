<script setup lang="ts">

import {computed, ref} from "vue";
import ApiList from "../../molecules/api-list/ApiList.vue";
import LightBanner from "../../molecules/banner/LightBanner.vue";
import {Search} from "lucide-vue-next";
import ButtonBoxes from "../../molecules/button-boxes/ButtonBoxes.vue";
import type {ApiResponse, ApiSymbol} from "../../composables/api/interfaces/Api";

interface Props extends ApiResponse {}

const {symbolTypes, modules: initialModules} = withDefaults(defineProps<Props>(), {});

const q = ref("");
const category = ref("");
const categoriesChoices = computed(() => [{label: "All", value: ""}].concat(symbolTypes || []));
let timeout: NodeJS.Timeout | null = null;

const modules = computed<Record<string, { name: string; symbols: ApiSymbol[]; }>>(() => {
  return Object.entries(initialModules).reduce((acc, [key, value]) => {
    const symbols = value.symbols
        .filter((symbol) => {
          const qMatch = q.value ? symbol.symbolName.toLowerCase().includes(q.value.toLowerCase()) : true;
          const categoryMatch = category.value ? symbol.symbolType.toLowerCase().includes(category.value.toLowerCase()) : true;

          return qMatch && categoryMatch;
        })
        .sort((a, b) => a.symbolName.localeCompare(b.symbolName));

    return {
      ...acc,
      [key]: {
        ...value,
        symbols
      }
    };
  }, {});
});

</script>
<template>
  <LightBanner title="Explore API references">
    <div class="flex flex-col space-y-10 -mb-16">

      <div>Discover our API references (class, decorators, utils) and learn how to use them.</div>

      <div class="flex">
        <label class="relative flex-1 w-full">
          <Search class="absolute left-4 top-3"/>

          <input
              ref="searchPlugin"
              v-model="q"
              type="search"
              aria-label="Search"
              class="bg-white dark:bg-[#444e60] rounded-full w-full p-3 pl-12 text-base leading-6 placeholder-gray-700 transition duration-150 ease-in-out ring-3 ring-blue-300 focus:outline-none focus:placeholder-gray-500 sm:flex-1"
              placeholder="Search a reference"
          />
        </label>
      </div>
    </div>
  </LightBanner>

  <div class="flex flex-col space-y-3 max-w-site-xxl m-auto mx-5">
    <div>
      <div class="container px-4 mx-auto sm:px-0">
        <ButtonBoxes v-model="category" :choices="categoriesChoices"/>
      </div>
    </div>

    <template v-for="(module, key) in modules" :key="key">
      <div v-if="module.symbols?.length"
           v-lazyload-observer:focus.self="true"
           class="transition-opacity duration-500">
        <h2 class="font-bold text-xl">{{ module.name }}</h2>

        <ApiList class="mt-4" :items="module.symbols"></ApiList>
      </div>
    </template>
  </div>
</template>
