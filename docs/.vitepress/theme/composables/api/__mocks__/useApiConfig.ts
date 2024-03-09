console.log("====> useApiConfig.ts <====");

export function useApiConfig() {
  const ref = {
    apiUrl: "https://tsed.io/api.json",
    apiRedirectUrl: "https://api-docs.tsed.io",
    value: undefined
  };

  ref.value = ref;

  return ref;
}
