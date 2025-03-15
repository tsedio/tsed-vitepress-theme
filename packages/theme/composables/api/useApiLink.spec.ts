import {useApiLink} from "./useApiLink";

vi.mock("../config/useThemeConfig.js", () => {
  return {
    useThemeConfig: () => ({
      value: {
        apiRedirectUrl: "https://api-docs.tsed.dev",
        apiUrl: "https://tsed.dev/api.json"
      }
    })
  };
});

describe("useApiLink", () => {
  it("should build a valid url", () => {
    const result = useApiLink();

    expect(result({path: "/hello"} as any)).toEqual("https://api-docs.tsed.dev/hello.html");
  });
  it("should return empty string if path is missing", () => {
    const result = useApiLink();

    expect(result({} as any)).toEqual("");
  });
});
