export interface Team {
  src: string;
  title: string;
  job: string;
  role: string;
  github: string;
  twitter?: string;
}
export interface CustomThemeConfig {
  apiUrl: string;
  apiRedirectUrl: string;
  repo: string;
  team: Team[];
  githubProxyUrl: string;
  stargazerUrl?: string;
  coveragePercentage?: string;
  defaultStargazerValue?: number;
}
