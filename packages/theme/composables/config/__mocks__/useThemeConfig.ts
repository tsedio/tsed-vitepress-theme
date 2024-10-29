export function useThemeConfig() {
  const ref: { apiUrl: string; apiRedirectUrl: string; repo: string; githubProxyUrl: string; value: any } = {
    apiUrl: "https://tsed.io/api.json",
    apiRedirectUrl: "https://api-docs.tsed.io",
    repo: "tsedio/tsed",
    githubProxyUrl: "https://api.tsed.io/rest/github/tsedio/tsed",
    value: undefined
  };

  ref.value = ref;

  return ref;
}

export function withBase(value: string) {
  return value;
}
