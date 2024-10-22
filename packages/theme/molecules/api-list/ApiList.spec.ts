import {render, screen, waitFor} from "@testing-library/vue";
import ApiList from "./ApiList.vue";
import {beforeEach} from "vitest";
import {mount} from "@vue/test-utils";

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

    it("should compute symbols correctly", () => {
      const wrapper = mount(ApiList, {
        props: {
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

      expect(wrapper.vm.symbols).toStrictEqual([
        {
          path: "/api/core/types/decorators/ITEM",
          symbolName: "ITEM",
          module: "@tsed/core",
          symbolType: "decorator",
          symbolLabel: "Decorator",
          symbolCode: "@",
          status: ["stable"]
        }
      ]);
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

    it("should compute symbols as an empty array if there is no value or an error occurs in fetching", () => {
      const wrapper = mount(ApiList, {
        props: {
          items: []
        }
      });

      expect(wrapper.vm.symbols).toStrictEqual([]);
    });
    it("should compute symbols as an empty array when error occurs or data is not available", () => {
      vi.mocked(useFetch).mockReturnValue({
        get: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnValue({
          data: {
            value: null
          },
          error: {
            value: "Error"
          },
          isFetching: {
            value: false
          }
        })
      } as any);

      const wrapper = mount(ApiList);

      expect(wrapper.vm.symbols).toStrictEqual([]);
    });
  });
});
