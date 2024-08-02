import {ref, type Ref} from "vue";
import axios from "axios";
import {getHost} from "./useGithubContributors";

export interface GithubRepository {
  id: number;
  html_url: string;
  stargazers_count: 2802;
  watchers_count: 2802;
  forks_count: 284;
  open_issues_count: 47;
}

function format(stargazers: Ref<number>) {
  return new Intl.NumberFormat(undefined, {
    notation: "compact",
    compactDisplay: "short"
  }).format(stargazers.value);
}

export function useStargazers(docsRepo: string, defaultValue = 0) {
  const stargazers = ref<number>(defaultValue);

  const fetchStargazers = async () => {
    const endpoint = getHost(docsRepo);
    try {
      const {
        data: {stargazers_count}
      } = await axios.get<GithubRepository>(endpoint);

      stargazers.value = stargazers_count;

      return stargazers;
    } catch (error) {
      stargazers.value = defaultValue;
    }
  };

  return {stargazers, formattedStargazers: format(stargazers), fetchStargazers};
}
