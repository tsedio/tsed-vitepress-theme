<script setup lang="ts">
import LightBanner from "../../molecules/banner/LightBanner.vue";
import CardStats from "../../molecules/card-stats/CardStats.vue";
import {computed, ref} from "vue";
import {LoaderCircle, Search} from "lucide-vue-next";
import ButtonBoxes from "../../molecules/button-boxes/ButtonBoxes.vue";
import ClearableFilter from "../../molecules/filters/ClearableFilter.vue";
import SortBy from "../../molecules/sort-by/SortBy.vue";
import FilterBy from "../../molecules/filters/FilterBy.vue";
import CardPackage from "../../molecules/card-package/CardPackage.vue";
import {useWarehouse} from "../../composables/api/useWarehouse.js";
import {useThemeConfig} from "../../composables/config/useThemeConfig";
import {upperFirst} from "../../utils/upperFirst.js";

const stats = [
  {
    label: "plugins",
    value: 100
  },
  {
    label: "maintainers",
    value: 7
  },
  {
    label: "downloads last 30 days",
    value: 20000
  }
];

const theme = useThemeConfig();
const {githubProxyUrl} = theme.value;

const {isActive, packages, fetchPackages, tags} = useWarehouse(githubProxyUrl);

const category = ref("");
const categoriesChoices = computed(() =>
    [{label: "All", value: ""}].concat(
        tags.value.map((tag) => ({
          label: upperFirst(tag),
          value: tag
        }))
    )
);

const q = ref("");
const sort = ref({value: "downloads", order: "desc"});
const sortOptions = [
  {
    label: "Downloads",
    value: "downloads"
  },
  {
    label: "Stars",
    value: "stars"
  }
];
const filterType = ref("");
const filterOptions = [
  {
    label: "All",
    value: ""
  },
  {
    label: "Official",
    value: "official"
  },
  {
    label: "Premium",
    value: "premium"
  },
  {
    label: "Community",
    value: "3rd-party"
  }
];

const filteredPackages = computed(() => {
  return packages.value
      .filter((plugin) => {
        const qMatch = q.value ? plugin.name.toLowerCase().includes(q.value.toLowerCase()) : true;
        const categoryMatch = category.value ? plugin.tags.includes(category.value) : true;
        const typeMatch = filterType.value ? plugin.type === filterType.value : true;

        return qMatch && categoryMatch && typeMatch;
      })
      .sort((a, b) => {
        if (sort.value.value === "downloads") {
          return sort.value.order === "asc" ? a.downloads - b.downloads : b.downloads - a.downloads;
        } else {
          return sort.value.order === "asc" ? a.stars - b.stars : b.stars - a.stars;
        }
      });
});

const keywords = computed(() => {
  return [q.value, category.value].filter(Boolean);
});

function onClear() {
  q.value = "";
  category.value = "";
}

fetchPackages();
</script>
<template>
  <div class="pb-5">
    <LightBanner title="Explore plugins">
      Discover our list of plugins to extend your Ts.ED project. Created by the Ts.ED team and community.
    </LightBanner>

    <div class="-mt-[60px]">
      <div class="relative z-10 max-w-screen-xl mb-10 px-4 mx-auto sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <CardStats :items="stats"/>
        </div>
      </div>
    </div>

    <div class="flex flex-col space-y-3 mx-5">
      <div class="max-w-site-xxl m-auto">
        <div v-if="isActive" class="text-center text-4xl text-gray-darker p-5 flex items-center justify-center">
          <LoaderCircle class="animate-spin mr-5 text-blue-active" :size="32"/>
          Loading...
        </div>

        <div v-else class="container px-4 pt-12 pb-8 mx-auto sm:px-0">
          <!-- Search -->
          <div class="flex sm:max-w-sm sm:mx-auto">
            <label class="relative flex-1">
              <Search class="absolute left-4 top-3"/>

              <input
                  ref="searchPlugin"
                  v-model="q"
                  type="search"
                  aria-label="Search"
                  class="bg-[#F6F6F7] dark:bg-[#444e60] rounded-full w-full p-3 pl-12 text-base leading-6 placeholder-gray-700 transition duration-150 ease-in-out ring-3 ring-blue-300 focus:outline-none focus:placeholder-gray-500 sm:flex-1"
                  placeholder="Search a module (name, category, username, etc.)"
              />
            </label>
          </div>

          <!-- Categories -->
          <ButtonBoxes v-model="category" :choices="categoriesChoices"/>
        </div>
      </div>
      <div v-if="!isActive" class="flex flex-col items-center justify-between sm:flex-row">
        <ClearableFilter :keywords="keywords" :count="filteredPackages.length" @clear="onClear()"/>
        <div class="flex gap-4">
          <FilterBy v-model="filterType" :choices="filterOptions" label="Package type"/>
          <SortBy v-model="sort" :choices="sortOptions"/>
        </div>
      </div>
      <div v-if="!isActive" class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <div
            v-for="plugin of filteredPackages"
            :key="plugin.name"
            v-lazyload-observer:focus.self="true"
            class="transition-opacity duration-500"
        >
          <CardPackage v-bind="plugin"/>
        </div>
      </div>
    </div>
  </div>
</template>
