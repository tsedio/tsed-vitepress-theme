import {useApiLink} from "./useApiLink.js";

vi.mock("../config/useThemeConfig.js", () => {
  return {
    useThemeConfig: () => ({
      value: {
        apiRedirectUrl: "https://api-docs.tsed.io",
        apiUrl: "https://tsed.io/api.json"
      }
    })
  };
});

describe("useApiLink", () => {
  it("should build a valid url", () => {
    const result = useApiLink();

    expect(result({path: "/hello"} as any)).toEqual("https://api-docs.tsed.io/hello.html");
  });
  it("should return empty string if path is missing", () => {
    const result = useApiLink();

    expect(result({} as any)).toEqual("");
  });
});
