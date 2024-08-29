<script setup lang="ts">
import LightBanner from "../../molecules/banner/LightBanner.vue";
import CardStats from "../../molecules/card-stats/CardStats.vue";
import {ref} from "vue";
import {LoaderCircle, Search} from "lucide-vue-next";
import ButtonBoxes from "../../molecules/button-boxes/ButtonBoxes.vue";

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
    label: " downloads last 30 days",
    value: 20000
  }
];

const isActive = ref(true);
const category = ref("");
const categoriesChoices = [
  {
    label: "All",
    value: ""
  },
  {
    label: "Official",
    value: "official"
  },
  {
    label: "Community",
    value: "community"
  }
];
</script>
<template>
  <div class="pb-5">
    <LightBanner title="Explore plugins">
      Discover our list of plugins to extend your Ts.ED project. Created by the Ts.ED team and community.
    </LightBanner>

    <div class="-mt-[60px]">
      <div class="relative z-10 max-w-screen-xl mb-10 px-4 mx-auto sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <CardStats :items="stats" />
        </div>
      </div>
    </div>

    <div class="max-w-site-xxl m-auto px-5">
      <div v-if="isActive" class="text-center text-4xl text-gray-darker p-5 flex items-center justify-center">
        <LoaderCircle class="animate-spin mr-5 text-blue-active" size="32" />
        Loading...
      </div>

      <div class="container px-4 pt-12 pb-8 mx-auto sm:px-0">
        <!-- Search -->
        <div class="flex sm:max-w-sm sm:mx-auto">
          <label class="relative flex-1">
            <Search class="absolute left-4 top-3" />

            <input
              ref="searchPlugin"
              v-model="q"
              type="search"
              aria-label="Search"
              class="bg-[#F6F6F7] dark:bg-[#444e60] rounded-full w-full p-3 pl-12 text-base leading-6 placeholder-gray-700 transition duration-150 ease-in-out ring-3 ring-blue-300 focus:outline-none focus:placeholder-gray-500 sm:flex-1"
              placeholder="Search a module (name, category, username, etc.)"
            />
          </label>
          <!--          <button-->
          <!--            type="button"-->
          <!--            aria-label="search"-->
          <!--            class="px-6 py-3 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-gray-400 hover:bg-grey-light focus:bg-grey-light rounded-tr-md rounded-br-md focus:outline-none focus:ring-3 focus:ring-green-300 focus:ring-opacity-50 sm:mt-0 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"-->
          <!--          ></button>-->
        </div>

        <!-- Categories -->
        <ButtonBoxes v-model="category" :choices="categoriesChoices" />

        {{ category }}
      </div>
    </div>

    <!--    <div class="max-w-site-xxl m-auto px-5">-->
    <!--      <div v-if="isActive" class="text-center text-4xl text-gray-darker p-5">-->
    <!--        <BxIcon name="bx-radio-circle" class="bx-burst" />-->
    <!--        Loading...-->
    <!--      </div>-->
    <!--      <div v-else>-->
    <!--        <div class="container px-4 pt-12 pb-8 mx-auto sm:px-0">-->
    <!--          &lt;!&ndash; Search &ndash;&gt;-->
    <!--          <div class="flex rounded-small shadow-sm sm:max-w-sm sm:mx-auto">-->
    <!--            <label class="relative flex-1">-->
    <!--              <input-->
    <!--                ref="searchPlugin"-->
    <!--                v-model="q"-->
    <!--                type="search"-->
    <!--                aria-label="Search"-->
    <!--                class="block w-full py-3 pl-3 pr-3 text-base leading-6 placeholder-gray-700 transition duration-150 ease-in-out border appearance-none md:pr-10 border-gray-400 rounded-tl-md rounded-bl-md focus:ring-3 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none focus:placeholder-gray-600 sm:flex-1"-->
    <!--                placeholder="Search a module (name, category, username, etc.)"-->
    <!--              />-->
    <!--            </label>-->
    <!--            <button-->
    <!--              type="button"-->
    <!--              aria-label="search"-->
    <!--              class="px-6 py-3 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-gray-400 hover:bg-grey-light focus:bg-grey-light rounded-tr-md rounded-br-md focus:outline-none focus:ring-3 focus:ring-green-300 focus:ring-opacity-50 sm:mt-0 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"-->
    <!--            >-->
    <!--              <BxIcon name="search" alt="Search" />-->
    <!--            </button>-->
    <!--          </div>-->

    <!--          &lt;!&ndash; Categories &ndash;&gt;-->
    <!--          <div class="flex pt-6 space-x-2 overflow-x-auto sm:flex-wrap sm:justify-center">-->
    <!--            <button-->
    <!--              v-for="category of categories"-->
    <!--              :key="category"-->
    <!--              type="button"-->
    <!--              :aria-label="category"-->
    <!--              class="px-4 py-2 mb-2 text-sm rounded cursor-pointer focus:outline-none"-->
    <!--              :class="[-->
    <!--                selectedCategory === category-->
    <!--                  ? 'bg-blue-active text-white'-->
    <!--                  : 'text-blue-900 bg-gray-400 hover:bg-gray-300 focus:bg-gray-300'-->
    <!--              ]"-->
    <!--              @click="toggleCategory(category)"-->
    <!--            >-->
    <!--              {{ category }}-->
    <!--            </button>-->
    <!--          </div>-->
    <!--        </div>-->

    <!--        <div class="flex flex-col items-center justify-between sm:flex-row">-->
    <!--          &lt;!&ndash; Clear filters &ndash;&gt;-->
    <!--          <div class="mb-4 text-blue-900">-->
    <!--            {{ filteredPlugins.length }} plugin{{ filteredPlugins.length !== 1 ? "s" : "" }} found-->
    <!--            <template v-if="selectedCategory || q">-->
    <!--              <div>-->
    <!--                Filter{{ selectedCategory && q ? "s" : "" }}: <b>{{ selectedCategory }}</b-->
    <!--                >{{ selectedCategory && q ? ", " : "" }}<b>{{ q }}</b>-->
    <!--                <a href="/" class="hover:text-grey-darkest" @click.prevent="clearFilters"-->
    <!--                  >(<u>clear filter{{ selectedCategory && q ? "s" : "" }}</u-->
    <!--                  >)</a-->
    <!--                >-->
    <!--              </div>-->
    <!--            </template>-->
    <!--          </div>-->
    <!--          <div v-show="!q" class="flex items-center mb-4 text-blue-900">-->
    <!--            <label for="options-menu" class="mr-3" @click="sortByMenuVisible = !sortByMenuVisible">Sort by</label>-->

    <!--            <div class="relative w-28">-->
    <!--              <button-->
    <!--                type="button"-->
    <!--                :aria-label="`change sort`"-->
    <!--                class="flex items-center justify-center h-full w-full p-1 px-2 border rounded-l-md hover:bg-gray-400 focus:bg-gray-400 focus:outline-none hover:border-gray-light"-->
    <!--                :class="sortByBtnClass"-->
    <!--                @click="sortByMenuVisible = !sortByMenuVisible"-->
    <!--              >-->
    <!--                {{ sortByComp.label }}-->
    <!--              </button>-->
    <!--              <div v-show="sortByMenuVisible" class="absolute right-0 z-10 origin-top-right rounded-md shadow-lg">-->
    <!--                <div id="options-menu" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">-->
    <!--                  <button-->
    <!--                    v-for="(option, key) in sortByOptions"-->
    <!--                    :key="key"-->
    <!--                    type="button"-->
    <!--                    :aria-label="`sort by ${key}`"-->
    <!--                    class="flex items-center justify-center p-1 px-2 bg-white shadow-xs w-28 hover:bg-gray-200 focus:text-gray-700 text-blue-900 focus:outline-none rounded-b-md"-->
    <!--                    @click="selectSortBy(key)"-->
    <!--                  >-->
    <!--                    {{ option.label }}-->
    <!--                  </button>-->
    <!--                </div>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--            <div class="relative">-->
    <!--              <button-->
    <!--                type="button"-->
    <!--                :aria-label="orderBy === 'asc' ? 'sort ascending' : 'sort descending'"-->
    <!--                class="flex items-center justify-center h-full w-full p-1 px-2 border border-l-0 hover:bg-gray-400 focus:bg-gray-400 focus:outline-none rounded-r-md"-->
    <!--                @click="toggleOrderBy"-->
    <!--              >-->
    <!--                <BxIcon :name="orderBy ? 'sort-up' : 'sort-down'" class="fill-current" />&nbsp;-->
    <!--              </button>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->

    <!--        <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">-->
    <!--          <div-->
    <!--            v-for="plugin of pageFilteredPlugins"-->
    <!--            :key="plugin.name"-->
    <!--            class="relative flex flex-col overflow-hidden transition-transform duration-150 ease-in-out transform bg-white rounded-md shadow hover:shadow-lg hover:-translate-y-1"-->
    <!--          >-->
    <!--            <LazyHydrate when-visible>-->
    <!--              <CardPlugin v-bind="plugin" />-->
    <!--            </LazyHydrate>-->
    <!--          </div>-->
    <!--          <Observer @intersect="intersectedPluginsLoading" />-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>
