<script setup lang="ts">
import HomeFrameworks from "./HomeFrameworks.vue";
import HomeContainer from "./HomeContainer.vue";
import HomeTeams from "./HomeTeams.vue";
import MessageCircleHeart from "../../atoms/svg/MessageCircleHeart.vue";
import {computed} from "vue";
import {useRoute} from "vitepress";

const route = useRoute();
const isHome = computed(() => {
  return route.path === "/" || route.path === "";
});

</script>
<template>
  <HomeContainer v-if="isHome" animate>
    <HomeFrameworks v-if="isHome">
      Here are some of the libraries and technologies that we use or support with this
      <strong>framework</strong>
    </HomeFrameworks>
  </HomeContainer>

  <HomeContainer v-if="isHome" animate>
    <div class="flex flex-col sm:flex-row pt-10 sm:pt-20 gap-10">
      <GithubContributors />

      <div class="flex items-center order-first sm:order-last">
        <div class="flex sm:block">
          <div class="text-2xl sm:text-5xl flex items-center pb-5">
            <div>Our awesome <strong>contributors</strong></div>
          </div>
          <div class="max-w-[100px] relative">
            <div
              class="animate-[ping_3s_infinite] absolute inline-flex h-full rounded-full bg-red-400 opacity-75 w-[100px]"
            />
            <MessageCircleHeart class="w-[100px] z-2 relative" />
          </div>
        </div>
      </div>
    </div>
  </HomeContainer>

  <HomeContainer v-if="isHome" animate>
    <HomeTeams />
  </HomeContainer>
</template>
