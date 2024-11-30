import {useFetch} from "@vueuse/core";
import {formatNumber} from "../../utils/format";

export function useStargazers(url: string) {
  return useFetch(url, {
    afterFetch(ctx) {
      ctx.data = {
        stargazers: ctx.data.stargazers_count,
        formattedStargazers: formatNumber(ctx.data.stargazers_count)
      };

      return ctx;
    }
  }).get().json<{ stargazers: number; formattedStargazers: string }>();
}
