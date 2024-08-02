import {ref} from "vue";
import axios from "axios";
import type {GitHubUser} from "./interfaces/GithubUser";

const outboundRE = /^[a-z]+:/i;

export function getHost(docsRepo: string) {
  const base = outboundRE.test(docsRepo) ? docsRepo : `https://github.com/${docsRepo}`;

  return base.replace("/github.com", "/repos/api.github.com");
}

export function useGithubContributors(docsRepo: string) {
  const contributors = ref<GitHubUser[]>([]);

  const fetchContributors = async (page: number = 1, per_page: number = 100) => {
    const endpoint = `${getHost(docsRepo)}/contributors`;
    try {
      const {data} = await axios.get(`${endpoint}?page=${page}&per_page=${per_page}`);

      contributors.value = data
        .filter(
          (contributor: {login: string}) => !["semantic-release-bot", "dependabot[bot]"].includes(contributor.login)
        )
        .map(({avatar_url, html_url, login, ...rest}: GitHubUser) => ({
          login,
          ...rest,
          src: avatar_url,
          href: html_url
        }));

      return contributors;
    } catch (error) {
      contributors.value = [];
    }
  };

  return {contributors, fetchContributors};
}
