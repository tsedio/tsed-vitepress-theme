<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useGithubContributors} from "../../composables/api/useGithubContributors";
import ContributorItems from "../../molecules/contributors/ContributorItems.vue";
import type {GitHubUser} from "../../composables/api/interfaces/GithubUser";
import type {ButtonBadgeProps} from "../../molecules/button-badge/ButtonBadge.vue";
import {FONT_WEIGHT} from "../../atoms/tailwind.constants";
import {useThemeConfig} from "../../composables/config/useThemeConfig";

interface Props extends ButtonBadgeProps {
  users?: string[];
  showTitle?: boolean;
  innerPadding?: number;
}

const props = withDefaults(defineProps<Props>(), {
  users: () => [],
  showTitle: false,
  width: 45,
  bgColor: "gray-lighter",
  blur: 0,
  textSize: "xxs",
  padding: 2,
  innerPadding: 0,
  fontWeight: FONT_WEIGHT.normal as "normal",
  liClass: ""
});

const contributors = ref<GitHubUser[]>([]);
const theme = useThemeConfig();
const {githubProxyUrl} = theme.value;
const {fetchContributors} = useGithubContributors(githubProxyUrl);

onMounted(async () => {
  let fetchedContributorsRef = await fetchContributors();
  let fetchedContributors = fetchedContributorsRef?.value;

  if (fetchedContributors && props.users.length > 0) {
    fetchedContributors = fetchedContributors.filter((contributor) => props.users.includes(contributor.login));
  }

  if (fetchedContributors) {
    contributors.value = fetchedContributors;
  }
});

const {users, ...otherProps} = props;
</script>

<template>
  <ContributorItems v-bind="otherProps" :items="contributors"></ContributorItems>
</template>
