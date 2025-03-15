export function useThemeConfig() {
  const ref: { apiUrl: string; apiRedirectUrl: string; repo: string; githubProxyUrl: string; value: any } = {
    apiUrl: "https://tsed.dev/api.json",
    apiRedirectUrl: "https://api-docs.tsed.dev",
    repo: "tsedio/tsed",
    githubProxyUrl: "https://api.tsed.dev/rest/github/tsedio/tsed",
    value: undefined
  };

  ref.value = ref;

  return ref;
}

export function withBase(value: string) {
  return value;
}
