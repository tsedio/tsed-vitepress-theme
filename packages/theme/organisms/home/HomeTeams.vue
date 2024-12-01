<script setup lang="ts">
import {useThemeConfig} from "../../composables/config/useThemeConfig";
import TeamMembers from "../../molecules/teams/TeamMembers.vue";
import type {Team} from "../../composables/config/interfaces/CustomThemeConfig";

const theme = useThemeConfig();

const members: any[] = ((theme.value.team || []) as Team[]).map((member) => {
  return {
    avatar: member.src,
    name: member.title,
    title: member.role + " - " + member.job,
    links: [
      {icon: "github", link: "https://github.com/" + member.github},
      member.twitter && {icon: "twitter", link: "https://x.com/" + member.twitter}
    ].filter(Boolean)
  };
});

</script>
<template>
  <div class="mt-20 flex flex-col space-y-5">
    <div class="text-2xl sm:text-5xl text-center pb-5">Team members</div>

    <TeamMembers size="small" :members="members"/>
  </div>
</template>

