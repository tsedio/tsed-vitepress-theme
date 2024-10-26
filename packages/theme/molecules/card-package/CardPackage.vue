<script setup lang="ts">
import {formatNumber} from "../../utils/format";
import {Github, CodeXml, ExternalLink, Package, Star, Award} from "lucide-vue-next";
import type {WarehousePackage} from "../../composables/api/useWarehouse";
import {computed} from "vue";
import iconTsed from "./icons/tsed.png";

export interface CardPackageProps extends WarehousePackage {}

const props = withDefaults(defineProps<CardPackageProps>(), {
  name: "",
  description: "",
  icon: "",
  homepage: "",
  npm: "",
  repository: "",
  stars: 0,
  downloads: 0,
  maintainers: () => [],
  type: "community"
});

function githubUrl({username}: {username: string}) {
  return `https://github.com/${username}`;
}

const icon = computed(() => {
  if (props.icon.includes("tsed.svg") || (!props.icon && props.name.startsWith("@tsed/"))) {
    return iconTsed;
  }

  return props.icon;
});
</script>
<template>
  <div
    class="CardPackage h-full relative flex flex-col overflow-hidden transition-transform duration-150 ease-in-out transform bg-white dark:bg-blueGray-700 rounded-md shadow hover:shadow-lg hover:-translate-y-1"
  >
    <div class="relative flex flex-1 flex-col space-y-2 px-6 py-8 group">
      <a :href="props.homepage" :aria-label="'Home page of ' + name" target="_blank" rel="noopener" class="absolute inset-0" />

      <div
        class="transition-opacity duration-200 ease-in-out opacity-0 group-hover:opacity-100 absolute top-4 right-6 cursor-pointer"
      >
        <ExternalLink :size="18" />
      </div>

      <span
        v-if="icon"
        :class="`flex items-center justify-center relative overflow-hidden p-1`"
        :style="{width: `45px`, height: `45px`}"
      >
        <img v-if="icon" data-testid="card-icon" :src="icon" :alt="name" class="w-full" />
      </span>

      <Package v-else class="text-5xl text-blue-300" :size="40" />

      <div class="flex text-lg font-bold items-center pt-2">
        <span>{{ name }}</span>
        <Award v-if="type === 'official' || type === 'premium'" class="ml-1 mt-1 text-yellow-600" :size="20" />
        <Github v-if="type === 'community'" class="ml-1 mt-1 text-blue-600" :size="20" />
        <small v-if="type === 'premium'" class="text-xs ml-1 text-gold">PREMIUM</small>
      </div>
      <div
        class="transition-colors ease text-gray-500 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-300"
      >
        {{ description }}
      </div>
    </div>

    <div class="border-t border-gray-200 dark:border-gray-700 bg-blueGray-100 dark:bg-blueGray-600 grid grid-cols-3">
      <a
        :href="npm"
        aria-label="npm"
        target=" _blank"
        rel="noopener"
        class="stats-block group flex items-center space-x-2 border-r border-gray-200 dark:border-gray-700 hover:bg-gray-200 hover:bg-opacity-50 py-3 px-4 pl-6"
      >
        <img alt="npm" src="./icons/npm.svg" width="32" height="32" class="icon" />

        <div
          class="text-sm leading-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 font-medium"
          data-testid="downloads-stats"
        >
          {{ formatNumber(downloads) }}
        </div>
      </a>

      <a
        :href="repository"
        aria-label="stars"
        target=" _blank"
        rel="noopener"
        class="no-underline stats-block group flex items-center space-x-1 py-3 px-4 border-r border-gray-200 dark:border-gray-700 hover:bg-gray-200 hover:bg-opacity-50"
      >
        <Star :size="20" class="text-gray-600 dark:text-gray-300 group-hover:text-yellow-600 mr-1" />
        <div
          class="text-sm leading-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 font-medium truncate"
          data-testid="stars-stats"
        >
          {{ formatNumber(stars) }}
          <span class="hidden md:inline-block">star{{ stars > 1 ? "s" : "" }}</span>
        </div>
      </a>

      <div
        class="stats-block group flex items-center space-x-1 py-3 px-4 z-0 overflow-hidden hover:bg-gray-200 hover:bg-opacity-50"
      >
        <CodeXml :size="20" class="mr-1 text-gray-600 dark:text-gray-300 group-hover:text-blue-600" />
        <a
          v-for="maintainer of maintainers"
          :key="maintainer.username"
          :title="maintainer.username"
          :aria-label="`${maintainer.username} github profile`"
          :href="githubUrl(maintainer)"
          target="_blank"
          class="no-underline"
          rel="noopener"
        >
          <img
            data-testid="card-avatar"
            class="w-6 h-6 relative rounded-full text-white shadow-solid transition-opacity duration-200 opacity-75 group-hover:opacity-100"
            :src="`${maintainer.avatar}?s=48&d=mp`"
            :alt="maintainer.username"
            width="24"
            height="24"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.CardPackage {
  a {
    @apply no-underline;
  }

  .stats-block {
    & img {
      filter: grayscale(100%);

      &.icon {
        filter: grayscale(100%) contrast(0%);
      }
    }

    &:hover {
      & img {
        filter: none;

        &.icon {
          filter: none;
        }
      }
    }
  }
}
</style>
