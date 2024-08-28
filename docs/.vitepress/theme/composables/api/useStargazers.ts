import {ref} from "vue";
import axios from "axios";
import {getHost} from "./useGithubContributors";
import {formatNumber} from "../../utils/format";

export interface GithubRepository {
  id: number;
  html_url: string;
  stargazers_count: 2802;
  watchers_count: 2802;
  forks_count: 284;
  open_issues_count: 47;
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

  return {stargazers, formattedStargazers: formatNumber(stargazers.value), fetchStargazers};
}
