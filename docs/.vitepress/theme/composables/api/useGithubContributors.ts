import {ref} from "vue";
import axios from "axios";

type User = {
  title: string;
  login: string;
};

type User = {
  title: string;
  login: string;
};

const outboundRE = /^[a-z]+:/i;

function getHost(docsRepo: string) {
  const base = outboundRE.test(docsRepo) ? docsRepo : `https://github.com/${docsRepo}`;

  return base.replace("/github.com", "/repos/api.github.com");
}

export function useGithubContributors(docsRepo: string) {
  const contributors = ref<User[]>([]);

  const fetchContributors = async (page: number = 1, per_page: number = 100) => {
    const endpoint = `${getHost(docsRepo)}/contributors`;
    try {
      const {data} = await axios.get(`${endpoint}?page=${page}&per_page=${per_page}`);

      contributors.value = data
        .filter(
          (contributor: {login: string}) => !["semantic-release-bot", "dependabot[bot]"].includes(contributor.login)
        )
        .map(({avatar_url, html_url, login, ...rest}) => ({
          src: avatar_url,
          href: html_url,
          login,
          ...rest
        }));

      return contributors;
    } catch (error) {
      contributors.value = [];
    }
  };

  return {contributors, fetchContributors};
}
