import {render, screen, waitFor} from "@testing-library/vue";
import ApiList from "./ApiList.vue";
import {beforeEach} from "vitest";
import {useFetch} from "@vueuse/core";

vi.mock("@vueuse/core");

describe("<ApiList>", () => {
  describe("when success", () => {
    beforeEach(() => {
      vi.mocked(useFetch).mockReturnValue({
        get: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnValue({
          isFetching: {
            value: false
          },
          error: null,
          data: {
            value: {
              modules: {
                "@tsed/core": {
                  symbols: [
                    {
                      path: "/api/core/types/decorators/Configurable",
                      symbolName: "Configurable",
                      module: "@tsed/core",
                      symbolType: "decorator",
                      symbolLabel: "Decorator",
                      symbolCode: "@",
                      status: ["stable"]
                    }
                  ]
                }
              }
            }
          }
        })
      } as any);
    });

    it("should render the component", () => {
      render(ApiList, {
        props: {
          query: "symbolName == 'Configurable'"
        }
      });

      waitFor(() => {
        expect(screen.getByText("Configurable")).toBeInTheDocument();
      });
    });
    it("should render the component from items props", () => {
      render(ApiList, {
        props: {
          query: "symbolName == 'ITEM'",
          items: [
            {
              path: "/api/core/types/decorators/ITEM",
              symbolName: "ITEM",
              module: "@tsed/core",
              symbolType: "decorator",
              symbolLabel: "Decorator",
              symbolCode: "@",
              status: ["stable"]
            }
          ]
        }
      });

      waitFor(() => {
        expect(screen.getByText("ITEM")).toBeInTheDocument();
      });

      expect(screen.queryByText("Configurable")).not.toBeInTheDocument();
    });
  });
  describe("when loading", () => {
    beforeEach(() => {
      vi.mocked(useFetch).mockReturnValue({
        get: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnValue({
          isFetching: {
            value: true
          },
          error: null,
          data: {
            value: null
          }
        })
      } as any);
    });

    it("should render the component", () => {
      render(ApiList, {
        props: {
          query: "symbolName == 'Configurable'"
        }
      });

      waitFor(() => {
        expect(screen.getByText("Loading in progress...")).toBeInTheDocument();
      });
    });
  });
  describe("when error", () => {
    beforeEach(() => {
      vi.mocked(useFetch).mockReturnValue({
        get: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnValue({
          isFetching: {
            value: false
          },
          error: {
            value: "Error"
          },
          data: {
            value: null
          }
        })
      } as any);
    });

    it("should render the component", () => {
      render(ApiList, {
        props: {
          query: "symbolName == 'Configurable'"
        }
      });

      waitFor(() => {
        expect(screen.getByText("Error loading symbols")).toBeInTheDocument();
      });
    });
  });
});
