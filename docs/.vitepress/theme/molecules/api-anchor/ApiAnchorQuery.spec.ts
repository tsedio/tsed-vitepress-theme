import {render, screen} from "@testing-library/vue";
import {beforeEach} from "vitest";
import {useFetch} from "@vueuse/core";
import ApiAnchorQuery from "./ApiAnchorQuery.vue";

vi.mock("@vueuse/core");

describe("<ApiAnchorQuery>", () => {
  beforeEach(() => {
    vi.mocked(useFetch).mockReturnValue({
      get: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnValue({
        isFetching: {
          value: false
        },
        error: {
          value: null
        },
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
  it("should render the ApiAnchorQuery (from name)", () => {
    render(ApiAnchorQuery, {
      props: {
        name: "Configurable"
      }
    });

    expect(screen.getByText("Configurable")).toBeTruthy();
    expect(screen.getByRole("link")).toHaveAttribute("title", "Configurable");
  });
  it("should render the ApiAnchorQuery (not found name)", () => {
    render(ApiAnchorQuery, {
      props: {
        name: "Configurable2"
      }
    });

    expect(screen.getByTestId("ApiAnchorText")).toHaveTextContent("Configurable2");
  });

  it("should render the ApiAnchorQuery (not found name + inline meta)", () => {
    render(ApiAnchorQuery, {
      props: {
        name: "function:Configurable2"
      }
    });

    expect(screen.getByTestId("ApiAnchorText")).toHaveTextContent("Configurable2");
    expect(screen.getByTestId("ApiIcon")).toHaveAttribute("data-type", "function");
  });
});
