<script setup lang="ts">
import HomeFrameworks from "./HomeFrameworks.vue";
import HomeContainer from "./HomeContainer.vue";
import MessageCircleHeart from "../../atoms/svg/MessageCircleHeart.vue";
</script>
<template>
  <HomeContainer :animate="true">
    <HomeFrameworks>
      Here are some of the libraries and technologies that we use or support with this
      <strong>framework</strong>
    </HomeFrameworks>
  </HomeContainer>

  <HomeContainer animate>
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
</template>
